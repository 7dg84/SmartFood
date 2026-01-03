import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface RegisterModalProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

export function RegisterModal({ onClose, onBackToLogin }: RegisterModalProps) {

  const { register: registerForm, handleSubmit, formState: { errors }, reset } = useForm();
  const { register } = useAuth();

  const handleSubmitRegister = handleSubmit(async data => {

    // Validación de campos vacíos
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      toast.error('Error Todos los campos son obligatorios');
      return;
    }

    // Validación de correo electrónico
    if (!data.email.includes('@')) {
      toast.error('Error Correo electrónico inválido');
      return;
    }

    // Validación de contraseñas coincidentes
    if (data.password !== data.confirmPassword) {
      toast.error('Error Las contraseñas no coinciden');
      return;
    }

    // Validación de longitud de contraseña
    if (data.password.length < 6) {
      toast.error('Error La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (await register(data)) onBackToLogin();

  });

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

          <form onSubmit={handleSubmitRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Nombre
              </label>
              <input
                id="username"
                type="text"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
                {...registerForm('username', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.username && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="register-email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="register-email"
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                {...registerForm('email', { required: 'El correo es obligatorio' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
            </div>

            <div className="mb-4">
              <label htmlFor="register-password" className="block text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="register-password"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...registerForm('password', { required: 'La contraseña es obligatoria' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.password && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
                Repita la Contraseña
              </label>
              <input
                id="confirm-password"
                type="password"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                {...registerForm('confirmPassword', { required: 'Debe confirmar la contraseña' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
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
