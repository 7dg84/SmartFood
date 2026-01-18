import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    username: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: null,
    username: null,
    login: async () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('shopToken'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('shopToken'));
    const [username, setUsername] = useState<string | null>(localStorage.getItem('shopUsername'));

    const login = async (credentials: { email: string; password: string }) => {
        try {
            // TODO: Integrar con la API real
            // Por ahora, simulación básica
            if (credentials.email && credentials.password) {
                const mockToken = 'mock-shop-token';
                const mockUsername = credentials.email.split('@')[0];
                
                localStorage.setItem('shopToken', mockToken);
                localStorage.setItem('shopUsername', mockUsername);
                
                setToken(mockToken);
                setUsername(mockUsername);
                setIsAuthenticated(true);
                
                toast.success('Inicio de sesión correcto');
            }
        } catch (error) {
            toast.error('Error en el inicio de sesión');
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('shopToken');
        localStorage.removeItem('shopUsername');
        setToken(null);
        setUsername(null);
        setIsAuthenticated(false);
        toast.success('Sesión cerrada');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
