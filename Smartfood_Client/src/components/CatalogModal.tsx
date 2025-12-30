import { X } from 'lucide-react';

interface CatalogModalProps {
  onClose: () => void;
}

export function CatalogModal({ onClose }: CatalogModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">Catálogo</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula 
              accumsan ante et sodien adipiscin ultricies. Aliquam et accumsan et 
              viverra semper. Pellentesque sit accumsan, dictum lacus odio, at vehicu 
              velit lobortis. Duis aliquet pretium, pellentesque dictum mauris 
              aliquet quis tincidunt. Id faucibus lectus, amet finibus convallis 
              odio orci at nisi. Quisque nullam adipisci, et vehicula ligula nec. 
              Sed pellentesque, nisl tempus ligula. Ut tincidunt, mauris vestibulum 
              vehicula non viverra, sed nunc porttitor curabitur, duis lorem. Pellentesque 
              adipiscing. Phasellus etiam lectus risus. Suspendisse sodales congue eget 
              posuere auctor aliquet, dictum nibh.
            </p>
          </div>

          <div className="flex justify-between">
            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Anterior
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
