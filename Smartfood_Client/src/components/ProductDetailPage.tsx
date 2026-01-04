import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { RecommendationModal } from './RecommendationModal';
import { getAliment } from '../api/alimentos';

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
}

export function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [product, setProduct] = useState({});

  const loadData = async () => {
    const res = await getAliment(productId);
    setProduct(res.data)
    console.log(res.data);
  }

  useEffect(() => {
    loadData();

  }, [])

  // Datos de ejemplo para el producto
  const product1 = {
    id: productId,
    name: 'Manzana Roja',
    status: 'Permitido',
    statusColor: 'green',
    category: 'Frutas',
    rating: 4.0,
    reviewCount: 3,
    reviews: [
      {
        id: 1,
        author: 'María García',
        initial: 'M',
        rating: 4,
        date: '14 de marzo de 2025'
      },
      {
        id: 2,
        author: 'Carlos López',
        initial: 'C',
        rating: 4,
        date: '14 de marzo de 2025'
      },
      {
        id: 3,
        author: 'José Farid',
        initial: 'J',
        rating: 4,
        date: '14 de marzo de 2025'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al Catálogo</span>
        </button>

        {/* Main Product Card */}
        <div className="bg-white border border-gray-300 rounded-lg p-8 mb-6">
          {/* Product Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">🍎</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl mb-2">{product.nombre}</h1>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{product.categoria}</span>
                <span className={product.permitido ? 'px-3 py-1 bg-green-200 text-green-800 rounded text-sm' : 'px-3 py-1 bg-red-500 text-red-800 rounded text-sm'}>
                  {product.permitido ? 'Permitido' : 'Prohibido '}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowRecommendationModal(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Escribir una recomendación"
            >
              <MessageSquare className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Descripción */}
          <div className="mb-6">
            <h2 className="text-lg mb-3">Descripción</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.descripcion}
            </p>
          </div>

          {/* Información Nutricional */}
          <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-4">
            <h3 className="text-sm mb-2">Información Nutricional</h3>
            <p className="text-gray-600 text-sm">
              {product.informacion_nutricional}
            </p>
          </div>

          {/* Sellos */}
          <div className="bg-gray-100 border border-gray-300 rounded p-4">
            <h3 className="text-sm mb-2">Sellos</h3>
            <p className="text-gray-600 text-sm">
              {product.sellos}
            </p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg">Reseñas</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= product.rating ? 'fill-black text-black' : 'fill-gray-300 text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviewCount} reseñas)</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-700">{review.initial}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <p className="font-medium">{review.author}</p>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? 'fill-black text-black' : 'fill-gray-300 text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin congue erat in lorem ultricies luctus.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-32 h-24 bg-white border-2 border-gray-300 flex items-center justify-center relative">
                      <svg className="w-full h-full absolute inset-0" viewBox="0 0 128 96">
                        <line x1="0" y1="0" x2="128" y2="96" stroke="#9CA3AF" strokeWidth="2" />
                        <line x1="128" y1="0" x2="0" y2="96" stroke="#9CA3AF" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Recommendation Modal */}
      {showRecommendationModal && (
        <RecommendationModal
          productName={product.name}
          onClose={() => setShowRecommendationModal(false)}
        />
      )}
    </div>
  );
}