import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { getVideo } from '../api/content';

interface ContentDetailPageProps {
  contentId: string;
  contentType: 'infografias' | 'videos' | 'trivias'
  onBack: () => void;
}

export function ContentDetailPage({ contentId, contentType, onBack }: ContentDetailPageProps) {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [triviaAnswers, setTriviaAnswers] = useState<{ [key: number]: string }>({});
  const [videoData, setVideoData] = useState<any | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  // Simulación de datos de contenido
  const getContentData = () => {
    if (contentType === 'infografias') {
      return {
        title: 'Pirámide Alimentaria Escolar',
        content: infografiaContent,
      };
    } else if (contentType === 'videos') {
      return {
        title: videoData?.titulo || 'Video',
        content: videoLoading
          ? <div className="text-center py-10 text-gray-600">Cargando video...</div>
          : videoContent(videoData || {}),
      };
    } else {
      return {
        title: 'Alimentos Permitidos vs Prohibidos',
        content: triviaContent,
      };
    }
  };

  const infografiaContent = (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl mb-4">Pirámide Alimentaria Escolar</h2>
          <p className="text-gray-600">Guía visual de los grupos alimentarios recomendados</p>
        </div>

        <div className="space-y-6 bg-white rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="mb-2 text-emerald-700">🥬 Frutas y Verduras</h3>
              <p className="text-gray-600 text-sm">
                Consume al menos 5 porciones al día. Son ricas en vitaminas, minerales y fibra.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="mb-2 text-blue-700">🌾 Cereales y Granos</h3>
              <p className="text-gray-600 text-sm">
                Prefiere los integrales. Son la principal fuente de energía.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="mb-2 text-orange-700">🥛 Lácteos</h3>
              <p className="text-gray-600 text-sm">
                3 porciones diarias. Importantes para huesos y dientes fuertes.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="mb-2 text-red-700">🍗 Proteínas</h3>
              <p className="text-gray-600 text-sm">
                Carnes magras, pescado, huevos y legumbres. Esenciales para el crecimiento.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">
              <strong>💡 Consejo:</strong> Limita el consumo de azúcares y grasas saturadas. Prefiere agua natural sobre bebidas azucaradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const videoContent = (video: any) => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black rounded-lg overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <iframe
            width="100%"
            height="100%"
            src={
              video.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
            title="Video de loncheras saludables"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="mb-4">Puntos clave del video</h3>
        <ul className="space-y-3 text-gray-600">
          <li className="flex gap-3">
            <span className="text-emerald-500">✓</span>
            <span>Incluye siempre una porción de frutas frescas de temporada</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">✓</span>
            <span>Agrega proteínas: huevo duro, pollo, queso o legumbres</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">✓</span>
            <span>No olvides los carbohidratos: pan integral, galletas de avena</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">✓</span>
            <span>Hidratación: agua natural o jugos naturales sin azúcar añadida</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-500">✓</span>
            <span>Evita productos ultraprocesados y bebidas azucaradas</span>
          </li>
        </ul>
      </div> */}
    </div>
  );

  const triviaQuestions = [
    {
      id: 1,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
    {
      id: 2,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
    {
      id: 3,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
    {
      id: 4,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
    {
      id: 5,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
    {
      id: 6,
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      options: ['A) any option', 'B) any option', 'C) any option', 'D) any option'],
    },
  ];

  const handleTriviaAnswer = (questionId: number, answer: string) => {
    setTriviaAnswers({ ...triviaAnswers, [questionId]: answer });
  };

  const handleFinishTrivia = () => {
    const answeredCount = Object.keys(triviaAnswers).length;
    if (answeredCount < triviaQuestions.length) {
      toast.warning('Trivia incompleta', {
        description: `Has respondido ${answeredCount} de ${triviaQuestions.length} preguntas`,
      });
    } else {
      toast.success('¡Trivia completada!', {
        description: 'Tu puntaje fue de: 0',
      });
      onBack();
    }
    setShowExitConfirm(false);
  };

  const triviaContent = (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span>ℹ️</span>
            </div>
            <h2>Alimentos Permitidos vs Prohibidos</h2>
          </div>
          <button
            onClick={() => setShowExitConfirm(true)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            Terminar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {triviaQuestions.map((q) => (
            <div key={q.id}>
              <p className="mb-3">
                <strong>{q.id}.</strong> {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={triviaAnswers[q.id] === option}
                      onChange={() => handleTriviaAnswer(q.id, option)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
    useEffect(() => {
      if (contentType !== 'videos') return;
  
      const fetchVideo = async () => {
        try {
          setVideoLoading(true);
          const res = await getVideo(contentId);
          setVideoData(res.data);
        } catch (err: any) {
          toast.error('No se pudieron cargar los videos');
          console.error(err);
        } finally {
          setVideoLoading(false);
        }
      };
  
      fetchVideo();
    }, [contentId, contentType]);

  const contentData = getContentData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>

        {/* Content */}
        {contentData.content}
      </div>

      {/* Exit confirmation modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
            <h3 className="mb-2">Listo!</h3>
            <p className="text-gray-600 mb-6">Tu puntaje fue de: 0</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleFinishTrivia}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                Terminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
