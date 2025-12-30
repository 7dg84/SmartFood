import { Plus, Type, Minus, Settings, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Chatbot } from './Chatbot';

interface HelpModalProps {
  onClose: () => void;
}

export function HelpModal({ onClose }: HelpModalProps) {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex items-end justify-end p-4 z-50 pointer-events-none">
        <div className="bg-white rounded-lg shadow-xl mb-20 mr-4 pointer-events-auto">
          <div className="p-3">
            <div className="flex flex-col gap-2">
              {/* Add Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <Plus className="w-5 h-5 text-gray-700" />
              </button>

              {/* Text Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <Type className="w-5 h-5 text-gray-700" />
              </button>

              {/* Minus Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <Minus className="w-5 h-5 text-gray-700" />
              </button>

              {/* A Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <span className="text-gray-700">A</span>
              </button>

              {/* Divider */}
              <div className="border-t border-gray-200 my-1"></div>

              {/* ES Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <span className="text-gray-700 text-sm">ES</span>
              </button>

              {/* Help Button */}
              <button 
                onClick={() => setShowChatbot(!showChatbot)}
                className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center"
              >
                <HelpCircle className="w-5 h-5 text-gray-700" />
              </button>

              {/* Settings Button */}
              <button className="p-3 hover:bg-gray-100 rounded transition-colors flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </>
  );
}