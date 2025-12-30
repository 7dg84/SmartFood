import { Activity, XCircle } from 'lucide-react';

export function StatusPage() {
  const services = [
    { id: 1, name: 'APP', status: 'offline' },
    { id: 2, name: 'DashBoard', status: 'offline' },
    { id: 3, name: 'Shop', status: 'offline' },
    { id: 4, name: 'DataBase', status: 'offline' },
  ];

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
          <div className="flex-1 bg-white rounded px-4 py-1 text-sm text-gray-600">
            https://status.smartfood.iot
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-gray-300 px-8 py-6">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8" />
          <h1>SMARTFOOD STATUS</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] px-4">
        <div className="w-full max-w-md space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between bg-white border-2 border-gray-800 rounded-lg px-6 py-4"
            >
              <span className="text-lg">{service.name}</span>
              <button className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-800 hover:bg-gray-100 transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
