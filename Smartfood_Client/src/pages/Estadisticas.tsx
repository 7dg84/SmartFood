import { StatsSection } from '../components/StatsSection';

export function Estadisticas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-emerald-700 mb-4">Estadísticas del Sistema</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualiza las métricas y estadísticas de uso de la plataforma SMARTFOOD
          </p>
        </div>
        <StatsSection />
      </div>
    </div>
  );
}
