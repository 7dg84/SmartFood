import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose }: ChatbotProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: '¡Hola! ¿En qué te puedo ayudar?' }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { type: 'user', text: message }]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: 'Gracias por tu mensaje. Un especialista te ayudará pronto.' 
        }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 bg-white rounded-lg shadow-xl w-80 z-50">
      <div className="flex flex-col h-96">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg">Asistente Virtual</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
