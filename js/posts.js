// js/newsletter-popup.js

(function() {
    'use strict';

    // Funció per crear el HTML del popup
    function createPopupHTML() {
        return `
            <!-- Overlay -->
            <div id="newsletter-overlay" class="newsletter-overlay">
                <!-- Modal -->
                <div id="newsletter-modal" class="newsletter-modal">
                    <!-- Botó tancar -->
                    <button id="newsletter-close" class="newsletter-close" aria-label="Tancar">
                        <i class="fas fa-times"></i>
                    </button>

                    <!-- Fons decoratiu -->
                    <div class="newsletter-header"></div>

                    <div class="newsletter-content">
                        <!-- Icona de bústia -->
                        <div class="newsletter-icon">
                            <i class="fas fa-envelope-open-text"></i>
                        </div>

                        <div id="newsletter-form-container">
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
                            <div class="newsletter-form">
                                <!-- Camp Nom -->
                                <div class="newsletter-input-wrapper">
                                    <input 
                                        type="text" 
                                        id="newsletter-name" 
                                        placeholder="El teu nom *" 
                                        required
                                        class="newsletter-input"
                                    >
                                    <span id="newsletter-name-error" class="newsletter-error"></span>
                                </div>

                                <!-- Camp Email -->
                                <div class="newsletter-input-wrapper">
                                    <input 
                                        type="email" 
                                        id="newsletter-email" 
                                        placeholder="Adreça de correu electrònic *" 
                                        required
                                        class="newsletter-input"
                                    >
                                    <span id="newsletter-email-error" class="newsletter-error"></span>
                                </div>

                                <button id="newsletter-submit" class="newsletter-button">
                                    Subscriu-me! <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>

                            <p class="newsletter-privacy">
                                <i class="fas fa-lock"></i> No compartirem mai les teves dades. Pots donar-te de baixa en qualsevol moment.
                            </p>
                        </div>

                        <!-- Missatge d'èxit (ocult inicialment) -->
                        <div id="newsletter-success" class="newsletter-success" style="display: none;">
                            <div class="newsletter-success-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <h3 class="newsletter-success-title">Gràcies, <span id="success-name"></span>!</h3>
                            <p class="newsletter-success-text">T'hem subscrit correctament. Aviat rebràs notícies!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Funció per crear els estils CSS
    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .newsletter-overlay {
                position: fixed;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem 1rem;
                opacity: 0;
                transition: opacity 0.3s ease-out;
                overflow-y: auto;
            }

            .newsletter-overlay.show {
                opacity: 1;
            }

            .newsletter-modal {
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 440px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9);
                transition: transform 0.3s ease-out;
                margin: auto;
            }

            .newsletter-overlay.show .newsletter-modal {
                transform: scale(1);
            }

            .newsletter-close {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                background: rgba(255, 255, 255, 0.95);
                border: none;
                color: #64748b;
                cursor: pointer;
                font-size: 1.3rem;
                z-index: 10;
                transition: all 0.2s;
                padding: 0.4rem;
                line-height: 1;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .newsletter-close:hover {
                background: white;
                color: #1e293b;
                transform: rotate(90deg);
            }

            .newsletter-header {
                height: 70px;
                background: linear-gradient(135deg, #6065FF 0%, #3F43A9 100%);
                position: relative;
                border-radius: 16px 16px 0 0;
            }

            .newsletter-content {
                padding: 0 1.5rem 1.5rem 1.5rem;
                margin-top: -1.4rem;
            }

            .newsletter-icon {
                background: white;
                border-radius: 50%;
                width: 52px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                margin: 0 auto 0.75rem;
                font-size: 1.5rem;
                color: #6065FF;
            }

            .newsletter-content h3 {
                font-size: 1.3rem;
                font-weight: 700;
                color: #1e293b;
                text-align: center;
                margin-bottom: 0.3rem;
                line-height: 1.25;
            }

            .newsletter-subtitle {
                color: #64748b;
                text-align: center;
                margin-bottom: 0.7rem;
                font-size: 0.875rem;
                line-height: 1.3;
            }

            .newsletter-description {
                color: #64748b;
                text-align: center;
                margin-bottom: 0.55rem;
                font-size: 0.8rem;
            }

            .newsletter-benefits {
                list-style: none;
                padding: 0;
                margin: 0 0 0.75rem 0;
                text-align: left;
            }

            .newsletter-benefits li {
                padding: 0.3rem 0;
                color: #1e293b;
                display: flex;
                align-items: flex-start;
                gap: 0.5rem;
                font-size: 0.8rem;
                line-height: 1.3;
            }

            .newsletter-benefits li i {
                color: #6065FF;
                font-size: 0.9rem;
                margin-top: 0.05rem;
                flex-shrink: 0;
            }

            .newsletter-form {
                display: flex;
                flex-direction: column;
                gap: 0.6rem;
                margin-top: 0.75rem;
            }

            .newsletter-input-wrapper {
                position: relative;
            }

            .newsletter-input {
                width: 100%;
                padding: 0.7rem 0.9rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 0.9rem;
                transition: all 0.2s;
                box-sizing: border-box;
                font-family: inherit;
            }

            .newsletter-input:focus {
                outline: none;
                border-color: #6065FF;
                box-shadow: 0 0 0 3px rgba(96, 101, 255, 0.1);
            }

            .newsletter-input.error {
                border-color: #ef4444;
                background-color: #fef2f2;
            }

            .newsletter-input.error:focus {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }

            .newsletter-error {
                display: none;
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 0.3rem;
                animation: shake 0.3s ease-in-out;
            }

            .newsletter-error.show {
                display: block;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }

            .newsletter-button {
                width: 100%;
                background: #6065FF;
                color: white;
                font-weight: 600;
                padding: 0.7rem 1.3rem;
                border-radius: 8px;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.45rem;
                margin-top: 0.2rem;
            }

            .newsletter-button:hover {
                background: #3F43A9;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(96, 101, 255, 0.4);
            }

            .newsletter-button:active {
                transform: translateY(0);
            }

            .newsletter-button:disabled {
                background: #94a3b8;
                cursor: not-allowed;
                transform: none;
            }

            .newsletter-privacy {
                font-size: 0.7rem;
                color: #64748b;
                text-align: center;
                margin-top: 0.85rem;
                line-height: 1.35;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.35rem;
            }

            .newsletter-privacy i {
                color: #6065FF;
                font-size: 0.8rem;
            }

            .newsletter-success {
                text-align: center;
                padding: 1.25rem 0 0.85rem;
            }

            .newsletter-success-icon {
                font-size: 3.25rem;
                margin-bottom: 0.9rem;
                color: #10b981;
            }

            .newsletter-success-title {
                font-size: 1.3rem;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 0.45rem;
            }

            .newsletter-success-text {
                color: #64748b;
                font-size: 0.9rem;
                line-height: 1.35;
            }

            /* Mode fosc */
            [data-theme="dark"] .newsletter-modal {
                background: #1e293b;
            }

            [data-theme="dark"] .newsletter-content h3 {
                color: #f1f5f9;
            }

            [data-theme="dark"] .newsletter-subtitle,
            [data-theme="dark"] .newsletter-description,
            [data-theme="dark"] .newsletter-benefits li,
            [data-theme="dark"] .newsletter-privacy {
                color: #cbd5e1;
            }

            [data-theme="dark"] .newsletter-input {
                background: #334155;
                border-color: #475569;
                color: #f1f5f9;
            }

            [data-theme="dark"] .newsletter-input::placeholder {
                color: #94a3b8;
            }

            [data-theme="dark"] .newsletter-close {
                background: rgba(30, 41, 59, 0.9);
                color: #cbd5e1;
            }

            [data-theme="dark"] .newsletter-close:hover {
                background: #1e293b;
                color: #f1f5f9;
            }

            [data-theme="dark"] .newsletter-success-title {
                color: #f1f5f9;
            }

            [data-theme="dark"] .newsletter-success-text {
                color: #cbd5e1;
            }

            /* Responsive */
            @media (max-width: 640px) {
                .newsletter-modal {
                    max-width: 92%;
                }

                .newsletter-content {
                    padding: 0 1.4rem 1.4rem 1.4rem;
                }

                .newsletter-content h3 {
                    font-size: 1.25rem;
                }

                .newsletter-benefits {
                    font-size: 0.8rem;
                }

                .newsletter-benefits li {
                    padding: 0.3rem 0;
                }
            }

            /* Scrollbar personalitzada (per si de cas en pantalles molt petites) */
            .newsletter-modal::-webkit-scrollbar {
                width: 6px;
            }

            .newsletter-modal::-webkit-scrollbar-track {
                background: #f1f5f9;
            }

            .newsletter-modal::-webkit-scrollbar-thumb {
                background: #cbd5e1;
                border-radius: 3px;
            }

            .newsletter-modal::-webkit-scrollbar-thumb:hover {
                background: #94a3b8;
            }

            [data-theme="dark"] .newsletter-modal::-webkit-scrollbar-track {
                background: #1e293b;
            }

            [data-theme="dark"] .newsletter-modal::-webkit-scrollbar-thumb {
                background: #475569;
            }

            [data-theme="dark"] .newsletter-modal::-webkit-scrollbar-thumb:hover {
                background: #64748b;
            }
        `;
        return style;
    }

    // Funció per validar l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Funció per mostrar error en un camp específic
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + '-error');
        
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    // Funció per netejar error d'un camp específic
    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + '-error');
        
        input.classList.remove('error');
        errorSpan.classList.remove('show');
    }

    // Funció per enviar a Google Sheets
    async function saveToGoogleSheets(name, email) {
        // 🔴 Google Apps Script
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwt_XApJn3K-A0mcjNsilK9fCzqmyU6WDLGq_mvj_hrO1I8qjXrCiHrUmDKusy1YTETDQ/exec';
        
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: name,
                    email: email,
                    date: new Date().toISOString(),
                    timestamp: new Date().toLocaleString('ca-ES', { 
                        timeZone: 'Europe/Madrid',
                        dateStyle: 'short',
                        timeStyle: 'short'
                    })
                })
            });
            
            console.log('✅ Dades enviades a Google Sheets');
            console.log('📧 Nom:', name);
            console.log('📧 Email:', email);
            return true;
        } catch (error) {
            console.error('❌ Error al enviar a Google Sheets:', error);
            return false;
        }
    }

    // Funció per mostrar el popup
    function showPopup() {
        const overlay = document.getElementById('newsletter-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('show');
            }, 100);
        }
    }

    // Funció per amagar el popup
    function hidePopup() {
        const overlay = document.getElementById('newsletter-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    }

    // Funció per gestionar l'enviament
    async function handleSubmit() {
        const nameInput = document.getElementById('newsletter-name');
        const emailInput = document.getElementById('newsletter-email');
        const submitBtn = document.getElementById('newsletter-submit');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        let hasErrors = false;
        
        // Netejar errors previs
        clearError('newsletter-name');
        clearError('newsletter-email');
        
        // Validar nom
        if (!name) {
            showError('newsletter-name', 'Si us plau, introdueix el teu nom');
            hasErrors = true;
        } else if (name.length < 2) {
            showError('newsletter-name', 'El nom ha de tenir mínim 2 caràcters');
            hasErrors = true;
        }
        
        // Validar email
        if (!email) {
            showError('newsletter-email', 'Si us plau, introdueix el teu correu electrònic');
            hasErrors = true;
        } else if (!validateEmail(email)) {
            showError('newsletter-email', 'Si us plau, introdueix un correu electrònic vàlid');
            hasErrors = true;
        }
        
        // Si hi ha errors, no continuar
        if (hasErrors) {
            return;
        }
        
        // Deshabilitar el botó mentre s'envia
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviant...';
        
        // Enviar a Google Sheets
        await saveToGoogleSheets(name, email);
        
        // Guardar que l'usuari s'ha subscrit
        localStorage.setItem('newsletter_subscribed', 'true');
        localStorage.setItem('newsletter_user_name', name);
        localStorage.setItem('newsletter_user_email', email);
        
        // Mostrar missatge d'èxit amb el nom
        document.getElementById('success-name').textContent = name;
        document.getElementById('newsletter-form-container').style.display = 'none';
        document.getElementById('newsletter-success').style.display = 'block';
        
        // Tancar després de 3 segons
        setTimeout(() => {
            hidePopup();
        }, 3000);
    }

    // Funció per inicialitzar el popup
    function init() {
        // MODE DEBUG: Descomenta per veure sempre el popup
        // localStorage.clear();
        
        // Verificar si l'usuari ja va interactuar amb el popup
        const hasSubscribed = localStorage.getItem('newsletter_subscribed');
        const hasClosed = localStorage.getItem('newsletter_closed');
        
        if (hasSubscribed || hasClosed) {
            return; // No mostrar el popup
        }

        // Agregar estils
        document.head.appendChild(createStyles());

        // Agregar HTML del popup
        const popupContainer = document.createElement('div');
        popupContainer.innerHTML = createPopupHTML();
        document.body.appendChild(popupContainer.firstElementChild);

        // Event listeners
        const closeBtn = document.getElementById('newsletter-close');
        const overlay = document.getElementById('newsletter-overlay');
        const submitBtn = document.getElementById('newsletter-submit');
        const nameInput = document.getElementById('newsletter-name');
        const emailInput = document.getElementById('newsletter-email');

        closeBtn.addEventListener('click', () => {
            localStorage.setItem('newsletter_closed', 'true');
            hidePopup();
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                localStorage.setItem('newsletter_closed', 'true');
                hidePopup();
            }
        });

        submitBtn.addEventListener('click', handleSubmit);

        // Permetre enviar amb Enter en ambdós camps
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });

        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        });

        // Netejar error quan l'usuari comenci a escriure
        nameInput.addEventListener('input', () => clearError('newsletter-name'));
        emailInput.addEventListener('input', () => clearError('newsletter-email'));

        // Mostrar el popup després de 10 segons
        setTimeout(showPopup, 10000);
        
        // O quan fa scroll al 50%
        let scrollTriggered = false;
        window.addEventListener('scroll', () => {
            if (scrollTriggered) return;
            
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 50) {
                scrollTriggered = true;
                showPopup();
            }
        });
    }

    // Inicialitzar quan el DOM estigui llest
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
