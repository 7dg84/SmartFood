import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface RegisterModalProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

export function RegisterModal({ onClose, onBackToLogin }: RegisterModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Error', {
        description: 'Todos los campos son obligatorios',
      });
      return;
    }

    // Validación de correo electrónico
    if (!email.includes('@')) {
      toast.error('Error', {
        description: 'Correo electrónico inválido',
      });
      return;
    }

    // Validación de contraseñas coincidentes
    if (password !== confirmPassword) {
      toast.error('Error', {
        description: 'Las contraseñas no coinciden',
      });
      return;
    }

    // Validación de longitud de contraseña
    if (password.length < 6) {
      toast.error('Error', {
        description: 'La contraseña debe tener al menos 6 caracteres',
      });
      return;
    }

    // Aquí iría la lógica de registro real
    console.log('Register attempt:', { name, email, password });
    toast.success('Cuenta creada exitosamente', {
      description: 'Ya puedes iniciar sesión',
    });
    onBackToLogin();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl">Crear Cuenta</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="register-email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="register-password" className="block text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
                Repita la Contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
