import { Search, Plus, Edit, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface Food {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  permitido: string;
  salud: string;
}

export function CatalogManagement() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchAllowed, setSearchAllowed] = useState('');

  // Form states for register/edit
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    permitido: '',
    imagen: '',
    codigo: '',
    informacionNutricional: '',
    informacionAdicional: '',
    descripcion: '',
    motivoRechazo: '',
  });

  const foods: Food[] = [
    { id: 1, nombre: 'Manzana', categoria: 'Fruta', descripcion: 'rica manzana', permitido: 'Si', salud: '5' },
  ];

  const handleRegister = () => {
    if (!formData.nombre || !formData.categoria) {
      setShowErrorModal(true);
      return;
    }
    toast.success('Alimento registrado exitosamente');
    setShowRegisterModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!formData.nombre || !formData.categoria) {
      setShowErrorModal(true);
      return;
    }
    toast.success('Alimento actualizado exitosamente');
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      categoria: '',
      permitido: '',
      imagen: '',
      codigo: '',
      informacionNutricional: '',
      informacionAdicional: '',
      descripcion: '',
      motivoRechazo: '',
    });
  };

  const openEditModal = (food: Food) => {
    setSelectedFood(food);
    setFormData({
      nombre: food.nombre,
      categoria: food.categoria,
      permitido: food.permitido,
      imagen: '',
      codigo: '',
      informacionNutricional: '',
      informacionAdicional: '',
      descripcion: food.descripcion,
      motivoRechazo: '',
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (food: Food) => {
    setSelectedFood(food);
    setShowHelpModal(true);
  };

  const handleDelete = () => {
    if (selectedFood) {
      toast.success(`Alimento "${selectedFood.nombre}" eliminado exitosamente`);
      setShowHelpModal(false);
      setSelectedFood(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Gestión de Catálogo</h1>
          <p className="text-sm text-gray-500">Gestiona los alimentos y filtra los resultados</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded"
            />
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Todas las categorías</option>
              <option>Fruta</option>
              <option>Verdura</option>
              <option>Lácteo</option>
              <option>Proteína</option>
            </select>
            <select
              value={searchAllowed}
              onChange={(e) => setSearchAllowed(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Todos los permisos</option>
              <option>Si</option>
              <option>No</option>
            </select>
            <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            >
              + Nuevo Alimento
            </button>
          </div>
        </div>

        {/* Foods Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="mb-6">Alimentos Registrados</h3>
          
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm">Nombre</th>
                <th className="text-left py-3 px-4 text-sm">Categoría</th>
                <th className="text-left py-3 px-4 text-sm">Descripción</th>
                <th className="text-left py-3 px-4 text-sm">Permitido</th>
                <th className="text-left py-3 px-4 text-sm">Salud</th>
                <th className="text-left py-3 px-4 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id} className="border-b border-gray-100">
                  <td className="py-4 px-4">{food.nombre}</td>
                  <td className="py-4 px-4">{food.categoria}</td>
                  <td className="py-4 px-4">{food.descripcion}</td>
                  <td className="py-4 px-4">{food.permitido}</td>
                  <td className="py-4 px-4">{food.salud}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => openEditModal(food)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(food)}
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
              <h2>Registrar Nuevo Alimento</h2>
              <button onClick={() => setShowRegisterModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500 mb-6">Completa todos los campos obligatorios (*)</p>
              
              <div className="grid grid-cols-2 gap-6">
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
                    <option>Fruta</option>
                    <option>Verdura</option>
                    <option>Lácteo</option>
                    <option>Proteína</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Permitido *</label>
                  <select
                    value={formData.permitido}
                    onChange={(e) => setFormData({ ...formData, permitido: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Seleccionar</option>
                    <option>Si</option>
                    <option>No</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Imagen *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.imagen}
                      onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                      placeholder="00000"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Código de producto</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Enlace de la imagen</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                      placeholder="https://..."
                    />
                    <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Información Nutricional *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.informacionNutricional}
                      onChange={(e) => setFormData({ ...formData, informacionNutricional: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Información Adicional *</label>
                  <input
                    type="text"
                    value={formData.informacionAdicional}
                    onChange={(e) => setFormData({ ...formData, informacionAdicional: e.target.value })}
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
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Motivo de no ser saludable</label>
                  <input
                    type="text"
                    value={formData.motivoRechazo}
                    onChange={(e) => setFormData({ ...formData, motivoRechazo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={handleRegister}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Registrar Alimento
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
              <h2>Editar Alimento</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="px-8 py-6">
              <p className="text-sm text-gray-500 mb-6">Modifica los campos necesarios (*)</p>
              
              <div className="grid grid-cols-2 gap-6">
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
                    <option>Fruta</option>
                    <option>Verdura</option>
                    <option>Lácteo</option>
                    <option>Proteína</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Enlace de imagen</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded">
                    <option>Seleccionar imagen</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm">Código producto</label>
                  <input
                    type="text"
                    placeholder="0000000000"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Enlace de imágen</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Información Nutricional</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Número A</label>
                  <input
                    type="text"
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
                
                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Permitido</label>
                  <input
                    type="text"
                    value={formData.permitido}
                    onChange={(e) => setFormData({ ...formData, permitido: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
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
            <p className="text-sm text-gray-600">El nombre esta en uso, elija otro</p>
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