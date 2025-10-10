// Configuración del blog
const BLOG_CONFIG = {
    postsDirectory: 'posts/',
    maxPosts: 12,
    defaultImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    githubAPI: null // Se configurará automáticamente si está en GitHub Pages
};

let blogPosts = [];

// Detectar si estamos en GitHub Pages y configurar API
function detectGitHubAPI() {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
        const parts = hostname.split('.');
        if (parts.length >= 2) {
            const username = parts[0];
            const repoName = window.location.pathname.split('/')[1] || username + '.github.io';
            BLOG_CONFIG.githubAPI = `https://api.github.com/repos/${username}/${repoName}/contents/${BLOG_CONFIG.postsDirectory}`;
        }
    }
}

// Función para parsear el front matter YAML
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
        return { 
            frontMatter: {}, 
            content: content 
        };
    }
    
    const frontMatterText = match[1];
    const markdownContent = match[2];
    const frontMatter = {};
    
    // Parsear líneas del front matter
    frontMatterText.split(/\r?\n/).forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remover comillas si las hay
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            frontMatter[key] = value;
        }
    });
    
    return { frontMatter, content: markdownContent };
}

// Función para extraer excerpt del contenido
function extractExcerpt(content, maxLength = 160) {
    let plainText = content
        .replace(/^#{1,6}\s+/gm, '') // Remover headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remover bold
        .replace(/\*(.*?)\*/g, '$1') // Remover italic
        .replace(/`(.*?)`/g, '$1') // Remover code
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remover links
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remover images
        .replace(/^\s*[-*+]\s+/gm, '') // Remover bullets
        .replace(/^\s*\d+\.\s+/gm, '') // Remover números
        .replace(/\r?\n\s*\r?\n/g, ' ') // Remover líneas dobles
        .replace(/\s+/g, ' ') // Normalizar espacios
        .trim();
    
    if (plainText.length > maxLength) {
        plainText = plainText.substring(0, maxLength).trim();
        // Cortar en la última palabra completa
        const lastSpace = plainText.lastIndexOf(' ');
        if (lastSpace > maxLength - 50) {
            plainText = plainText.substring(0, lastSpace);
        }
        plainText += '...';
    }
    
    return plainText;
}

// Función para obtener lista de archivos desde GitHub API
async function getPostsFromGitHubAPI() {
    try {
        const response = await fetch(BLOG_CONFIG.githubAPI);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const files = await response.json();
        return files
            .filter(file => file.name.endsWith('.md') && file.type === 'file')
            .map(file => ({
                name: file.name,
                download_url: file.download_url
            }));
    } catch (error) {
        console.error('Error accessing GitHub API:', error);
        return [];
    }
}

// Función para obtener lista de archivos local (método de fallback)
async function getPostsLocally() {
    // Lista de archivos conocidos (puedes expandir esta lista)
    const knownFiles = [
        '2025-01-15-chatgpt5.md',
        '2025-01-10-generacio-recursos-ia.md',
        '2025-01-08-educacio-ia-dades.md',
        '2025-01-05-uniser-teacher-week.md'
    ];
    
    const posts = [];
    
    for (const filename of knownFiles) {
        try {
            const response = await fetch(BLOG_CONFIG.postsDirectory + filename);
            if (response.ok) {
                posts.push({
                    name: filename,
                    download_url: BLOG_CONFIG.postsDirectory + filename
                });
            }
        } catch (error) {
            console.log(`File ${filename} not found locally`);
        }
    }
    
    return posts;
}

// Función para cargar un post individual
async function loadPost(fileInfo) {
    try {
        const response = await fetch(fileInfo.download_url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.text();
        const { frontMatter, content: markdownContent } = parseFrontMatter(content);
        
        // Extraer información del archivo
        const filename = fileInfo.name;
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
        const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
        
        // Generar datos del post
        const post = {
            id: slug,
            slug: slug,
            filename: filename,
            title: frontMatter.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            date: frontMatter.date || (dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0]),
            author: frontMatter.author || 'Autor',
            excerpt: frontMatter.excerpt || extractExcerpt(markdownContent),
            content: markdownContent,
            image: frontMatter.image || generatePostImage(frontMatter.title || slug),
            tags: frontMatter.tags ? frontMatter.tags.split(',').map(tag => tag.trim()) : ['General'],
            category: frontMatter.category || (frontMatter.tags ? frontMatter.tags.split(',')[0].trim() : 'General')
        };
        
        return post;
    } catch (error) {
        console.error(`Error loading post ${fileInfo.name}:`, error);
        return null;
    }
}

// Función para generar imagen de placeholder
function generatePostImage(title) {
    const colors = ['4F46E5', '059669', 'DC2626', 'D97706', '7C2D12'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const encodedTitle = encodeURIComponent(title?.substring(0, 20) || 'Post');
    return `https://via.placeholder.com/800x400/${randomColor}/ffffff?text=${encodedTitle}`;
}

// Función principal para cargar todos los posts
async function loadAllPosts() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const postsContainer = document.getElementById('posts-container');
    const errorMessage = document.getElementById('error-message');
    
    // Mostrar loading
    loadingIndicator.style.display = 'block';
    postsContainer.style.display = 'none';
    errorMessage.style.display = 'none';
    
    console.log('🚀 Iniciando carga de posts...');
    
    try {
        detectGitHubAPI();
        
        let files = [];
        
        // Intentar GitHub API primero
        if (BLOG_CONFIG.githubAPI) {
            console.log('📡 Intentando GitHub API:', BLOG_CONFIG.githubAPI);
            files = await getPostsFromGitHubAPI();
        }
        
        // Fallback a método local
        if (files.length === 0) {
            console.log('📁 Intentando método local...');
            files = await getPostsLocally();
        }
        
        console.log(`📄 Encontrados ${files.length} archivos`);
        
        if (files.length === 0) {
            throw new Error('No se han encontrado archivos de posts en la carpeta posts/');
        }
        
        // Cargar posts en paralelo
        const postPromises = files.slice(0, BLOG_CONFIG.maxPosts).map(loadPost);
        const loadedPosts = await Promise.all(postPromises);
        
        // Filtrar posts válidos y ordenar por fecha
        blogPosts = loadedPosts
            .filter(post => post !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        console.log(`✅ ${blogPosts.length} posts cargados exitosamente`);
        
        if (blogPosts.length === 0) {
            throw new Error('No se han podido procesar los archivos de posts');
        }
        
        // Renderizar posts
        renderPosts();
        
    } catch (error) {
        console.error('❌ Error cargando posts:', error);
        showError(error.message);
    }
}

// Función para renderizar los posts
function renderPosts() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const postsContainer = document.getElementById('posts-container');
    
    loadingIndicator.style.display = 'none';
    postsContainer.style.display = 'grid';
    postsContainer.innerHTML = '';
    
    blogPosts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postsContainer.appendChild(postElement);
    });
}

