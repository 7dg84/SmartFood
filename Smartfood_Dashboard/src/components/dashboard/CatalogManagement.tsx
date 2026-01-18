import { Search, Plus, Edit, X, Trash2, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getAliments, deleteAliment, createAliment, updateAliment } from '../../api/catalog.js'
import { useAuth } from '../../context/AuthContext.js';
import { useForm } from 'react-hook-form';
import { manageError } from '../../api/manageErrors.js';

interface Food {
  id_alimento: string,
  favorito: boolean,
  nombre: string,
  categoria: string,
  descripcion: string,
  permitido: boolean,
  informacion_nutricional: string,
  imagen: string,
  sellos: number,
  id_producto: string | null
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
  const [foods, setFoods] = useState<Food[]>([]);

  // token de autenticacion
  const { token } = useAuth();

  // Formulario de registro
  const { register: registerRegister, handleSubmit: handleSubmitRegister, formState: { errors: errorsRegister }, reset: resetRegister } = useForm();
  // Formulario de edición
  const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { errors: errorsEdit }, setValue: setValueEdit, reset: resetEdit } = useForm();

  // Cargar los alimentos del catalogo 
  async function fetchFoods() {
    try {
      const response = await getAliments();
      setFoods(response.data);
    } catch (error) {
      toast.error('Error al cargar los alimentos');
      manageError(error);
    }
  }
  // Cargar alimentos al montar el componente
  useState(() => {
    fetchFoods();
  });

  const handleRegister = handleSubmitRegister(async (data) => {
    if (!data.nombre || !data.categoria) {
      setShowErrorModal(true);
      return;
    }
    try {
      await createAliment(data, token);

      toast.success('Alimento registrado exitosamente');
      setShowRegisterModal(false);
      resetRegister();
      fetchFoods(); // Refrescar la lista de alimentos
    } catch (error) {
      toast.error('Error al registrar el alimento');
      manageError(error);
      console.error('Error registering food:', error);
    }
  });

  const handleEdit = handleSubmitEdit(async (data) => {
    if (!data.nombre || !data.categoria) {
      setShowErrorModal(true);
      return;
    }
    try {
      await updateAliment(selectedFood!.id_alimento, data, token);

      toast.success('Alimento actualizado exitosamente');
      setShowEditModal(false);
      resetEdit();
    } catch (error) {
      toast.error('Error al actualizar el alimento');
      manageError(error);
    }

  });

  const openEditModal = (food: Food) => {
    setSelectedFood(food);

    setValueEdit('nombre', food.nombre);
    setValueEdit('categoria', food.categoria);
    setValueEdit('permitido', food.permitido.toString());
    setValueEdit('imagen', food.imagen);
    setValueEdit('sellos', food.sellos);
    setValueEdit('codigo', food.id_producto || '');
    setValueEdit('descripcion', food.descripcion);
    setValueEdit('informacion_nutricional', food.informacion_nutricional);

    setShowEditModal(true);
  };

  const openDeleteModal = (food: Food) => {
    setSelectedFood(food);
    setShowHelpModal(true);

  };

  const handleDelete = async () => {
    if (selectedFood) {
      try {
        await deleteAliment(selectedFood.id_alimento, token); // Llamada a la API de eliminación
        toast.success(`Alimento "${selectedFood.nombre}" eliminado exitosamente`); // Mensaje
        setShowHelpModal(false);
        setSelectedFood(null);
        fetchFoods(); // Refrescar la lista de alimentos
      } catch (error) {
        manageError(error);
        console.error('Error deleting food:', error);
      }
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
              <Plus className="w-6 h-6 inline-block mr-2" />
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
                <th className="text-left py-3 px-4 text-sm">Imagen</th>
                <th className="text-left py-3 px-4 text-sm">Sellos</th>
                <th className="text-left py-3 px-4 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id_alimento} className="border-b border-gray-100">
                  <td className="py-4 px-4">{food.nombre}</td>
                  <td className="py-4 px-4">{food.categoria}</td>
                  <td className="py-4 px-4">{food.descripcion}</td>
                  <td className="py-4 px-4">{food.permitido ? "Sí" : "No"}</td>
                  <td className="py-4 px-4"></td>
                  <td className="py-4 px-4">{food.sellos}</td>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerRegister('nombre', { required: true })}
                  />
                  {errorsRegister.nombre && <p className="text-red-500 text-sm">El nombre es obligatorio.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Categoría *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerRegister('categoria', { required: true })}
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="FRUTAS">Frutas</option>
                    <option>Verdura</option>
                    <option>Lácteo</option>
                    <option>Proteína</option>
                  </select>
                  {errorsRegister.categoria && <p className="text-red-500 text-sm">La categoría es obligatoria.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Permitido *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerRegister('permitido', { required: true })}
                  >
                    <option value="">Seleccionar</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                  {errorsRegister.permitido && <p className="text-red-500 text-sm">El permiso es obligatorio.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Imagen *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                      {...registerRegister('imagen', { required: true })}
                    />
                    {/* <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button> */}
                  </div>
                  {errorsRegister.imagen && <p className="text-red-500 text-sm">La imagen es obligatoria.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Sellos</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                      {...registerRegister('sellos', { required: true })}
                    />
                    {/* <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button> */}
                  </div>
                  {errorsRegister.sellos && <p className="text-red-500 text-sm">Los sellos son obligatorios.</p>}
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Código de producto</label>
                  <input
                    type="text"
                    {...registerRegister('codigo')}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Descripción</label>
                  <textarea
                    placeholder="Describe el producto..."
                    {...registerRegister('descripcion', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
                {errorsRegister.descripcion && <p className="text-red-500 text-sm">La descripción es obligatoria.</p>}

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Informacion Nutricional</label>
                  <textarea
                    placeholder="Describe el producto..."
                    {...registerRegister('informacion_nutricional', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
                {errorsRegister.informacion_nutricional && <p className="text-red-500 text-sm">La información nutricional es obligatoria.</p>}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerEdit('nombre', { required: true })}
                  />
                  {errorsEdit.nombre && <p className="text-red-500 text-sm">El nombre es obligatorio.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Categoría *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerEdit('categoria', { required: true })}
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="FRUTAS">Frutas</option>
                    <option>Verdura</option>
                    <option>Lácteo</option>
                    <option>Proteína</option>
                  </select>
                  {errorsEdit.categoria && <p className="text-red-500 text-sm">La categoría es obligatoria.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Permitido *</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    {...registerEdit('permitido', { required: true })}
                  >
                    <option value="">Seleccionar</option>
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </select>
                  {errorsEdit.permitido && <p className="text-red-500 text-sm">El permiso es obligatorio.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Imagen *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                      {...registerEdit('imagen', { required: true })}
                    />
                    {/* <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button> */}
                  </div>
                  {errorsEdit.imagen && <p className="text-red-500 text-sm">La imagen es obligatoria.</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Sellos</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                      {...registerEdit('sellos', { required: true })}
                    />
                    {/* <button className="p-2 bg-gray-300 hover:bg-gray-400 rounded">
                      <Search className="w-5 h-5" />
                    </button> */}
                  </div>
                  {errorsEdit.sellos && <p className="text-red-500 text-sm">Los sellos son obligatorios.</p>}
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Código de producto</label>
                  <input
                    type="text"
                    {...registerEdit('codigo')}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Descripción</label>
                  <textarea
                    placeholder="Describe el producto..."
                    {...registerEdit('descripcion', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
                {errorsEdit.descripcion && <p className="text-red-500 text-sm">La descripción es obligatoria.</p>}

                <div className="col-span-2">
                  <label className="block mb-2 text-sm">Informacion Nutricional</label>
                  <textarea
                    placeholder="Describe el producto..."
                    {...registerEdit('informacion_nutricional', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded min-h-24 resize-none"
                  />
                </div>
                {errorsEdit.informacion_nutricional && <p className="text-red-500 text-sm">La información nutricional es obligatoria.</p>}
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