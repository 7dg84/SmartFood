import { useState, useEffect } from 'react';

interface UseAuthOptions {
  storageKey: string;
}

export function useAuth({ storageKey }: UseAuthOptions) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem(storageKey);
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, [storageKey]);

  const login = () => {
    localStorage.setItem(storageKey, 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
