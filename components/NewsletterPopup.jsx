import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya se ha suscrito o cerrado el popup
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    const hasClosed = localStorage.getItem('newsletter_closed');
    
    if (!hasSubscribed && !hasClosed) {
      // Mostrar el popup después de 1 segundo con animación suave
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Guardar que el usuario ha cerrado el popup
    localStorage.setItem('newsletter_closed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email) {
      setIsSubmitted(true);
      // Guardar que el usuario se ha suscrito
      localStorage.setItem('newsletter_subscribed', 'true');
      
      // Cerrar el popup después de 2 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay con transición suave */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 ease-out z-40 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal con transición suave */}
      <div 
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div 
          className="bg-white rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Imagen de fondo decorativa */}
          <div className="h-32 bg-gradient-to-r from-amber-500 to-orange-600 relative">
            <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>

          <div className="px-8 pb-8 -mt-8">
            {/* Icono de café */}
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-6 mx-auto">
              <span className="text-4xl">☕</span>
            </div>

            {!isSubmitted ? (
              <>
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-3">
                  Fem un cafè!
                </h2>
                
                <p className="text-gray-600 text-center mb-6">
                  Vols saber-ne més? Envia'm un missatge!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Adreça de correu electrònic *"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-md transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Subscriu-te!
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  No compartirem mai les teves dades. Pots donar-te de baixa en qualsevol moment.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Gràcies!
                </h3>
                <p className="text-gray-600">
                  T'hem subscrit correctament. Aviat rebràs notícies!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
