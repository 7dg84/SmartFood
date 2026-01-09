import { FileText, PlayCircle, HelpCircle, Lightbulb, Clock, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getInfografias, getVideos, getTrivias, getConsejos, downloadInfografiaFile } from '../api/content';
import { toast } from 'react-hot-toast';

type ContentType = 'infografias' | 'videos' | 'trivias' | 'consejos';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  duration: string;
  viewed: boolean;
}

interface TipItem {
  id: number;
  title: string;
  tag: string;
  description: string;
  icon: string;
}

interface ContentPageProps {
  onViewContent: (contentId: string, contentType: 'infografias' | 'videos' | 'trivias') => void;
}

export function ContentPage({ onViewContent }: ContentPageProps) {
  const [activeTab, setActiveTab] = useState<ContentType>('infografias');

  const infografias: ContentItem[] = [];
  const [infografiasData, setInfografiasData] = useState<ContentItem[]>([]);

  const videos: ContentItem[] = [
    {
      id: 1,
      title: 'Cómo preparar loncheras saludables',
      description: 'Tutorial paso a paso para padres y cuidadores',
      duration: '8 min',
      viewed: true,
    },
    {
      id: 2,
      title: 'La importancia del desayuno',
      description: 'Expertos explican por qué no saltarse el desayuno',
      duration: '5 min',
      viewed: false,
    },
    {
      id: 3,
      title: 'Recetas fáciles con verduras',
      description: 'Platillos atractivos para que los niños coman verduras',
      duration: '10 min',
      viewed: false,
    },
  ];
  const [videosData, setVideosData] = useState<ContentItem[]>([]);

  const trivias: ContentItem[] = [
    {
      id: 1,
      title: '¿Cuánto sabes sobre nutrición?',
      description: 'Pon a prueba tus conocimientos básicos',
      duration: '10 min',
      viewed: true,
    },
    {
      id: 2,
      title: 'Mitos y verdades sobre los alimentos',
      description: 'Descubre datos sorprendentes sobre lo que comes',
      duration: '8 min',
      viewed: false,
    },
    {
      id: 3,
      title: 'Grupos alimentarios',
      description: 'Identifica a qué grupo pertenece cada alimento',
      duration: '7 min',
      viewed: false,
    },
  ];
  const [triviasData, setTriviasData] = useState<ContentItem[]>([]);

  const consejos: TipItem[] = [
    {
      id: 1,
      title: 'Planifica tus comidas semanalmente',
      tag: 'planificacion',
      description: 'Dedica tiempo los domingos para planificar las comidas de la semana. Esto te ayudará a comprar ingredientes saludables y evitar decisiones impulsivas.',
      icon: '🧠',
    },
    {
      id: 2,
      title: 'Involucra a los niños en la cocina',
      tag: 'educacion',
      description: 'Cocinar juntos es una excelente oportunidad para enseñar sobre nutrición y crear hábitos saludables desde temprana edad.',
      icon: '👨‍🍳',
    },
    {
      id: 3,
      title: 'Mantén frutas visibles y accesibles',
      tag: 'habitos',
      description: 'Coloca frutas frescas en lugares visibles de la cocina. Lo que está a la vista se consume más fácilmente.',
      icon: '🍎',
    },
    {
      id: 4,
      title: 'Lee las etiquetas nutricionales',
      tag: 'informacion',
      description: 'Antes de comprar, revisa el contenido de azúcar, sodio y grasas. Elige productos con menos aditivos y más ingredientes naturales.',
      icon: '🏷️',
    },
    {
      id: 5,
      title: 'Establece horarios regulares de comida',
      tag: 'rutina',
      description: 'Comer a las mismas horas ayuda a regular el metabolismo y evita el picoteo poco saludable entre comidas.',
      icon: '⏰',
    },
    {
      id: 6,
      title: 'Prefiere agua natural',
      tag: 'hidratacion',
      description: 'El agua es la mejor opción para hidratarse. Evita bebidas azucaradas y refrescos que aportan calorías vacías.',
      icon: '💧',
    },
  ];
  const [consejosData, setConsejosData] = useState<TipItem[]>([]);

  // Cargar los recursos
  const loadInfografias = async () => {
    try {
      const res = await getInfografias();
      // normalize response to ContentItem shape
      const items = (res.data || []).map((r: any, idx: number) => ({
        id: r.id_recurso || r.id || idx,
        title: r.titulo || r.id_recurso || `Infografia ${idx + 1}`,
        description: r.descripcion || '',
        duration: r.duracion || '-',
        // imagen: r.image || '',
        viewed: false,
      }));

      setInfografiasData(items);
    } catch (err: any) {
      if (err.response) {
        const { status, data: respData } = err.response;
        if (status === 404) toast.error('Infografías no encontradas (404)');
        else if (status === 401) toast.error('No autorizado (401)');
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
  };

  const loadVideos = async () => {
    try {
      const res = await getVideos();
      const items = (res.data || []).map((r: any, idx: number) => ({
        id: r.id_recurso || r.id || idx,
        title: r.titulo || `Video ${idx + 1}`,
        description: r.descripcion || '',
        duration: r.duracion || '-',
        viewed: false,
      }));
      setVideosData(items);
    } catch (err: any) {
      toast.error('No se pudieron cargar los videos');
      console.error(err);
    }
  };

  const loadTrivias = async () => {
    try {
      const res = await getTrivias();
      const items = (res.data || []).map((r: any, idx: number) => ({
        id: r.id_trivia || r.id || idx,
        title: r.titulo || `Trivia ${idx + 1}`,
        description: r.descripcion || '',
        duration: r.duracion || '-',
        viewed: false,
      }));
      setTriviasData(items);
    } catch (err: any) {
      toast.error('No se pudieron cargar las trivias');
      console.error(err);
    }
  };

  const loadConsejos = async () => {
    try {
      const res = await getConsejos();
      const items = (res.data || []).map((r: any, idx: number) => ({
        id: r.id_recurso || r.id || idx,
        title: r.titulo || `Consejo ${idx + 1}`,
        tag: r.categoria || 'general',
        description: r.descripcion || '',
        texto: r.texto || '',
        icon: r.icon || '💡',
      }));
      setConsejosData(items);
    } catch (err: any) {
      toast.error('No se pudieron cargar los consejos');
      console.error(err);
    }
  };

  useEffect(() => {
    loadInfografias();
    loadVideos();
    loadTrivias();
    loadConsejos();
  }, []);

  const handleView = async (content: {id: string}, contentType: ContentType) => {
    if (contentType === 'infografias') {
      try {
        const res = await downloadInfografiaFile(content.id);
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } catch (err: any) {
        if (err.response && err.response.status === 404) toast.error('Archivo no encontrado (404)');
        else toast.error('Error al descargar la infografía');
        console.error(err);
      }
      return;
    }
    // For videos and trivias, delegate to parent
    onViewContent(content.id, contentType === 'videos' ? 'videos' : 'trivias');
    // onViewContent(contentId, activeTab)
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'infografias':
        return infografias;
      case 'videos':
        return videos;
      case 'trivias':
        return trivias;
      default:
        return [];
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case 'infografias':
        return <FileText className="w-8 h-8" />;
      case 'videos':
        return <PlayCircle className="w-8 h-8" />;
      case 'trivias':
        return <HelpCircle className="w-8 h-8" />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case 'infografias':
        return 'Ver Infografía';
      case 'videos':
        return 'Ver Video';
      case 'trivias':
        return 'Jugar Trivia';
      default:
        return 'Ver';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3">Contenido Educativo</h1>
          <p className="text-gray-600">
            Recursos didácticos para promover hábitos alimentarios saludables en la comunidad escolar
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('infografias')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${activeTab === 'infografias'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <FileText className="w-5 h-5" />
            Infografías
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${activeTab === 'videos'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <PlayCircle className="w-5 h-5" />
            Videos
          </button>
          <button
            onClick={() => setActiveTab('trivias')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${activeTab === 'trivias'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <HelpCircle className="w-5 h-5" />
            Trivias
          </button>
          <button
            onClick={() => setActiveTab('consejos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${activeTab === 'consejos'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            <Lightbulb className="w-5 h-5" />
            Consejos
          </button>
        </div>

        {/* Content Grid */}
        {activeTab !== 'consejos' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'infografias' ? infografiasData : activeTab === 'videos' ? videosData : triviasData).map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  {getIcon()}
                </div>
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.viewed ? 'Visto' : 'No Visto'}</span>
                  </div>
                </div>
                <button
                  className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  onClick={() => handleView(item, activeTab)}
                >
                  {getButtonText()}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consejosData.map((consejo) => (
              <div key={consejo.id} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  <div className="text-5xl flex-shrink-0">
                    {consejo.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-3">{consejo.title}</h2>
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 mb-4">
                      {consejo.tag}
                    </div>
                    <p className="text-gray-600">
                      {consejo.texto}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}