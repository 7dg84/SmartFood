import { Store } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShopInventory } from '../components/shop/ShopInventory';
import { ShopProductManagement } from '../components/shop/ShopProductManagement';
import { ShopSales } from '../components/shop/ShopSales';

export function ShopPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventario' | 'productos' | 'ventas'>('inventario');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6" />
              <span className="tracking-wide">SMARTFOOD SHOP</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inventario')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'inventario'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inventario
              </button>
              <button
                onClick={() => setActiveTab('productos')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'productos'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab('ventas')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'ventas'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Ventas
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'inventario' && <ShopInventory />}
        {activeTab === 'productos' && <ShopProductManagement />}
        {activeTab === 'ventas' && <ShopSales />}
      </div>
    </div>
  );
}
