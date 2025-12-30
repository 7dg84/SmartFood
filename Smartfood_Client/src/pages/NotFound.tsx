import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl text-emerald-600 mb-4">404</h1>
          <h2 className="text-gray-800 mb-2">Página No Encontrada</h2>
          <p className="text-gray-600">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            Ir al Inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 border-2 border-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver Atrás
          </button>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Enlaces útiles:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <Link to="/catalogo" className="text-emerald-600 hover:underline">
              Catálogo
            </Link>
            <Link to="/contenido" className="text-emerald-600 hover:underline">
              Contenido
            </Link>
            <Link to="/feedback" className="text-emerald-600 hover:underline">
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
