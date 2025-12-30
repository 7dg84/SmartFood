import { User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import imgLogo from "figma:asset/f89d550f01270433f9bd3ba9aa8a5e2ad81f03e5.png";

interface HeaderProps {
  onUserClick: () => void;
  onCatalogClick?: () => void;
  currentPage?: 'home' | 'catalog' | 'content' | 'feedback';
  onHomeClick?: () => void;
  onContentClick?: () => void;
  onFeedbackClick?: () => void;
}

export function Header({ onUserClick, onCatalogClick, currentPage = 'home', onHomeClick, onContentClick, onFeedbackClick }: HeaderProps) {
  const location = useLocation();
  
  // Determine active page from route
  const isActive = (page: string) => {
    if (page === 'home') return location.pathname === '/';
    if (page === 'catalog') return location.pathname.startsWith('/catalogo');
    if (page === 'content') return location.pathname.startsWith('/contenido');
    if (page === 'feedback') return location.pathname === '/feedback';
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={imgLogo} 
              alt="SMARTFOOD Logo" 
              className="w-10 h-10"
            />
            <span className="text-[#16a249] tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
              SMARTFOOD
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link 
              to="/"
              className={`px-6 py-2 rounded transition-colors ${
                isActive('home')
                  ? 'bg-[#16a249] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Inicio
            </Link>
            <Link 
              to="/catalogo"
              className={`px-6 py-2 rounded transition-colors ${
                isActive('catalog')
                  ? 'bg-[#16a249] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Catálogo
            </Link>
            <Link 
              to="/contenido"
              className={`px-6 py-2 rounded transition-colors ${
                isActive('content')
                  ? 'bg-[#16a249] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Contenido
            </Link>
            <Link 
              to="/feedback"
              className={`px-6 py-2 rounded transition-colors ${
                isActive('feedback')
                  ? 'bg-[#16a249] text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Retroalimentación
            </Link>
            <button 
              onClick={onUserClick}
              className="ml-4 p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Usuario"
            >
              <User className="w-6 h-6" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}