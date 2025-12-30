import { Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface CartItem {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export function ShopSales() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [nombreCliente, setNombreCliente] = useState('');
  const [personalVentas, setPersonalVentas] = useState('Juan');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, codigo: '000001', nombre: 'Manzana', precio: 10.0, cantidad: 1 },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const total = subtotal;

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCancelar = () => {
    setCartItems([]);
    setNombreCliente('');
    toast.info('Venta cancelada');
  };

  const handleGuardar = () => {
    if (cartItems.length === 0) {
      toast.error('Agrega productos al carrito');
      return;
    }
    toast.success('Venta registrada exitosamente');
    setCartItems([]);
    setNombreCliente('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="mb-2">Ventas</h1>
        <p className="text-sm text-gray-500 mb-8">Registro ventas</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Products */}
          <div className="lg:col-span-2">
            {/* Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Buscar por código o nombre..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded min-w-[200px]"
                >
                  <option>Todas las categorías</option>
                  <option>Frutas</option>
                  <option>Verduras</option>
                  <option>Lácteos</option>
                  <option>Bebidas</option>
                </select>
                <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4">Productos</h3>
              <p className="text-sm text-gray-500 mb-4">{cartItems.length} producto(s) en el carrito</p>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm">Código</th>
                      <th className="text-left py-3 px-4 text-sm">Nombre</th>
                      <th className="text-left py-3 px-4 text-sm">Precio</th>
                      <th className="text-left py-3 px-4 text-sm">Cantid</th>
                      <th className="text-left py-3 px-4 text-sm">Total</th>
                      <th className="text-left py-3 px-4 text-sm">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-4 px-4">{item.codigo}</td>
                        <td className="py-4 px-4">{item.nombre}</td>
                        <td className="py-4 px-4">${item.precio.toFixed(1)}</td>
                        <td className="py-4 px-4">{item.cantidad}</td>
                        <td className="py-4 px-4">${(item.precio * item.cantidad).toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 hover:bg-gray-100 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Sale Summary */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Nombre del cliente</label>
                  <input
                    type="text"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Personal de ventas:</label>
                  <p className="px-4 py-2 bg-gray-50 rounded">{personalVentas}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm">Sub total</span>
                    <span className="text-sm">{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span className="text-sm">Total</span>
                    <span className="text-sm">{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCancelar}
                    className="w-full px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleGuardar}
                    className="w-full px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
