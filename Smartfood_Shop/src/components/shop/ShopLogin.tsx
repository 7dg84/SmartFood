import { ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ShopLoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export function ShopLogin({ onLoginSuccess, onClose }: ShopLoginProps) {
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [codigoSeguridad, setCodigoSeguridad] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleInitialLogin = () => {
    if (!usuario || !contraseña) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    // Simular verificación de credenciales
    setStep('verification');
  };

  const handleVerification = () => {
    if (!codigoSeguridad) {
      toast.error('Por favor ingresa el código de seguridad');
      return;
    }
    // Simular verificación de código
    toast.success('Inicio de sesión exitoso');
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            <span className="tracking-wide">SMARTFOOD DASHBOARD</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Login Forms */}
      <div className="flex items-center justify-center min-h-[calc(100vh-73px)] px-4">
        {step === 'credentials' ? (
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 w-full max-w-md">
            <h2 className="text-center mb-8">Iniciar Sesión</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm">Usuario</label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm">Contraseña</label>
                <input
                  type="password"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              
              <button
                onClick={handleInitialLogin}
                className="w-full px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 w-full max-w-md">
            <h2 className="text-center mb-2">Escribe los códigos de seguridad</h2>
            
            <div className="space-y-6 mt-8">
              <div>
                <label className="block mb-2 text-sm">Código de Seguridad enviado al correo</label>
                <input
                  type="text"
                  value={codigoSeguridad}
                  onChange={(e) => setCodigoSeguridad(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setStep('credentials')}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleVerification}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h3>Error</h3>
              <button 
                onClick={() => setShowErrorModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600">Horario no autorizado</p>
          </div>
        </div>
      )}
    </div>
  );
}