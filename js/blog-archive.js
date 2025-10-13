let allPosts = [];
const POSTS_PER_PAGE = 6;
let currentPage = 1;

// Funció per formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny',
        'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'
    ];
    return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

// Carregar tots els posts
async function loadAllPosts() {
    const container = document.getElementById('posts-container');
    
    try {
        const response = await fetch('/posts-all.json');
        if (!response.ok) throw new Error('No s\'ha pogut carregar posts');
        
        allPosts = await response.json();
        renderPage(1);
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<p style="text-align: center;">Error carregant els posts</p>';
    }
}

// Renderitzar pàgina
function renderPage(page) {
    currentPage = page;
    const container = document.getElementById('posts-container');
    const start = (page - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const postsToShow = allPosts.slice(start, end);
    
    container.innerHTML = '';
    
    postsToShow.forEach((post, index) => {
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
    
    renderPagination();
}

// Renderitzar paginació
function renderPagination() {
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    const paginationContainer = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Botó anterior
    if (currentPage > 1) {
        html += `<button onclick="renderPage(${currentPage - 1})" class="pagination-btn">← Anterior</button>`;
    }
    
    // Números de pàgina
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<span class="pagination-current">${i}</span>`;
        } else {
            html += `<button onclick="renderPage(${i})" class="pagination-btn">${i}</button>`;
        }
    }
    
    // Botó següent
    if (currentPage < totalPages) {
        html += `<button onclick="renderPage(${currentPage + 1})" class="pagination-btn">Següent →</button>`;
    }
    
    paginationContainer.innerHTML = html;
}

// Inicialitzar
document.addEventListener('DOMContentLoaded', () => {
    loadAllPosts();
});
