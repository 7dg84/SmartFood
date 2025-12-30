import { Link } from 'react-router-dom';
import { BookOpen, ShoppingBag, MessageSquare, BarChart3, Settings, Store } from 'lucide-react';

export function QuickLinks() {
  const links = [
    {
      to: '/catalogo',
      icon: BookOpen,
      label: 'Catálogo',
      description: 'Explora nuestros productos',
    },
    {
      to: '/contenido',
      icon: ShoppingBag,
      label: 'Contenido',
      description: 'Material educativo',
    },
    {
      to: '/feedback',
      icon: MessageSquare,
      label: 'Feedback',
      description: 'Comparte tu opinión',
    },
    {
      to: '/estadisticas',
      icon: BarChart3,
      label: 'Estadísticas',
      description: 'Datos del sistema',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-gray-800 mb-8">Accesos Rápidos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 rounded-lg p-3 group-hover:bg-emerald-200 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">
                      {link.label}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
