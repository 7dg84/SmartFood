import { Search, Plus, Edit, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  precio: string;
  stock: string;
}

export function ProductManagement() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchCode, setSearchCode] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  // Form states for register/edit
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    cantidadInventario: '',
    descripcion: '',
  });

  const products: Product[] = [
    { id: 1, codigo: '000001', nombre: 'Manzana Roja', categoria: 'Frutas', precio: '$ 0.50', stock: '100' },
  ];

  const handleRegister = () => {
    if (!formData.codigo || !formData.nombre) {
      setShowErrorModal(true);
      return;
    }
    toast.success('Producto registrado exitosamente');
    setShowRegisterModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!formData.codigo || !formData.nombre) {
      setShowErrorModal(true);
      return;
    }
    toast.success('Producto actualizado exitosamente');
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      codigo: '',
      nombre: '',
      categoria: '',
      precio: '',
      cantidadInventario: '',
      descripcion: '',
    });
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      codigo: product.codigo,
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      cantidadInventario: product.stock,
      descripcion: '',
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowHelpModal(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      toast.success(`Producto "${selectedProduct.nombre}" eliminado exitosamente`);
      setShowHelpModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Gestión de Productos</h1>
          <p className="text-sm text-gray-500">Gestiona los productos y filtra los resultados</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por código o nombre..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Todas las categorías</option>
              <option>Frutas</option>
              <option>Verduras</option>
              <option>Lácteos</option>
              <option>Proteínas</option>
            </select>
            <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            >
              Buscar Producto
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-6">Productos Registrados</h3>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm">Código</th>
                <th className="text-left py-3 px-4 text-sm">Nombre</th>
                <th className="text-left py-3 px-4 text-sm">Categoría</th>
                <th className="text-left py-3 px-4 text-sm">Precio</th>
                <th className="text-left py-3 px-4 text-sm">Stock</th>
                <th className="text-left py-3 px-4 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">{product.codigo}</td>
                  <td className="py-4 px-4">{product.nombre}</td>
                  <td className="py-4 px-4">{product.categoria}</td>
                  <td className="py-4 px-4">{product.precio}</td>
                  <td className="py-4 px-4">{product.stock}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(product)}
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

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Registrar Nuevo Producto</h2>
              <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500 mb-6">Completa todos los campos obligatorios (*)</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Código *</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    placeholder="00000"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Nombre *</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Nombre del producto"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Categoría *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option>Frutas</option>
                    <option>Verduras</option>
                    <option>Lácteos</option>
                    <option>Proteínas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Precio *</label>
                  <input
                    type="text"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    placeholder="$ 0.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Cantidad en Inventario *</label>
                  <input
                    type="number"
                    value={formData.cantidadInventario}
                    onChange={(e) => setFormData({ ...formData, cantidadInventario: e.target.value })}
                    placeholder="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    placeholder="Describe el producto..."
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={handleRegister}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Registrar Producto
                </button>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Editar Producto</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500 mb-6">Modifica los campos necesarios (*)</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm">Código *</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Nombre *</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Categoría *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option>Frutas</option>
                    <option>Verduras</option>
                    <option>Lácteos</option>
                    <option>Proteínas</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Precio *</label>
                  <input
                    type="text"
                    value={formData.precio}
                    onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Cantidad en Inventario *</label>
                  <input
                    type="number"
                    value={formData.cantidadInventario}
                    onChange={(e) => setFormData({ ...formData, cantidadInventario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Descripción</label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Error</h3>
              <button onClick={() => setShowErrorModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600">El código esta en uso, elija otro</p>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2>¿Qué seguro?</h2>
              <button onClick={() => setShowHelpModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Este acción no se puede deshacer. El producto será eliminado de la plataforma.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}