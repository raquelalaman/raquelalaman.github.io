// Configuración global
const CONFIG = {
    postsPerPage: 6,
    postsDirectory: 'posts',
    githubRepo: '', // Se configurará automáticamente
    currentPage: 1,
    totalPosts: 0,
    allPosts: [],
    siteName: 'Mi Blog Personal',
    authorName: 'Tu Nombre'
};

// Variables globales para el estado de la aplicación
let currentSection = 'home';
let isLoading = false;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Configurar marked.js para procesamiento de markdown
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {}
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    // Detectar automáticamente el repositorio de GitHub
    detectGithubRepo();
    
    // Cargar posts iniciales
    loadPosts();
    
    // Configurar eventos
    setupEventListeners();
});

// Detecta automáticamente el repositorio de GitHub desde la URL
function detectGithubRepo() {
    const hostname = window.location.hostname;
    if (hostname.includes('github.io')) {
        const parts = hostname.split('.');
        if (parts.length >= 3) {
            const username = parts[0];
            const repoName = window.location.pathname.split('/')[1] || `${username}.github.io`;
            CONFIG.githubRepo = `https://api.github.com/repos/${username}/${repoName}/contents/${CONFIG.postsDirectory}`;
        }
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Configurar resaltado de sintaxis después de cargar contenido
    document.addEventListener('DOMContentLoaded', function() {
        hljs.highlightAll();
    });
}

// Función principal para cargar posts
async function loadPosts() {
    if (isLoading) return;
    
    showLoading(true);
    
    try {
        // Intentar cargar desde GitHub API
        if (CONFIG.githubRepo) {
            await loadFromGithubAPI();
        } else {
            // Cargar posts de ejemplo si no hay repositorio configurado
            loadExamplePosts();
        }
        
        displayPosts();
        updatePagination();
        
    } catch (error) {
        console.error('Error cargando posts:', error);
        loadExamplePosts();
        displayPosts();
        updatePagination();
        
        // Mostrar mensaje de bienvenida en consola
        console.log('%c¡Bienvenido al blog! 🚀', 'color: #2563eb; font-size: 16px; font-weight: bold;');
        console.log('%cTema con paleta azul, gris y blanco inspirado en portfolios profesionales', 'color: #3b82f6; font-size: 12px;');
    }
    
    showLoading(false);
}

// Cargar posts desde la API de GitHub
async function loadFromGithubAPI() {
    try {
        const response = await fetch(CONFIG.githubRepo);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const files = await response.json();
        const markdownFiles = files.filter(file => 
            file.name.endsWith('.md') && file.type === 'file'
        );
        
        CONFIG.allPosts = [];
        
        for (const file of markdownFiles) {
            try {
                const postResponse = await fetch(file.download_url);
                const content = await postResponse.text();
                const post = parseMarkdownPost(content, file.name);
                if (post) {
                    CONFIG.allPosts.push(post);
                }
            } catch (error) {
                console.error(`Error cargando post ${file.name}:`, error);
            }
        }
        
        // Ordenar posts por fecha (más recientes primero)
        CONFIG.allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        CONFIG.totalPosts = CONFIG.allPosts.length;
        
    } catch (error) {
        console.error('Error cargando desde GitHub API:', error);
        throw error;
    }
}

// Parsear contenido markdown y extraer metadatos
function parseMarkdownPost(content, filename) {
    try {
        const lines = content.split('\n');
        let frontMatterEnd = -1;
        let frontMatter = {};
        
        // Detectar y parsear front matter (YAML)
        if (lines[0].trim() === '---') {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '---') {
                    frontMatterEnd = i;
                    break;
                }
                const line = lines[i].trim();
                if (line.includes(':')) {
                    const [key, ...valueParts] = line.split(':');
                    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                    frontMatter[key.trim()] = value;
                }
            }
        }
        
        // Contenido markdown (sin front matter)
        const markdownContent = frontMatterEnd > -1 
            ? lines.slice(frontMatterEnd + 1).join('\n')
            : content;
        
        // Extraer título si no está en front matter
        let title = frontMatter.title;
        if (!title) {
            const titleMatch = markdownContent.match(/^#\s+(.+)/m);
            title = titleMatch ? titleMatch[1] : filename.replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
        }
        
        // Extraer fecha
        let date = frontMatter.date;
        if (!date) {
            // Intentar extraer fecha del nombre del archivo (formato: YYYY-MM-DD-titulo.md)
            const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
            date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
        }
        
        // Generar excerpt
        const plainText = markdownContent
            .replace(/^#+\s+/gm, '')
            .replace(/\*\*(.+?)\*\*/g, '$1')
            .replace(/\*(.+?)\*/g, '$1')
            .replace(/`(.+?)`/g, '$1')
            .replace(/\[(.+?)\]\(.+?\)/g, '$1')
            .replace(/!\[.*?\]\(.+?\)/g, '')
            .replace(/\n\s*\n/g, ' ')
            .trim();
        
        const excerpt = frontMatter.excerpt || plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
        
        return {
            id: filename.replace('.md', ''),
            title: title,
            date: date,
            author: frontMatter.author || 'Autor',
            excerpt: excerpt,
            content: markdownContent,
            tags: frontMatter.tags ? frontMatter.tags.split(',').map(tag => tag.trim()) : [],
            image: frontMatter.image || null,
            filename: filename
        };
    } catch (error) {
        console.error('Error parseando post:', error);
        return null;
    }
}

// Cargar posts de ejemplo cuando no hay repositorio configurado
function loadExamplePosts() {
    CONFIG.allPosts = [
        {
            id: 'welcome-post',
            title: 'Bienvenido a tu nuevo blog',
            date: '2024-01-15',
            author: 'Autor del Blog',
            excerpt: 'Este es tu primer post de ejemplo. Aquí puedes escribir sobre cualquier tema que te interese usando formato Markdown.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            content: `# Bienvenido a tu nuevo blog

¡Felicidades! Has configurado exitosamente tu blog personal usando GitHub Pages.

## Características principales

Este tema de blog incluye:

- **Diseño responsive**: Se ve perfecto en cualquier dispositivo
- **Soporte para Markdown**: Escribe tus posts usando la sintaxis familiar de Markdown
- **Resaltado de sintaxis**: Perfecto para compartir código
- **Navegación intuitiva**: Fácil de usar para tus lectores

## Cómo agregar un nuevo post

1. Crea un archivo \`.md\` en la carpeta \`posts/\`
2. Agrega front matter al inicio del archivo:

\`\`\`yaml
---
title: "Título de tu post"
date: "2024-01-15"
author: "Tu nombre"
excerpt: "Breve descripción del post"
tags: "tecnología, web, desarrollo"
---
\`\`\`

3. Escribe tu contenido en Markdown
4. ¡Publícalo con git push!

## Ejemplo de código

\`\`\`javascript
function saludar(nombre) {
    return \`¡Hola, \${nombre}!\`;
}

console.log(saludar('Mundo'));
\`\`\`

¡Empieza a escribir y comparte tus ideas con el mundo!`,
            tags: ['blog', 'inicio', 'github-pages'],
            filename: 'welcome-post.md'
        },
        {
            id: 'markdown-guide',
            title: 'Guía rápida de Markdown',
            date: '2024-01-10',
            author: 'Autor del Blog',
            excerpt: 'Aprende los elementos básicos de Markdown para escribir posts atractivos y bien formateados.',
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            content: `# Guía rápida de Markdown

Markdown es un lenguaje de marcado ligero que te permite formatear texto de manera sencilla.

## Encabezados

\`\`\`markdown
# Encabezado 1
## Encabezado 2
### Encabezado 3
\`\`\`

## Texto

- **Texto en negrita**
- *Texto en cursiva*
- \`Código inline\`
- [Enlaces](https://example.com)

## Listas

### Lista con viñetas
- Elemento 1
- Elemento 2
- Elemento 3

### Lista numerada
1. Primer elemento
2. Segundo elemento
3. Tercer elemento

## Citas

> Esta es una cita en bloque.
> Muy útil para destacar texto importante.

## Código

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Mi página</title>
</head>
<body>
    <h1>¡Hola mundo!</h1>
</body>
</html>
\`\`\`

¡Con estos elementos básicos puedes crear posts increíbles!`,
            tags: ['markdown', 'tutorial', 'escritura'],
            filename: 'markdown-guide.md'
        },
        {
            id: 'tips-blog',
            title: 'Tips para un blog exitoso',
            date: '2024-01-05',
            author: 'Autor del Blog',
            excerpt: 'Consejos prácticos para crear contenido de calidad y hacer crecer tu audiencia.',
            image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            content: `# Tips para un blog exitoso

Crear un blog exitoso requiere tiempo, dedicación y estrategia. Aquí tienes algunos consejos:

## 1. Contenido de calidad

- Escribe sobre temas que conoces y te apasionan
- Investiga antes de escribir
- Proporciona valor real a tus lectores
- Mantén un tono consistente

## 2. Consistencia

- Establece un calendario de publicación
- Mantén un diseño coherente
- Usa un estilo de escritura consistente

## 3. SEO básico

- Usa títulos descriptivos
- Incluye palabras clave relevantes
- Optimiza las imágenes
- Crea meta descripciones atractivas

## 4. Interacción con lectores

- Responde a los comentarios
- Haz preguntas al final de los posts
- Comparte en redes sociales
- Colabora con otros bloggers

## 5. Análisis y mejora

- Usa Google Analytics
- Revisa qué contenido funciona mejor
- Aprende de tus errores
- Adapta tu estrategia según los resultados

¡Recuerda que el éxito no llega de la noche a la mañana!`,
            tags: ['blogging', 'consejos', 'seo'],
            filename: 'tips-blog.md'
        }
    ];
    
    CONFIG.totalPosts = CONFIG.allPosts.length;
}

// Mostrar/ocultar indicador de carga
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
    isLoading = show;
}

