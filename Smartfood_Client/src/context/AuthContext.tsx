import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { loginApi, logoutApi, registerApi } from '../api/user'

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null as string | null,
    user: null as any,
    login: (payload: { email: string, password: any }) => { },
    logout: () => { },
    register: (payload: { username: string, email: string, password: string }) => { succes: Boolean }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [username, setUsername] = useState<string>((localStorage.getItem('username') || 'null'));

    const login = async (data: []) => {
        try {
            const res = await loginApi(data); // axios POST
            const token = res.data.token;
            localStorage.setItem('token', token); // solo si no usas HttpOnly cookies
            localStorage.setItem('username', res.data.user.username);

            toast.success('Inicio de sesión correcto');
            // onLogin(res.data);
            setIsLoggedIn(true);
            setUsername(res.data.user.username);

            // reset();
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
    };
    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            await logoutApi(token);
            setIsLoggedIn(false)
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setToken(null);
            setUsername(null);
        } catch (error) {
            toast.error('Error en el cierre de sesion.')
            console.error('Error during logout:', error);
        }
    };

    const register = async (data: []) => {
        try {
            const res = await registerApi(data);
            toast.success('Cuenta creada exitosamente Ya puedes iniciar sesión');
            return true;
        } catch (err: any) {
            if (err.response) {
                const { status, data: respData } = err.response;
                if (status === 404) toast.error('Error 404');
                else if (status === 401) toast.error('Error 401');
                else if (status === 400) {
                    // posible objeto de validación: { email: ["..."], password: ["..."] }
                    if (typeof respData === 'object') {
                        let msgs = "Error en:\n" + Object.keys(respData).flat().join(' - ') + '\n' + Object.values(respData).flat().join(' - ')
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
            console.error(err)
        }
        return false;
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, token, username, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );


};
export const useAuth = () => {
    return useContext(AuthContext);
}