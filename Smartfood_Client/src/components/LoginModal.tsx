import { CloudSnow, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { RegisterModal } from './RegisterModal';
import { useForm } from 'react-hook-form';
import { login } from '../api/user';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (data: any) => void;
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleLogin = handleSubmit(async data => {
    if (!data.email || !data.password) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }
    // console.log(data);

    try {
      const res = await login(data); // axios POST
      const token = res.data.token;
      localStorage.setItem('token', token); // solo si no usas HttpOnly cookies
      localStorage.setItem('username', res.data.user.username);

      toast.success('Inicio de sesión correcto');
      onLogin(res.data);

      reset();
    } catch (err: any) {
      if (err.response) {
        const { status, data: respData } = err.response;
        if (status === 404) toast.error('Usuario no encontrado');
        else if (status === 401) toast.error('Credenciales incorrectas');
        else if (status === 400) {
          // posible objeto de validación: { email: ["..."], password: ["..."] }
          if (typeof respData === 'object') {
            const msgs = Object.values(respData).flat().join(' - ');
            toast.error(msgs || 'Error de validación (400)');
          } else {
            toast.error(respData?.message || 'Solicitud inválida (400)');
          }
        } else {
          toast.error(respData?.message || `Error del servidor (${status})`);
        }
      } else {
        toast.error('Error de red o sin respuesta del servidor');
      }
      console.error(err);
    }
  })
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

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                {...register('email', { required: true })}
                placeholder="mail@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.email && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                {...register('password', { required: true })}
                placeholder="••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.password && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
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