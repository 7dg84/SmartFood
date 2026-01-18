import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { loginApi } from '../api/admins';

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    username: string | null;
    login: (credentials: { email: string; password: string }) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    token: null,
    username: null,
    login: async () => false,
    logout: () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('dashboardToken'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('dashboardToken'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('dashboardUsername'));

    const login = async (credentials: { email: string; password: string }) => {
        try {
            if (!(credentials.email && credentials.password)) {
                return false;
            }
            const res = await loginApi(credentials); // Llamada a la API de login            
            if (!(res.data.token && res.data.user)) {
                return false;
            }
            setIsLoggedIn(true); // TODO: modificar cuando se agregue MFA
            setToken(res.data.token);
            setUsername(res.data.user.username);
            localStorage.setItem('dashboardToken', res.data.token);
            localStorage.setItem('dashboardUsername', res.data.user.username);
            return true; // Login exitoso
        } catch (error) {
            console.error('Error during login:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('dashboardToken');
        localStorage.removeItem('dashboardUsername');
        setToken(null);
        setUsername(null);
        setIsLoggedIn(false);
        toast.success('Sesión cerrada');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
