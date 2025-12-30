import { RefreshCw, TrendingUp, AlertTriangle, XCircle, HelpCircle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ShopInventory() {
  const inventoryMovements = [
    { name: 'Lun', entradas: 45, salidas: 30 },
    { name: 'Mar', entradas: 52, salidas: 35 },
    { name: 'Mié', entradas: 48, salidas: 40 },
    { name: 'Jue', entradas: 65, salidas: 45 },
    { name: 'Vie', entradas: 58, salidas: 38 },
    { name: 'Sáb', entradas: 42, salidas: 28 },
    { name: 'Dom', entradas: 38, salidas: 25 },
  ];

  const categoryDistribution = [
    { name: 'Categoría A', value: 40 },
    { name: 'Categoría B', value: 35 },
    { name: 'Categoría C', value: 25 },
  ];

  const stockStatus = [
    { name: 'En Stock', value: 45 },
    { name: 'Stock Bajo', value: 30 },
    { name: 'Agotado', value: 25 },
  ];

  const reviews = [
    { name: 'Positivas', value: 50 },
    { name: 'Neutrales', value: 30 },
    { name: 'Negativas', value: 20 },
  ];

  const COLORS_A = ['#d1d5db', '#9ca3af', '#6b7280'];
  const COLORS_B = ['#d1d5db', '#9ca3af', '#6b7280'];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="mb-2">Dashboard de Inventario</h1>
            <p className="text-sm text-gray-500">Monitoreo en tiempo real martes, x de meses de 2025</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-white transition-colors">
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Productos Totales</p>
              <HelpCircle className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl mb-1">0</p>
            <p className="text-sm text-gray-500">En catálogo</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">En Stock</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl mb-1">0</p>
            <p className="text-sm text-gray-500">Con stock suficiente</p>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Stock Crítico</p>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl mb-1">0</p>
            <p className="text-sm text-gray-500">Requieren atención</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">Agotados</p>
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl mb-1">0</p>
            <p className="text-sm text-gray-500">Sin existencias</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Movements Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2">Movimientos de Inventario (7 días)</h3>
            <p className="text-sm text-gray-500 mb-6">Entradas y salidas de productos</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={inventoryMovements}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="entradas" stroke="#9ca3af" strokeWidth={2} name="Entradas" />
                <Line type="monotone" dataKey="salidas" stroke="#d1d5db" strokeWidth={2} name="Salidas" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2">Distribución por Categoría</h3>
            <p className="text-sm text-gray-500 mb-6">Productos por categoría</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_A[index % COLORS_A.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stock Status Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2">Estado de Stock</h3>
            <p className="text-sm text-gray-500 mb-6">Distribución de productos por estado</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={inventoryMovements}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="entradas" stroke="#9ca3af" strokeWidth={2} />
                <Line type="monotone" dataKey="salidas" stroke="#d1d5db" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Reviews Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="mb-2">Reseñas</h3>
            <p className="text-sm text-gray-500 mb-6">Reseñas de los usuarios</p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={reviews}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {reviews.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS_B[index % COLORS_B.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
