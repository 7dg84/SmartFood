import { X } from 'lucide-react';
import { useState } from 'react';

interface FilterModalProps {
  onClose: () => void;
}

export function FilterModal({ onClose }: FilterModalProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const types = ['Pan', 'Pescado', 'Pasta'];
  const categories = ['Frutas', 'Whatsales', 'Lácteos', 'Bebidas', 'Snacks'];
  const statuses = ['Permitido', 'Prohibido'];

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-end p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mt-20 mr-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Filtros de Búsqueda</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tipo Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="all-types"
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="all-types" className="text-gray-700">
                Tipo
              </label>
            </div>
            <div className="ml-6 space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor={`type-${type}`} className="text-gray-600 text-sm">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Todos las categorías Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="all-categories"
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="all-categories" className="text-gray-700">
                Todos las categorías
              </label>
            </div>
            <div className="ml-6 space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleSelection(category, selectedCategories, setSelectedCategories)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor={`category-${category}`} className="text-gray-600 text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Todos los estados Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="all-status"
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="all-status" className="text-gray-700">
                Todos los estados
              </label>
            </div>
            <div className="ml-6 space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`status-${status}`}
                    checked={selectedStatus.includes(status)}
                    onChange={() => toggleSelection(status, selectedStatus, setSelectedStatus)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor={`status-${status}`} className="text-gray-600 text-sm">
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
