import { X, User } from 'lucide-react';
import { useState } from 'react';
import { LoginModal } from './LoginModal';
import { RegisterModal } from './RegisterModal';

interface UserModalProps {
  isLoggedIn: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onOpenDashboard?: () => void;
  onOpenShop?: () => void;
}

export function UserModal({ isLoggedIn, onClose, onLogin, onLogout, onOpenDashboard, onOpenShop }: UserModalProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    onLogin();
    onClose();
  };
  
  const handleDashboardClick = () => {
    if (onOpenDashboard) {
      onOpenDashboard();
      onClose();
    }
  };
  
  const handleShopClick = () => {
    if (onOpenShop) {
      onOpenShop();
      onClose();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-start justify-end p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-80 mt-20 mr-4">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <User className="w-8 h-8 text-gray-700" />
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isLoggedIn ? (
              <div className="space-y-3">
                <button
                  onClick={handleLoginClick}
                  className="w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Registrarse
                </button>
                {/* {onOpenDashboard && (
                  <button
                    onClick={handleDashboardClick}
                    className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    Dashboard Admin
                  </button>
                )}
                {onOpenShop && (
                  <button
                    onClick={handleShopClick}
                    className="w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    Tienda
                  </button>
                )} */}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 mb-3">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-700">Nombre de Usuario</p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cerrar sesión
                </button>
                {/* {onOpenDashboard && (
                  <button
                    onClick={handleDashboardClick}
                    className="w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Abrir Dashboard
                  </button>
                )}
                {onOpenShop && (
                  <button
                    onClick={handleShopClick}
                    className="w-full px-4 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Abrir Tienda
                  </button>
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}

      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          onBackToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}