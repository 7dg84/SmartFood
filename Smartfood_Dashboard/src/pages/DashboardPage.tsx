import { LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DashboardInventory } from '../components/dashboard/DashboardInventory';
import { CatalogManagement } from '../components/dashboard/CatalogManagement';
import { ProductManagement } from '../components/dashboard/ProductManagement';
import { AccountManagement } from '../components/dashboard/AccountManagement';

export function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'inicio' | 'catalogo' | 'inventario' | 'cuentas'>('inicio');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6" />
              <span className="tracking-wide">SMARTFOOD DASHBOARD</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inicio')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'inicio'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => setActiveTab('catalogo')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'catalogo'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Catálogo
              </button>
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
                onClick={() => setActiveTab('cuentas')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'cuentas'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Gestionar Cuentas
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
        {activeTab === 'inventario' && <ProductManagement />}
        {activeTab === 'catalogo' && <CatalogManagement />}
        {activeTab === 'inicio' && <DashboardInventory />}
        {activeTab === 'cuentas' && <AccountManagement />}
      </div>
    </div>
  );
}