// Mostrar posts en la página principal
function displayPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;
    
    const startIndex = (CONFIG.currentPage - 1) * CONFIG.postsPerPage;
    const endIndex = startIndex + CONFIG.postsPerPage;
    const postsToShow = CONFIG.allPosts.slice(startIndex, endIndex);
    
    postsGrid.innerHTML = '';
    
    postsToShow.forEach(post => {
        const postCard = createPostCard(post);
        postsGrid.appendChild(postCard);
    });
}

// Crear tarjeta de post
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.onclick = () => showPost(post);
    
    const formattedDate = formatDate(post.date);
    const readingTime = calculateReadingTime(post.content);
    const tagsHtml = post.tags.length > 0 
        ? `<div class="post-tags" style="margin-top: 1rem;">${post.tags.slice(0, 3).map(tag => `<span style="display: inline-block; background: var(--primary-blue); color: white; padding: 0.25rem 0.75rem; border-radius: 6px; font-size: 0.75rem; margin-right: 0.5rem; font-weight: 500;">${tag}</span>`).join('')}</div>`
        : '';
    
    const imageHtml = post.image 
        ? `<img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">` 
        : '';
    
    card.innerHTML = `
        ${imageHtml}
        <h3>${post.title}</h3>
        <div class="post-meta">
            <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
            <span><i class="fas fa-clock"></i> ${readingTime} min</span>
        </div>
        <p class="post-excerpt">${post.excerpt}</p>
        ${tagsHtml}
        <a href="#" class="read-more">
            Leer más <i class="fas fa-arrow-right"></i>
        </a>
    `;
    
    return card;
}

