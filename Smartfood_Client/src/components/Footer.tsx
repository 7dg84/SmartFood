import { Link } from 'react-router-dom';

interface FooterProps {
  onDashboardClick?: () => void;
  onShopClick?: () => void;
  onStatusClick?: () => void;
  onMaintenanceClick?: () => void;
}

export function Footer({ onDashboardClick, onShopClick, onStatusClick, onMaintenanceClick }: FooterProps) {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <Link 
            to="/dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors underline"
          >
            Dashboard Admin
          </Link>
          <Link 
            to="/tienda"
            className="text-gray-600 hover:text-blue-600 transition-colors underline"
          >
            Tienda
          </Link>
          <Link 
            to="/estado"
            className="text-gray-600 hover:text-blue-600 transition-colors underline"
          >
            Status
          </Link>
          <Link 
            to="/mantenimiento"
            className="text-gray-600 hover:text-blue-600 transition-colors underline"
          >
            Mantenimiento
          </Link>
        </div>
        <div className="text-center text-gray-500 text-xs mt-4">
          Testing Links - Development Only
        </div>
      </div>
    </footer>
  );
}