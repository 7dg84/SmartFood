import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';

interface ForgotPasswordModalProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordModal({ onClose, onBackToLogin }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { recover } = useAuth();

  const handleSubmitRecover = handleSubmit(async data => {
    if (!data.email) {
      toast.error('Error Por favor ingrese un correo electrónico');
      return;
    }

    if (!data.email.includes('@')) {
      toast.error('Error Correo no valido');
      return;
    }

    // Si el correo es válido
    if (await recover(data)) {
      // toast.success('Correo enviado Revisa tu bandeja de entrada para recuperar tu contraseña');
      onClose();
    }

  });

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

          <form onSubmit={handleSubmitRecover}>
            <div className="mb-6">
              <label htmlFor="recovery-email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="recovery-email"
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                {...register('email', { required: true })}
                placeholder="mail@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
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
