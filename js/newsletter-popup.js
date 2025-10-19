// js/newsletter-popup.js

(function() {
    'use strict';

    // Función para crear el HTML del popup
    function createPopupHTML() {
        return `
            <!-- Overlay -->
            <div id="newsletter-overlay" class="newsletter-overlay">
                <!-- Modal -->
                <div id="newsletter-modal" class="newsletter-modal">
                    <!-- Botón cerrar -->
                    <button id="newsletter-close" class="newsletter-close" aria-label="Cerrar">
                        <i class="fas fa-times"></i>
                    </button>

                    <!-- Fondo decorativo -->
                    <div class="newsletter-header"></div>

                    <div class="newsletter-content">
                        <!-- Icono de café -->
                        <div class="newsletter-icon">
                            <span>☕</span>
                        </div>

                        <div id="newsletter-form-container">
                            <h2 class="newsletter-title">Fem un cafè!</h2>
                            <p class="newsletter-subtitle">Vols saber-ne més? Envia'm un missatge!</p>

                            <div class="newsletter-form">
                                <!-- Campo Nombre -->
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

                                <!-- Campo Email -->
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
                                    Subscriu-te!
                                </button>
                            </div>

                            <p class="newsletter-privacy">
                                No compartirem mai les teves dades. Pots donar-te de baixa en qualsevol moment.
                            </p>
                        </div>

                        <!-- Mensaje de éxito (oculto inicialmente) -->
                        <div id="newsletter-success" class="newsletter-success" style="display: none;">
                            <div class="newsletter-success-icon">✓</div>
                            <h3 class="newsletter-success-title">Gràcies, <span id="success-name"></span>!</h3>
                            <p class="newsletter-success-text">T'hem subscrit correctament. Aviat rebràs notícies!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Función para crear los estilos CSS
    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .newsletter-overlay {
                position: fixed;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                opacity: 0;
                transition: opacity 0.5s ease-out;
            }

            .newsletter-overlay.show {
                opacity: 1;
            }

            .newsletter-modal {
                background: white;
                border-radius: 0.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                max-width: 28rem;
                width: 100%;
                position: relative;
                overflow: hidden;
                transform: scale(0.95);
                transition: transform 0.5s ease-out;
            }

            .newsletter-overlay.show .newsletter-modal {
                transform: scale(1);
            }

            .newsletter-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                color: #6b7280;
                cursor: pointer;
                font-size: 1.5rem;
                z-index: 10;
                transition: color 0.2s;
                padding: 0.5rem;
                line-height: 1;
            }

            .newsletter-close:hover {
                color: #374151;
            }

            .newsletter-header {
                height: 8rem;
                position: relative;
            }

            .newsletter-header::after {
                content: '';
                position: absolute;
                inset: 0;
                opacity: 0.2;
            }

            .newsletter-content {
                padding: 0 2rem 2rem 2rem;
                margin-top: -2rem;
            }

            .newsletter-icon {
                background: white;
                border-radius: 50%;
                width: 4rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                margin: 0 auto 1.5rem;
                font-size: 2rem;
            }

            .newsletter-title {
                font-size: 1.875rem;
                font-weight: 700;
                color: #1f2937;
                text-align: center;
                margin-bottom: 0.75rem;
            }

            .newsletter-subtitle {
                color: #4b5563;
                text-align: center;
                margin-bottom: 1.5rem;
            }

            .newsletter-form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .newsletter-input-wrapper {
                position: relative;
            }

            .newsletter-input {
                width: 100%;
                padding: 0.75rem 1rem;
                border: 1px solid #d1d5db;
                border-radius: 0.375rem;
                font-size: 1rem;
                transition: all 0.2s;
                box-sizing: border-box;
            }

            .newsletter-input:focus {
                outline: none;
                border-color: #f59e0b;
                box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
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
                font-size: 0.875rem;
                margin-top: 0.25rem;
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
                background-color: #1f2937;
                color: white;
                font-weight: 500;
                padding: 0.75rem 1rem;
                border-radius: 0.375rem;
                border: none;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 1rem;
            }

            .newsletter-button:hover {
                background-color: #374151;
                transform: scale(1.02);
            }

            .newsletter-button:active {
                transform: scale(0.98);
            }

            .newsletter-button:disabled {
                background-color: #9ca3af;
                cursor: not-allowed;
                transform: none;
            }

            .newsletter-privacy {
                font-size: 0.75rem;
                color: #6b7280;
                text-align: center;
                margin-top: 1rem;
            }

            .newsletter-success {
                text-align: center;
                padding: 2rem 0;
            }

            .newsletter-success-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                color: #10b981;
            }

            .newsletter-success-title {
                font-size: 1.5rem;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 0.5rem;
            }

            .newsletter-success-text {
                color: #4b5563;
            }

            @media (max-width: 640px) {
                .newsletter-modal {
                    margin: 1rem;
                }

                .newsletter-title {
                    font-size: 1.5rem;
                }
            }
        `;
        return style;
    }

    // Función para validar el email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para mostrar error en un campo específico
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + '-error');
        
        input.classList.add('error');
        errorSpan.textContent = message;
        errorSpan.classList.add('show');
    }

    // Función para limpiar error de un campo específico
    function clearError(fieldId) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + '-error');
        
        input.classList.remove('error');
        errorSpan.classList.remove('show');
    }

    // Función para enviar a Google Sheets
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

    // Función para mostrar el popup
    function showPopup() {
        const overlay = document.getElementById('newsletter-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.classList.add('show');
            }, 100);
        }
    }

    // Función para ocultar el popup
    function hidePopup() {
        const overlay = document.getElementById('newsletter-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    }

    // Función para manejar el envío
    async function handleSubmit() {
        const nameInput = document.getElementById('newsletter-name');
        const emailInput = document.getElementById('newsletter-email');
        const submitBtn = document.getElementById('newsletter-submit');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        
        let hasErrors = false;
        
        // Limpiar errores previos
        clearError('newsletter-name');
        clearError('newsletter-email');
        
        // Validar nombre
        if (!name) {
            showError('newsletter-name', 'Si us plau, introdueix el teu nom');
            hasErrors = true;
        } else if (name.length < 2) {
            showError('newsletter-name', 'El nom ha de tenir almenys 2 caràcters');
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
        
        // Si hay errores, no continuar
        if (hasErrors) {
            return;
        }
        
        // Deshabilitar el botón mientras se envía
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviant...';
        
        // Enviar a Google Sheets
        await saveToGoogleSheets(name, email);
        
        // Guardar que el usuario se ha suscrito
        localStorage.setItem('newsletter_subscribed', 'true');
        localStorage.setItem('newsletter_user_name', name);
        localStorage.setItem('newsletter_user_email', email);
        
        // Mostrar mensaje de éxito con el nombre
        document.getElementById('success-name').textContent = name;
        document.getElementById('newsletter-form-container').style.display = 'none';
        document.getElementById('newsletter-success').style.display = 'block';
        
        // Cerrar después de 2.5 segundos
        setTimeout(() => {
            hidePopup();
        }, 2500);
    }

    // Función para inicializar el popup
    function init() {
        // Verificar si el usuario ya interactuó con el popup
        const hasSubscribed = localStorage.getItem('newsletter_subscribed');
        const hasClosed = localStorage.getItem('newsletter_closed');
        
        if (hasSubscribed || hasClosed) {
            return; // No mostrar el popup
        }

        // Agregar estilos
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

        // Permitir enviar con Enter en ambos campos
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

        // Limpiar error cuando el usuario empiece a escribir
        nameInput.addEventListener('input', () => clearError('newsletter-name'));
        emailInput.addEventListener('input', () => clearError('newsletter-email'));

        // Mostrar el popup después de 1 segundo
        setTimeout(showPopup, 1000);
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
