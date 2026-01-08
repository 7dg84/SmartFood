import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createRecomendation } from '../api/recomendacion';

interface RecommendationModalProps {
  product: [] | null;
  onClose: () => void;
}

export function RecommendationModal({ product, onClose }: RecommendationModalProps) {
  const [recommendation, setRecommendation] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleSubmitRecomendation = handleSubmit(async data => {
    if (!data.recommendation) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }

    try {
      await createRecomendation({
        id_alimento: product ? product.id_alimento : null,
        motivo: data.recommendation,
      });
      toast.success("Recomendacion registrada correctamente");
    } catch (err: any) {
      if (err.response) {
        const { status, data: respData } = err.response;
        if (status === 404) toast.error('Eror 404');
        else if (status === 401) toast.error('Error 401');
        else if (status === 400) {
          if (typeof respData === 'object') {
            const msgs = Object.values(respData).flat().join(' - ');
            toast.error(msgs || 'Error de validación (400)');
          } else {
            toast.error(respData?.message || 'Solicitud inválida (400)');
          }
        } else {
          toast.error(respData?.message || `Error del servidor (${status})`);
        }
      } else {
        toast.error('Error de red o sin respuesta del servidor');
      }
      console.error(err);
    }
    onClose();
  })

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
            <h3 className="text-lg font-medium">{product ? product['nombre'] : ''}</h3>
            <textarea
              // value={recommendation}
              // onChange={(e) => setRecommendation(e.target.value)}
              {...register('recommendation', { required: true })}
              placeholder="Escribe tu recomendación aquí..."
              className="w-full px-4 py-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={8}
            />
            {errors.recommendation && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmitRecomendation}
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