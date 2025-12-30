import { X } from 'lucide-react';
import { useState } from 'react';

interface RecommendationModalProps {
  productName: string | null;
  onClose: () => void;
}

export function RecommendationModal({ productName, onClose }: RecommendationModalProps) {
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = () => {
    // Handle recommendation submission
    console.log('Recommendation submitted:', recommendation);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl">Escribe una recomendación</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <textarea
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              placeholder="Escribe tu recomendación aquí..."
              className="w-full px-4 py-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={8}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}