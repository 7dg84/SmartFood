import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    if (!usuario || !contraseña) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    
    await login({ email: usuario, password: contraseña });
    navigate('/shop');
  };

  const handleClose = () => {
    // Redirigir al sitio principal
    window.location.href = 'http://localhost:5173';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Store className="w-6 h-6" />
            <span className="tracking-wide">SMARTFOOD SHOP</span>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)] px-4">
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 w-full max-w-md">
          <h2 className="text-center mb-8 text-xl font-semibold">Iniciar Sesión</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm">Contraseña</label>
              <input
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
