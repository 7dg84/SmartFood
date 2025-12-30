/**
 * Configuración centralizada de rutas de la aplicación
 * Útil para evitar errores de tipeo y facilitar refactorización
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  CATALOGO: '/catalogo',
  PRODUCTO_DETALLE: (id: number | string) => `/catalogo/${id}`,
  CONTENIDO: '/contenido',
  CONTENIDO_DETALLE: (tipo: string, id: number | string) => `/contenido/${tipo}/${id}`,
  FEEDBACK: '/feedback',
  ESTADISTICAS: '/estadisticas',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  TIENDA: '/tienda',
  
  // System routes
  ESTADO: '/estado',
  MANTENIMIENTO: '/mantenimiento',
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  '/': 'Inicio',
  '/catalogo': 'Catálogo',
  '/contenido': 'Contenido Educativo',
  '/feedback': 'Retroalimentación',
  '/estadisticas': 'Estadísticas',
  '/dashboard': 'Dashboard Administrativo',
  '/tienda': 'Tienda / Cafetería',
  '/estado': 'Estado del Sistema',
  '/mantenimiento': 'Mantenimiento',
};

/**
 * Helper function to check if a route requires authentication
 */
export function isProtectedRoute(path: string): boolean {
  return [ROUTES.DASHBOARD, ROUTES.TIENDA].includes(path);
}

/**
 * Helper function to check if a route should hide the header
 */
export function shouldHideHeader(path: string): boolean {
  return [
    ROUTES.DASHBOARD,
    ROUTES.TIENDA,
    ROUTES.ESTADO,
    ROUTES.MANTENIMIENTO,
  ].some(route => path.startsWith(route));
}
