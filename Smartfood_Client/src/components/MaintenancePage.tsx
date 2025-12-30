import { Loader2 } from 'lucide-react';

export function MaintenancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Browser Bar Simulation */}
      <div className="bg-gray-200 border-b border-gray-300 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button className="w-3 h-3 rounded-full bg-red-500"></button>
            <button className="w-3 h-3 rounded-full bg-yellow-500"></button>
            <button className="w-3 h-3 rounded-full bg-green-500"></button>
          </div>
          <button className="text-gray-600 hover:text-gray-800">←</button>
          <button className="text-gray-600 hover:text-gray-800">→</button>
          <button className="text-gray-600 hover:text-gray-800">↻</button>
          <div className="flex-1 bg-white rounded px-4 py-1 text-sm text-gray-600">
            https://app.smartfood.iot
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-gray-300 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-black flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L18 18M18 2L2 18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="tracking-wide">SMARTFOOD</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
        <div className="border-2 border-gray-300 rounded-lg px-16 py-12 text-center max-w-md">
          <h1 className="mb-4">En reparación</h1>
          <p className="text-sm text-gray-600 mb-8">Pronto estará disponible la página.</p>
          
          {/* Loading Spinner */}
          <div className="flex items-center justify-center">
            <Loader2 className="w-16 h-16 text-gray-700 animate-spin" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
