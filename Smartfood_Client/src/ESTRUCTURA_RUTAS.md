# Estructura de Rutas - SMARTFOOD

## Arquitectura de Navegación

La aplicación ahora utiliza **React Router v6** para gestionar la navegación entre diferentes secciones.

## Rutas Principales

### Rutas Públicas (con Layout)
Estas rutas incluyen el Header, Footer y modales globales:

- **`/`** - Página de inicio
  - Componente: `/pages/Home.tsx`
  - Incluye: Hero, Features, Stats (comentado), Footer

- **`/catalogo`** - Catálogo de productos
  - Componente: `/pages/Catalogo.tsx`
  - Vista: Listado de todos los productos disponibles

- **`/catalogo/:id`** - Detalle de producto
  - Componente: `/pages/ProductoDetalle.tsx`
  - Parámetro: `id` (número del producto)
  - Vista: Información detallada de un producto específico

- **`/contenido`** - Contenido educativo
  - Componente: `/pages/Contenido.tsx`
  - Vista: Infografías, videos y trivias

- **`/contenido/:tipo/:id`** - Detalle de contenido
  - Componente: `/pages/ContenidoDetalle.tsx`
  - Parámetros: 
    - `tipo`: 'infografias' | 'videos' | 'trivias'
    - `id`: número del contenido
  - Vista: Visualización detallada del contenido

- **`/feedback`** - Retroalimentación
  - Componente: `/pages/Feedback.tsx`
  - Vista: Formulario de feedback y comentarios

- **`/estadisticas`** - Estadísticas del sistema
  - Componente: `/pages/Estadisticas.tsx`
  - Vista: Métricas y estadísticas de uso

### Rutas Protegidas (sin Layout)
Estas rutas son pantallas completas sin Header ni Footer:

- **`/dashboard`** - Dashboard administrativo
  - Componente: `/pages/Dashboard.tsx`
  - Autenticación: Requiere login
  - Gestión: Inventario, Catálogo, Productos, Cuentas
  - Persistencia: `localStorage.dashboardAuth`

- **`/tienda`** - Sistema de tienda/cafetería
  - Componente: `/pages/Tienda.tsx`
  - Autenticación: Requiere login
  - Gestión: Inventario, Productos, Ventas
  - Persistencia: `localStorage.shopAuth`

- **`/estado`** - Estado del sistema
  - Componente: `/pages/Estado.tsx`
  - Vista: Monitoreo y estado de servicios

- **`/mantenimiento`** - Página de mantenimiento
  - Componente: `/pages/Mantenimiento.tsx`
  - Vista: Información de mantenimiento programado

## Estructura de Archivos

```
/
├── App.tsx                          # Router principal y definición de rutas
├── pages/                           # Páginas de la aplicación
│   ├── Home.tsx                     # Página de inicio
│   ├── Catalogo.tsx                 # Listado de productos
│   ├── ProductoDetalle.tsx          # Detalle de producto
│   ├── Contenido.tsx                # Contenido educativo
│   ├── ContenidoDetalle.tsx         # Detalle de contenido
│   ├── Feedback.tsx                 # Retroalimentación
│   ├── Estadisticas.tsx             # Estadísticas
│   ├── Dashboard.tsx                # Dashboard admin (protegido)
│   ├── Tienda.tsx                   # Tienda (protegido)
│   ├── Estado.tsx                   # Estado del sistema
│   └── Mantenimiento.tsx            # Mantenimiento
└── components/
    ├── Layout.tsx                   # Layout wrapper (Header + Modals + Help)
    ├── Header.tsx                   # Navegación principal
    ├── Footer.tsx                   # Pie de página
    ├── HeroSection.tsx              # Sección hero
    ├── FeaturesSection.tsx          # Características
    ├── StatsSection.tsx             # Estadísticas
    ├── UserModal.tsx                # Modal de usuario
    ├── CatalogModal.tsx             # Modal de catálogo
    ├── HelpModal.tsx                # Modal de ayuda
    ├── CatalogPage.tsx              # Vista de catálogo
    ├── ProductDetailPage.tsx        # Vista de detalle producto
    ├── ContentPage.tsx              # Vista de contenido
    ├── ContentDetailPage.tsx        # Vista detalle contenido
    ├── FeedbackPage.tsx             # Vista de feedback
    ├── MaintenancePage.tsx          # Vista de mantenimiento
    ├── dashboard/                   # Componentes del dashboard
    │   ├── DashboardLayout.tsx
    │   ├── DashboardLogin.tsx
    │   ├── DashboardInventory.tsx
    │   ├── CatalogManagement.tsx
    │   ├── ProductManagement.tsx
    │   └── AccountManagement.tsx
    ├── shop/                        # Componentes de tienda
    │   ├── ShopLayout.tsx
    │   ├── ShopLogin.tsx
    │   ├── ShopInventory.tsx
    │   ├── ShopProductManagement.tsx
    │   └── ShopSales.tsx
    └── status/
        └── StatusPage.tsx           # Vista de estado
```

## Navegación Programática

### Usando Links
```tsx
import { Link } from 'react-router-dom';

<Link to="/catalogo">Ver Catálogo</Link>
<Link to="/catalogo/123">Ver Producto 123</Link>
<Link to="/contenido/videos/5">Ver Video 5</Link>
```

### Usando useNavigate
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/catalogo');
  };
  
  const handleBack = () => {
    navigate(-1); // Ir atrás
  };
}
```

### Accediendo a Parámetros de Ruta
```tsx
import { useParams } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams(); // Obtiene el :id de la URL
  // usar id...
}
```

## Componente Layout

El componente `Layout.tsx` envuelve las rutas públicas y proporciona:

1. **Header** - Navegación principal con Links de react-router
2. **Modales Globales** - UserModal, CatalogModal, HelpModal
3. **Botón de Ayuda** - Flotante en la esquina inferior derecha
4. **Ocultamiento Condicional** - No se muestra en rutas especiales

### Rutas que NO usan Layout:
- `/dashboard`
- `/tienda`
- `/estado`
- `/mantenimiento`

## Sistema de Autenticación

### Dashboard
- Login: `/dashboard` muestra `DashboardLogin` si no está autenticado
- Persistencia: `localStorage.getItem('dashboardAuth')`
- Logout: Limpia localStorage y redirige a `/`

### Tienda
- Login: `/tienda` muestra `ShopLogin` si no está autenticado
- Persistencia: `localStorage.getItem('shopAuth')`
- Logout: Limpia localStorage y redirige a `/`

## Mejoras Futuras

1. **Context API** - Implementar AuthContext para gestionar estado de autenticación globalmente
2. **Rutas Protegidas** - Crear un componente ProtectedRoute para validación
3. **Lazy Loading** - Cargar páginas de forma diferida con React.lazy()
4. **Breadcrumbs** - Agregar navegación de migas de pan
5. **404 Page** - Crear página de error para rutas no encontradas
6. **Transiciones** - Agregar transiciones entre rutas con framer-motion

## Ejemplos de Uso

### Navegar desde un componente
```tsx
import { useNavigate } from 'react-router-dom';

export function MyButton() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/catalogo')}>
      Ver Catálogo
    </button>
  );
}
```

### Link con estado activo
```tsx
import { Link, useLocation } from 'react-router-dom';

export function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to}
      className={isActive ? 'active' : ''}
    >
      {children}
    </Link>
  );
}
```

### Redireccionamiento condicional
```tsx
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('auth');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
```
