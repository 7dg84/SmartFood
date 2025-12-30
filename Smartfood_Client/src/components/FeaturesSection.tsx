import { BookOpen, Heart, ShoppingCart, BarChart3, MessageSquare, CheckCircle } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Catálogo de Alimentos',
      description: 'Lista completa de alimentos permitidos y prohibidos con filtros por categoría',
      buttonText: 'Ver Catálogo',
      highlighted: false
    },
    {
      icon: Heart,
      title: 'Contenido Educativo',
      description: 'Infografías, trivias, videos y consejos para promover hábitos alimentarios saludables',
      buttonText: 'Explorar Contenido',
      highlighted: false
    },
    {
      icon: MessageSquare,
      title: 'Retroalimentación',
      description: 'Encuestas estudiantiles y evaluación de aceptación de alimentos saludables',
      buttonText: 'Participar',
      highlighted: false
    },
    {
      icon: BarChart3,
      title: 'Dashboard de Monitoreo',
      description: 'Estadísticos de cumplimiento, productos prohibidos y evaluaciones mensuales',
      buttonText: 'Ver Estadísticas',
      highlighted: false
    },
    {
      icon: ShoppingCart,
      title: 'Registro de Productos',
      description: 'Panel para cafeterías con validación automática de productos y alertas de cumplimiento',
      buttonText: 'Acceder Panel',
      highlighted: false
    },
    {
      icon: CheckCircle,
      title: 'Cumplimiento Normativo',
      description: 'Herramientas para garantizar el cumplimiento de la normativa federal vigente',
      buttonText: '',
      highlighted: true,
      features: [
        'Validación automática',
        'Reportes de cumplimiento'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">Funcionalidades Principales</h2>
          <p className="text-gray-600 text-lg">
            Todo lo que necesitas para gestionar la alimentación escolar saludable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border transition-all hover:shadow-lg ${
                  feature.highlighted
                    ? 'bg-emerald-100 border-emerald-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg mb-4 ${
                  feature.highlighted ? 'bg-emerald-500' : 'bg-emerald-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    feature.highlighted ? 'text-white' : 'text-emerald-600'
                  }`} />
                </div>
                
                <h3 className="text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                {feature.features && (
                  <div className="space-y-2 mb-4">
                    {feature.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {feature.buttonText && (
                  <button className="text-gray-700 hover:text-emerald-600 transition-colors">
                    {feature.buttonText}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
