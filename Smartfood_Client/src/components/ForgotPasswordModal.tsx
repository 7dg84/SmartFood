import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ForgotPasswordModalProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordModal({ onClose, onBackToLogin }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular validación de correo
    if (!email) {
      toast.error('Error', {
        description: 'Por favor ingrese un correo electrónico',
      });
      return;
    }

    // Simular verificación de correo registrado
    // En un caso real, aquí se verificaría con el backend
    const isRegistered = email.includes('@'); // Simulación simple
    
    if (!isRegistered) {
      toast.error('Error', {
        description: 'Correo no registrado',
      });
      return;
    }

    // Si el correo es válido
    toast.success('Correo enviado', {
      description: 'Revisa tu bandeja de entrada para recuperar tu contraseña',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl">Recuperar</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="recovery-email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="recovery-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-700"
              >
                Iniciar Sesión
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Recuperar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
