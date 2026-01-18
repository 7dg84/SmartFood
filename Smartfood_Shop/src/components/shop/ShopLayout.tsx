import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { ShopInventory } from './ShopInventory';
import { ShopSales } from './ShopSales';
import { ShopProductManagement } from './ShopProductManagement';

interface ShopLayoutProps {
  onClose: () => void;
}

export function ShopLayout({ onClose }: ShopLayoutProps) {
  const [activeTab, setActiveTab] = useState<'inicio' | 'ventas' | 'inventario'>('inicio');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <span className="tracking-wide">SMARTFOOD CAFETERIA</span>
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
                onClick={() => setActiveTab('ventas')}
                className={`px-6 py-2 rounded transition-colors ${
                  activeTab === 'ventas'
                    ? 'bg-gray-300 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                ventas
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
                onClick={onClose}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'inicio' && <ShopProductManagement />}
      {activeTab === 'ventas' && <ShopSales />}
      {activeTab === 'inventario' && <ShopInventory />}
    </div>
  );
}
