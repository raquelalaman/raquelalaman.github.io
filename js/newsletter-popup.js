// Newsletter Popup
document.addEventListener('DOMContentLoaded', () => {
    // Comprovar si ja s'ha tancat o subscrit
    const hasClosedPopup = localStorage.getItem('newsletter-closed');
    const hasSubscribed = localStorage.getItem('newsletter-subscribed');
    
    if (hasClosedPopup || hasSubscribed) {
        return;
    }
    
    // Crear popup després de 10 segons o al scroll
    let popupShown = false;
    
    const showPopup = () => {
        if (popupShown) return;
        popupShown = true;
        
        const popup = document.createElement('div');
        popup.className = 'newsletter-popup';
        popup.innerHTML = `
            <div class="newsletter-popup-overlay"></div>
            <div class="newsletter-popup-content">
                <button class="newsletter-close" aria-label="Tancar">&times;</button>
                <div class="newsletter-icon">
                    <i class="fas fa-envelope-open-text"></i>
                </div>
                <h3>No et perdis cap reflexió! 💡</h3>
                <p class="newsletter-subtitle">Uneix-te a la comunitat de <strong>Code thinking</strong></p>
                <p class="newsletter-description">
                    Subscriu-te i rep directament al teu email:
                </p>
                <ul class="newsletter-benefits">
                    <li><i class="fas fa-check-circle"></i> Articles nous sobre tecnologia i innovació</li>
                    <li><i class="fas fa-check-circle"></i> Recursos exclusius i tutorials</li>
                    <li><i class="fas fa-check-circle"></i> Novetats sobre projectes de R+D en salut digital</li>
                    <li><i class="fas fa-check-circle"></i> Sense spam, només contingut de valor</li>
                </ul>
                
                <!-- CANVIA AQUESTA URL PER LA TEVA URL DE MAILCHIMP, SUBSTACK, O EL SERVEI QUE UTILITZIS -->
                <form class="newsletter-form" action="YOUR_NEWSLETTER_URL_HERE" method="POST">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="El teu email" 
                        required 
                        class="newsletter-input"
                    >
                    <button type="submit" class="newsletter-submit">
                        Subscriu-me! <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
                
                <p class="newsletter-privacy">
                    <i class="fas fa-lock"></i> Les teves dades estan protegides. 
                    Pots donar-te de baixa quan vulguis.
                </p>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Animació d'entrada
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
        
        // Tancar popup
        const closeBtn = popup.querySelector('.newsletter-close');
        const overlay = popup.querySelector('.newsletter-popup-overlay');
        
        const closePopup = () => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 300);
            localStorage.setItem('newsletter-closed', 'true');
        };
        
        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);
        
        // Marcar com subscrit quan s'envia el formulari
        const form = popup.querySelector('.newsletter-form');
        form.addEventListener('submit', () => {
            localStorage.setItem('newsletter-subscribed', 'true');
        });
    };
    
    // Mostrar després de 10 segons
    setTimeout(showPopup, 10000);
    
    // O mostrar quan fa scroll al 50% de la pàgina
    let scrollTriggered = false;
    window.addEventListener('scroll', () => {
        if (scrollTriggered) return;
        
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50) {
            scrollTriggered = true;
            showPopup();
        }
    });
});

// CSS per al popup (afegir a style.css)
const style = document.createElement('style');
style.textContent = `
.newsletter-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.newsletter-popup.show {
    opacity: 1;
    visibility: visible;
}

.newsletter-popup-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
}

.newsletter-popup-content {
    position: relative;
    background: white;
    max-width: 500px;
    width: 90%;
    padding: 3rem 2.5rem;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    text-align: center;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.newsletter-popup.show .newsletter-popup-content {
    transform: scale(1);
}

.newsletter-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: #64748b;
    cursor: pointer;
    transition: color 0.3s ease;
    line-height: 1;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.newsletter-close:hover {
    color: #1e293b;
}

.newsletter-icon {
    font-size: 3rem;
    color: #6065FF;
    margin-bottom: 1rem;
}

.newsletter-popup-content h3 {
    font-size: 1.8rem;
    color: #1e293b;
    margin-bottom: 0.5rem;
}

.newsletter-subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 1.5rem;
}

.newsletter-description {
    color: #64748b;
    margin-bottom: 1rem;
}

.newsletter-benefits {
    list-style: none;
    text-align: left;
    margin: 1.5rem 0;
    padding: 0;
}

.newsletter-benefits li {
    padding: 0.5rem 0;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.newsletter-benefits i {
    color: #6065FF;
    font-size: 1.1rem;
}

.newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem 0 1rem;
}

.newsletter-input {
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.newsletter-input:focus {
    outline: none;
    border-color: #6065FF;
}

.newsletter-submit {
    padding: 1rem 2rem;
    background: #6065FF;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.newsletter-submit:hover {
    background: #3F43A9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(96, 101, 255, 0.4);
}

.newsletter-privacy {
    font-size: 0.85rem;
    color: #64748b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.newsletter-privacy i {
    color: #6065FF;
}

@media (max-width: 768px) {
    .newsletter-popup-content {
        padding: 2rem 1.5rem;
    }
    
    .newsletter-popup-content h3 {
        font-size: 1.5rem;
    }
    
    .newsletter-benefits {
        font-size: 0.9rem;
    }
}
`;
document.head.appendChild(style);
