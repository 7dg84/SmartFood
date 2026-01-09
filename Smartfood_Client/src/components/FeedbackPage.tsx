import { MessageCircle, List, Users, Star, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { createResena, getResenas } from '../api/resenas';
import { data } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function FeedbackPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [resenas, setResenas] = useState([]);;
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { isLoggedIn } = useAuth();

  const loadResenas = async () => {
    try {
      const res = await getResenas();
      setResenas(res.data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  }

  useEffect(() => {
    loadResenas();
  }, []);

  const handleSubmitForm = handleSubmit(async data => {
    if (!isLoggedIn) {
      toast.error('Debes iniciar sesión para enviar retroalimentación');
      return;
    }

    try {
      await createResena(data);
      toast.success('¡Gracias por tu retroalimentación!\nTu opinión nos ayuda a mejorar');
    } catch (error) {
      toast.error('Error al enviar la retroalimentación\nPor favor intenta de nuevo más tarde');
      return;
    }

    // Reset form
    setSelectedRating(null);
    reset();
    loadResenas();
  });

  const ratingOptions = [
    { value: 5, label: 'Muy satisfecho', stars: 5 },
    { value: 4, label: 'Satisfecho', stars: 4 },
    { value: 3, label: 'Neutral', stars: 3 },
    { value: 2, label: 'Insatisfecho', stars: 2 },
    { value: 1, label: 'Muy insatisfecho', stars: 1 },
  ];

  // Calcular resultados dinámicamente desde las reseñas
  const calculateSurveyResults = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    
    resenas.forEach(r => {
      if (counts.hasOwnProperty(r.valor)) {
        counts[r.valor as keyof typeof counts]++;
      }
    });

    const total = resenas.length || 1;
    
    return ratingOptions.map(option => ({
      label: option.label,
      percentage: Math.round((counts[option.value as keyof typeof counts] / total) * 100)
    }));
  };

  const surveyResults = calculateSurveyResults();

  const recentComments = [
    {
      id: 1,
      name: 'Ana M.',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta euismod lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta euismod lobortis.',
      date: '2024-01-13',
    },
    {
      id: 2,
      name: 'Carlos R.',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta euismod lobortis.',
      date: '2024-01-12',
    },
    {
      id: 3,
      name: 'María L.',
      rating: 5,
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta euismod lobortis.',
      date: '2024-01-12',
    },
  ];

  const renderStars = (count: number, filled: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${index < filled
              ? 'fill-gray-800 text-gray-800'
              : 'fill-gray-300 text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3">Retroalimentación Estudiantil</h1>
          <p className="text-gray-600">
            Tu opinión es importante para mejorar la alimentación escolar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Respuestas Totales</p>
                <p className="text-4xl">{resenas.length}</p>
              </div>
              <div className="text-gray-300">
                <Users className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-2">Satisfacción Promedio</p>
                <p className="text-4xl">
                  {resenas.length > 0 
                    ? (resenas.reduce((sum, r) => sum + r.valor, 0) / resenas.length).toFixed(1)
                    : '0'
                  }/5
                </p>
              </div>
              <div className="text-gray-300">
                <Star className="w-12 h-12 fill-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Share Opinion */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-6 h-6" />
                <h2>Comparte tu Opinión</h2>
              </div>

              <p className="text-gray-600 mb-8">
                Ayúdanos a mejorar los alimentos saludables en tu escuela
              </p>

              {/* Rating Question */}
              <div className="mb-8">
                <p className="mb-4">
                  ¿Qué tan satisfecho estás con los alimentos saludables disponibles?
                </p>
                <div className="space-y-3">
                  {ratingOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('valor', { required: true })}
                        value={option.value}
                        className="w-4 h-4"
                      />
                      {renderStars(5, option.stars)}
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
                {errors.valor && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>}
              </div>

              {/* Comments */}
              <div className="mb-6">
                <p className="mb-3">
                  ¿Qué aspectos te gustaría que mejoráramos?
                </p>
                <textarea
                  // value={comments}
                  // onChange={(e) => setComments(e.target.value)}
                  {...register('comentario', { required: true })}
                  placeholder="Comparte cualquier sugerencia o comentario que tengas..."
                  className="w-full border border-gray-300 rounded-lg p-4 min-h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                {errors.comentario && <span className="text-red-500 text-sm mt-1">Este campo es obligatorio</span>}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitForm}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Retroalimentación
              </button>
            </div>
          </div>

          {/* Right Column - Survey Results & Comments */}
          <div className="space-y-8">
            {/* Survey Results */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <List className="w-6 h-6" />
                <h2>Resultados de Encuestas</h2>
              </div>

              <div className="space-y-4">
                {surveyResults.map((result, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700">{result.label}</span>
                      <span className="text-sm">{result.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-600 h-2 rounded-full transition-all"
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="mb-6">Comentarios Recientes</h2>

              <div className="space-y-6">
                {resenas.map((comment) => (
                  <div key={comment.id_resena} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <p>{comment.username}</p>
                      <div className="flex gap-1">
                        {[...Array(comment.valor)].map((_, index) => (
                          <Star
                            key={index}
                            className="w-4 h-4 fill-gray-800 text-gray-800"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {comment.comentario}
                    </p>
                    <p className="text-xs text-gray-400">{comment.fecha}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