// Formatear fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Calcular tiempo de lectura estimado
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes);
}

// Mostrar post individual
function showPost(post) {
    const postSection = document.getElementById('post-section');
    const postContent = document.getElementById('post-content');
    
    if (!postSection || !postContent) return;
    
    // Procesar markdown a HTML
    const htmlContent = marked.parse(post.content);
    
    const formattedDate = formatDate(post.date);
    
    const postImageHtml = post.image 
        ? `<img src="${post.image}" alt="${post.title}" class="post-hero-image" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--border-radius-lg); margin-bottom: 2rem;">` 
        : '';
    
    postContent.innerHTML = `
        <div class="post-header">
            <h1>${post.title}</h1>
            <div class="post-meta" style="margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span><i class="fas fa-calendar"></i> ${formattedDate}</span>
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-clock"></i> ${calculateReadingTime(post.content)} min de lectura</span>
                ${post.tags.length > 0 ? `<div style="margin-top: 1rem;">${post.tags.map(tag => `<span style="display: inline-block; background: var(--primary-blue); color: white; padding: 0.375rem 1rem; border-radius: 6px; font-size: 0.8rem; margin-right: 0.75rem; margin-bottom: 0.5rem; font-weight: 500;">${tag}</span>`).join('')}</div>` : ''}
            </div>
        </div>
        ${postImageHtml}
        <div class="post-body">
            ${htmlContent}
        </div>
    `;
    
    // Cambiar a la sección de post
    showSection('post');
    
    // Resaltar código después de cargar contenido
    setTimeout(() => {
        hljs.highlightAll();
    }, 100);
    
    // Scroll al inicio
    window.scrollTo(0, 0);
}

