// js/dark-mode.js
// Toggle Mode Fosc/Clar amb suport per [data-theme="dark"] i .dark-mode

const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
const body = document.body;
const icon = darkModeToggle.querySelector('i');

// Carregar preferència guardada
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    body.classList.add('dark-mode'); // Per compatibilitat
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Toggle mode fosc
darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        // Canviar a mode clar
        html.removeAttribute('data-theme');
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        // Canviar a mode fosc
        html.setAttribute('data-theme', 'dark');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});
