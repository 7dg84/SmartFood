import { useState, useEffect } from 'react';
import { Search, Heart, Star, Share2, SlidersHorizontal, MessageSquare } from 'lucide-react';
import { FilterModal } from './FilterModal';
import { RecommendationModal } from './RecommendationModal';
import { getAllAliments, searchAliments } from '../api/alimentos'
import { markAsFavorite, unmarkAsFavorite, getIdByAlimento } from '../api/favoritos';
import { toast } from 'react-hot-toast';
import { set } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface CatalogPageProps {
  onProductClick: (productId: number) => void;
}

export function CatalogPage({ onProductClick }: CatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<[] | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  // aliments data
  const [aliments, setAliments] = useState([]);
  const { isLoggedIn } = useAuth();

  const toggleFavorite = async (productId: any) => {
    if (localStorage.getItem('token') === null) {
      toast.error('Debes iniciar sesión para marcar favoritos');
      return;
    }
    //  buscar en bd
    try {
      const resId = await getIdByAlimento(productId);
      // si no devuelve nada, marcar como favorito
      if (resId.data.length === 0) {
        await markAsFavorite({ id_alimento: productId });
        toast.success("Alimento marcado como favorito")
      }
      // si se encontro un alimento marcado como favorito por el usuario, desmarcarlo
      if (resId.data.length > 0) {
        await unmarkAsFavorite(resId.data[0].id_favorito)
        toast.success('Alimento desmarcado como favorito');
      }
      handlerSearch();
    } catch (err) {
      toast.error('Error al realizar operacion ');
      console.error(err);
    }
  };

  // funcion para cargar alimentos
  async function loadAliments() {
    const res = await getAllAliments()
    if (res.status === 200) {
      setAliments(res.data)
    } else {
      toast.error('Error al cargar los alimentos');
    }
  }

  // Consultar api
  useEffect(() => {
    loadAliments();
  }, []);

  // busqueda
  async function handlerSearch() {
    try {
      const res = await searchAliments(searchTerm, selectedCategory, selectedStatus, showOnlyFavorites);
      setAliments(res.data);
    } catch (err) {
      toast.error('Error al buscar alimentos');
      console.error(err);
    }
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      handlerSearch();
    }, 500); // espera 500ms después del último cambio
    return () => clearTimeout(handler);
  }, [searchTerm, selectedCategory, selectedStatus, showOnlyFavorites, isLoggedIn]);

  const products = [
    {
      id: 1,
      name: 'Manzana Roja',
      status: 'Permitido',
      statusColor: 'green',
      description: 'Rica en fibra y vitaminas, ideal para un snack saludable.',
      nutritionalInfo: 'Bajo en calorías y alto en nutrientes.',
      category: 'Frutas',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Refresco de Cola',
      status: 'Prohibido',
      statusColor: 'red',
      description: 'Alto contenido de azúcar y colorantes artificiales.',
      nutritionalInfo: 'Alto en calorías, bajo valor nutricional.',
      category: 'Bebidas',
      rating: 2.0
    },
    {
      id: 3,
      name: 'Yogur Natural',
      status: 'Permitido',
      statusColor: 'green',
      description: 'Fuente de calcio y probióticos para la salud digestiva.',
      nutritionalInfo: 'Probióticos, calcio, proteínas.',
      category: 'Lácteos',
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Catálogo de Alimentos</h1>
          <p className="text-gray-600">
            Consulta la lista oficial de alimentos permitidos y prohibidos según la normativa federal
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700">Filtros de Búsqueda</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Buscar alimento</label>
              <input
                type="text"
                placeholder="Buscar alimento"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Todos las categorías</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Todos las categorías</option>
                <option value="FRUTAS">Frutas</option>
                <option value="BEBIDAS">Bebidas</option>
                <option value="LACTEOS">Lácteos</option>
                <option value="SNACKS">Snacks</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Todos los estados</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Todos los estados</option>
                <option value="true">Permitido</option>
                <option value="false">Prohibido</option>
              </select>
            </div>
          </div>

          {/* <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShowFilterModal(true)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
            >
              Filtros avanzados
            </button>
          </div> */}

          {/* Favoritos Checkbox */}
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={showOnlyFavorites}
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-gray-700">Favoritos</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {aliments
            .map((aliment) => (
              <div
                key={aliment.id_alimento}
                onClick={() => onProductClick(aliment.id_alimento)}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  {/* Header with status badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{aliment.nombre}</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-white text-sm ${aliment.permitido ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                      >
                        {aliment.permitido ? 'Permitido' : 'Prohibido'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3">{aliment.descripcion}</p>

                  {/* Nutritional Info Box */}
                  <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4">
                    <p className="text-sm text-gray-700">
                      <span className="block mb-1">Información Nutricional:</span>
                      <span className="text-gray-600">{aliment.informacion_nutricional}</span>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(aliment.id_alimento);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Heart className={`w-5 h-5 ${aliment.favorito
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                          }`} />
                      </button>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= aliment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!localStorage.getItem('token')) {
                            toast.error('Debes iniciar sesión para solicitar recomendaciones');
                            return;
                          }
                          setSelectedProduct(aliment);
                          setShowRecommendationModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MessageSquare className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>


      </div>

      {/* Modals */}
      {
        showFilterModal && (
          <FilterModal onClose={() => setShowFilterModal(false)} />
        )
      }

      {
        showRecommendationModal && (
          <RecommendationModal
            product={selectedProduct}
            onClose={() => {
              setShowRecommendationModal(false);
              setSelectedProduct(null);
            }}
          />
        )
      }
    </div >
  );
}