// Actualizar paginación
function updatePagination() {
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageInfo = document.getElementById('page-info');
    
    if (!pagination || CONFIG.totalPosts <= CONFIG.postsPerPage) {
        pagination.style.display = 'none';
        return;
    }
    
    pagination.style.display = 'flex';
    
    const totalPages = Math.ceil(CONFIG.totalPosts / CONFIG.postsPerPage);
    
    prevBtn.disabled = CONFIG.currentPage === 1;
    nextBtn.disabled = CONFIG.currentPage === totalPages;
    
    pageInfo.textContent = `Página ${CONFIG.currentPage} de ${totalPages}`;
}

// Navegación entre páginas
function loadPreviousPage() {
    if (CONFIG.currentPage > 1) {
        CONFIG.currentPage--;
        displayPosts();
        updatePagination();
        window.scrollTo(0, 0);
    }
}

function loadNextPage() {
    const totalPages = Math.ceil(CONFIG.totalPosts / CONFIG.postsPerPage);
    if (CONFIG.currentPage < totalPages) {
        CONFIG.currentPage++;
        displayPosts();
        updatePagination();
        window.scrollTo(0, 0);
    }
}

// Navegación entre secciones
function showSection(sectionName) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Actualizar navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.getElementById(`${sectionName}-link`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Cerrar menú móvil si está abierto
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.remove('active');
    }
}

function showHome() {
    showSection('home');
    CONFIG.currentPage = 1;
    displayPosts();
    updatePagination();
}

function showAbout() {
    showSection('about');
}

function showArchive() {
    showSection('archive');
    displayArchive();
}

// Mostrar archivo de posts
function displayArchive() {
    const archiveList = document.getElementById('archive-list');
    if (!archiveList) return;
    
    archiveList.innerHTML = '';
    
    CONFIG.allPosts.forEach(post => {
        const archiveItem = document.createElement('div');
        archiveItem.className = 'archive-item';
        archiveItem.onclick = () => showPost(post);
        
        const formattedDate = formatDate(post.date);
        
        archiveItem.innerHTML = `
            <a href="#" class="archive-title">${post.title}</a>
            <span class="archive-date">${formattedDate}</span>
        `;
        
        archiveList.appendChild(archiveItem);
    });
}

// Toggle menú móvil
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejo de errores global
window.addEventListener('error', function(e) {
    console.error('Error global:', e.error);
});

// Añadir efectos de hover suaves con colores azules
function addHoverEffects() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('.post-card')) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        }
        if (e.target.matches('.tech-tag, .archive-item')) {
            e.target.style.transform = 'translateY(-1px)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('.post-card, .tech-tag, .archive-item')) {
            e.target.style.transform = 'translateY(0)';
            if (e.target.matches('.post-card')) {
                e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
            }
        }
    });
}

// Evento de redimensionamiento de ventana
window.addEventListener('resize', debounce(() => {
    // Cerrar menú móvil al redimensionar
    const nav = document.querySelector('.nav');
    if (nav && window.innerWidth > 768) {
        nav.classList.remove('active');
    }
}, 250));
