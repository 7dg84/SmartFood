import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-5xl mb-6">
              Alimentación Escolar Saludable
            </h1>
            <p className="text-white/90 mb-8 text-lg">
              Plataforma integral para el cumplimiento de la normativa federal sobre alimentos saludables en el ámbito escolar. Promoviendo una alimentación nutritiva y educación alimentaria.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Explorar catálogo
              </button>
              <button className="px-6 py-3 bg-white text-gray-800 rounded hover:bg-gray-100 transition-colors">
                Contenido Educativo
              </button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1757332051150-a5b3c4510af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBoZWFsdGh5JTIwZm9vZHxlbnwxfHx8fDE3NjMyOTUzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fresh vegetables and healthy food"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
