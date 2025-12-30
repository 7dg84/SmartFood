import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }
  
  // Parse pathname into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Map segment names to Spanish labels
  const segmentLabels: Record<string, string> = {
    'catalogo': 'Catálogo',
    'contenido': 'Contenido',
    'feedback': 'Retroalimentación',
    'estadisticas': 'Estadísticas',
    'dashboard': 'Dashboard',
    'tienda': 'Tienda',
    'estado': 'Estado',
    'mantenimiento': 'Mantenimiento',
    'infografias': 'Infografías',
    'videos': 'Videos',
    'trivias': 'Trivias',
  };
  
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segmentLabels[segment] || segment;
    const isLast = index === pathSegments.length - 1;
    
    // If it's a number, it's likely an ID, so we label it as "Detalle"
    const displayLabel = /^\d+$/.test(segment) ? 'Detalle' : label;
    
    return {
      path,
      label: displayLabel,
      isLast,
    };
  });
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
          </li>
          
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {breadcrumb.isLast ? (
                <span className="text-emerald-600 font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link 
                  to={breadcrumb.path}
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