// Función para crear elemento de post
function createPostElement(post, index) {
    const article = document.createElement('article');
    article.className = 'post-card fade-in';
    article.style.animationDelay = `${index * 0.1}s`;
    
    article.innerHTML = `
        <div class="post-image">
            <img src="${post.image}" 
                 alt="${post.title}" 
                 loading="lazy"
                 onerror="this.src='${BLOG_CONFIG.defaultImage}'">
        </div>
        <div class="post-content">
            <div class="post-meta">
                <span class="post-tag">${post.category}</span>
                <time class="post-date" datetime="${post.date}">
                    ${formatDate(post.date)}
                </time>
            </div>
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="post.html?slug=${post.slug}" class="read-more">
                Read more
            </a>
        </div>
    `;
    
    return article;
}

// Función para formatear fechas
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const months = [
            'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
            'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
        ];
        
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
    } catch (error) {
        return dateString;
    }
}

// Función para mostrar errores
function showError(message) {
    const loadingIndicator = document.getElementById('loading-indicator');
    const postsContainer = document.getElementById('posts-container');
    const errorMessage = document.getElementById('error-message');
    const errorDetails = document.getElementById('error-details');
    
    loadingIndicator.style.display = 'none';
    postsContainer.style.display = 'none';
    errorMessage.style.display = 'block';
    
    errorDetails.textContent = message;
    
    // Información de debug
    console.group('🔍 Debug Information');
    console.log('Current URL:', window.location.href);
    console.log('Posts directory:', BLOG_CONFIG.postsDirectory);
    console.log('GitHub API:', BLOG_CONFIG.githubAPI);
    console.log('Loaded posts:', blogPosts.length);
    console.groupEnd();
}

// Funcionalidad de navegación suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función de inicialización
function initializeBlog() {
    console.log('🎯 Inicializando Code thinking blog...');
    
    // Configurar navegación suave
    setupSmoothScrolling();
    
    // Cargar posts
    loadAllPosts();
    
    // Configurar Marked.js si está disponible
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,
            gfm: true
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', initializeBlog);

// Función global para reintentar carga (usada por el botón de retry)
window.loadAllPosts = loadAllPosts;

// Exportar funciones para uso global
window.blogUtils = {
    loadAllPosts,
    formatDate,
    blogPosts: () => blogPosts
};
