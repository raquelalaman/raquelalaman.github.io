let blogPosts = [];

// Funció per formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Funció per carregar posts des de Jekyll
async function loadAllPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const response = await fetch('/posts.json');
        if (!response.ok) {
            throw new Error('No s\'ha pogut carregar posts.json');
        }
        
        const posts = await response.json();
        
        // Ordenar posts per data (més recents primer)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Agafar els 6 posts més recents per la graella 3x2
        blogPosts = posts.slice(0, 6);        
        renderPosts();
    } catch (error) {
        console.error('Error carregant posts:', error);
        container.innerHTML = `
            <div class="post-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>Error carregant els posts</h3>
                <p>${error.message}</p>
                <p style="margin-top: 1rem; font-size: 0.9rem;">Assegura't que tens el fitxer <code>posts.json</code> a l'arrel i que Jekyll està processat correctament.</p>
            </div>
        `;
    }
}

// Funció per renderitzar posts
function renderPosts() {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';

    if (blogPosts.length === 0) {
        container.innerHTML = `
            <div class="post-card" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No hi ha posts disponibles</h3>
                <p>Afegeix posts a la carpeta _posts/</p>
            </div>
        `;
        return;
    }

    blogPosts.forEach((post, index) => {
        const postElement = document.createElement('article');
        postElement.className = 'post-card fade-in';
        postElement.style.animationDelay = `${index * 0.1}s`;
        
        postElement.innerHTML = `
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" 
                     onerror="this.src='https://via.placeholder.com/400x250/6065FF/ffffff?text=Post'">
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-tag">${post.category}</span>
                    <span class="post-date">${formatDate(post.date)}</span>
                </div>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="read-more">Llegeix més →</a>
            </div>
        `;

        container.appendChild(postElement);
    });
}

// Funcionalitat de navegació suau
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicialitzar la pàgina
document.addEventListener('DOMContentLoaded', () => {
    loadAllPosts();
    initSmoothScroll();
});
