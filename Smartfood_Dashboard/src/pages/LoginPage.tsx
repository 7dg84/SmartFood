import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

export function LoginPage() {
    const navigate = useNavigate();
    const { login, isLoggedIn } = useAuth();
    const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [codigoCorreo, setCodigoCorreo] = useState('');
    const [codigoTelefono, setCodigoTelefono] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleInitialLogin = handleSubmit(async (data) => {
        if (!data.email || !data.contraseña) {
            toast.error('Por favor completa todos los campos');
            return;
        }
        const res = await login({ email: data.email, password: data.contraseña });

        if (!res) {
            toast.error('Credenciales inválidas');
            return;
        }
        toast.success('Inicio de sesión correcto');
        // Simular verificación de credenciales
        setStep('verification');
    });

    const handleVerification = async () => {
        if (!codigoCorreo || !codigoTelefono) {
            toast.error('Por favor ingresa ambos códigos de seguridad');
            return;
        }
        // Simular verificación de códigos
        // await login({ email: "1", password: "contraseña" });
        
        navigate('/dashboard');
    };

    const handleClose = () => {
        // Redirigir al sitio principal
        window.location.href = 'http://localhost:3000';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard className="w-6 h-6" />
                        <span className="tracking-wide">SMARTFOOD DASHBOARD</span>
                    </div>
                    <button
                        onClick={handleClose}
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
                        <h2 className="text-center mb-8 text-xl font-semibold">Iniciar Sesión</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block mb-2 text-sm">Email</label>
                                <input
                                    type="text"
                                    // value={usuario}
                                    // onChange={(e) => setUsuario(e.target.value)}
                                    {...register('email', { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                {errors.email && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Contraseña</label>
                                <input
                                    type="password"
                                    // value={contraseña}
                                    // onChange={(e) => setContraseña(e.target.value)}
                                    {...register('contraseña', { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                {errors.contraseña && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
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
                        <h2 className="text-center mb-2 text-xl font-semibold">Escribe los códigos de seguridad</h2>

                        <div className="space-y-6 mt-8">
                            <div>
                                <label className="block mb-2 text-sm">Código de Seguridad enviado al correo</label>
                                <input
                                    type="text"
                                    value={codigoCorreo}
                                    onChange={(e) => setCodigoCorreo(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Código de Seguridad enviado al teléfono</label>
                                <input
                                    type="text"
                                    value={codigoTelefono}
                                    onChange={(e) => setCodigoTelefono(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
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
        </div>
    );
}
