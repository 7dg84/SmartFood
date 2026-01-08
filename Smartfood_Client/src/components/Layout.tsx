import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs';
import { UserModal } from './UserModal';
import { CatalogModal } from './CatalogModal';
import { HelpModal } from './HelpModal';
import { useAuth } from '../context/AuthContext'

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Determinar la pagina actual
  const getCurrentPage = (): 'home' | 'catalog' | 'content' | 'feedback' => {
    if (location.pathname.startsWith('/catalogo')) return 'catalog';
    if (location.pathname.startsWith('/contenido')) return 'content';
    if (location.pathname === '/feedback') return 'feedback';
    return 'home';
  };

  // En estas paginas, no mostrar el header
  const hideHeader = ['/dashboard', '/tienda', '/estado', '/mantenimiento'].some(
    path => location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-white">
      {!hideHeader && (
        <>
          <Header
            onUserClick={() => setShowUserModal(true)}
            onCatalogClick={() => navigate('/catalogo')}
            currentPage={getCurrentPage()}
            onHomeClick={() => navigate('/')}
            onContentClick={() => navigate('/contenido')}
            onFeedbackClick={() => navigate('/feedback')}
          />
          <Breadcrumbs />
        </>
      )}

      {children}

      {/* Modals */}
      {showUserModal && (
        <UserModal
          onClose={() => setShowUserModal(false)}

          onOpenDashboard={() => {
            setShowUserModal(false);
            navigate('/dashboard');
          }}
          onOpenShop={() => {
            setShowUserModal(false);
            navigate('/tienda');
          }}
        />
      )}

      {showCatalogModal && (
        <CatalogModal onClose={() => setShowCatalogModal(false)} />
      )}

      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}

      {/* Help button fixed at bottom right - hide on special pages */}
      {!hideHeader && (
        <button
          onClick={() => showHelpModal ? setShowHelpModal(false): setShowHelpModal(true)}
          className="fixed bottom-8 right-8 bg-emerald-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors z-50"
          aria-label="Ayuda"
        >
          <span className="text-2xl">?</span>
        </button>
      )}
    </div>
  );
}