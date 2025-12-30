import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * 
 * Envuelve rutas que requieren autenticación.
 * Redirige a una página específica si el usuario no está autenticado.
 * 
 * @example
 * ```tsx
 * <Route 
 *   path="/dashboard" 
 *   element={
 *     <ProtectedRoute isAuthenticated={isAuth}>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 */
export function ProtectedRoute({ 
  children, 
  isAuthenticated, 
  redirectTo = '/' 
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
