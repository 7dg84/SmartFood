import { FileText, PlayCircle, HelpCircle, Lightbulb, Clock, Eye } from 'lucide-react';
import { useState } from 'react';

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
  onViewContent: (contentId: number, contentType: 'infografias' | 'videos' | 'trivias') => void;
}

export function ContentPage({ onViewContent }: ContentPageProps) {
  const [activeTab, setActiveTab] = useState<ContentType>('infografias');

  const infografias: ContentItem[] = [
    {
      id: 1,
      title: 'Pirámide Alimentaria Escolar',
      description: 'Guía visual de los grupos alimentarios recomendados',
      duration: '5 min',
      viewed: true,
    },
    {
      id: 2,
      title: 'Beneficios de las Frutas y Verduras',
      description: 'Infografía colorida sobre vitaminas y minerales',
      duration: '3 min',
      viewed: true,
    },
    {
      id: 3,
      title: 'Hidratación Saludable',
      description: 'Importancia del agua y bebidas naturales',
      duration: '2 min',
      viewed: false,
    },
    {
      id: 4,
      title: 'Lectura de Etiquetas Nutricionales',
      description: 'Cómo interpretar la información nutricional',
      duration: '4 min',
      viewed: false,
    },
    {
      id: 5,
      title: 'Porciones Adecuadas por Edad',
      description: 'Tamaños de porción recomendados para niños',
      duration: '3 min',
      viewed: true,
    },
    {
      id: 6,
      title: 'Desayuno Nutritivo',
      description: 'Ideas para un desayuno balanceado y energético',
      duration: '4 min',
      viewed: false,
    },
  ];

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
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'infografias'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            Infografías
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <PlayCircle className="w-5 h-5" />
            Videos
          </button>
          <button
            onClick={() => setActiveTab('trivias')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'trivias'
                ? 'border-gray-800 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            Trivias
          </button>
          <button
            onClick={() => setActiveTab('consejos')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'consejos'
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
            {getCurrentContent().map((item) => (
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
                  onClick={() => onViewContent(item.id, activeTab)}
                >
                  {getButtonText()}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {consejos.map((consejo) => (
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
                      {consejo.description}
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