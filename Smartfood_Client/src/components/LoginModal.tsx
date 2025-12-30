import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { RegisterModal } from './RegisterModal';

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular validación de login
    if (!email || !password) {
      toast.error('Error', {
        description: 'Usuario o contraseña inválidos',
      });
      return;
    }

    // Aquí iría la lógica de autenticación real
    console.log('Login attempt:', { email, password });
    toast.success('Sesión iniciada correctamente');
    onClose();
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal 
        onClose={onClose}
        onBackToLogin={() => setShowForgotPassword(false)}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterModal 
        onClose={onClose}
        onBackToLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl">Iniciar Sesión</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-6">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Olvidé mi contraseña
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleRegister}
                className="text-blue-600 hover:text-blue-700"
              >
                Registrarse
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}