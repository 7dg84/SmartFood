# 🍎 SMARTFOOD - Alimentación Escolar Saludable

Plataforma web para gestión de alimentación escolar saludable con sistema de catálogo, contenido educativo, dashboard administrativo y tienda/cafetería.

## 🚀 Características Principales

- ✅ **Sistema de Rutas**: Navegación completa con React Router v6
- ✅ **Catálogo de Productos**: Exploración y detalle de productos alimenticios
- ✅ **Contenido Educativo**: Infografías, videos y trivias
- ✅ **Dashboard Administrativo**: Gestión de inventario, catálogo, productos y cuentas
- ✅ **Sistema de Tienda**: Gestión de ventas, inventario y productos
- ✅ **Retroalimentación**: Sistema de feedback de usuarios
- ✅ **Estadísticas**: Visualización de métricas del sistema
- ✅ **Autenticación**: Sistema de login para áreas protegidas
- ✅ **Responsive**: Diseño adaptable a todos los dispositivos

## 📁 Estructura del Proyecto

```
SMARTFOOD/
├── pages/                      # Páginas de la aplicación
│   ├── Home.tsx               # Página principal
│   ├── Catalogo.tsx           # Listado de productos
│   ├── ProductoDetalle.tsx    # Detalle de producto
│   ├── Contenido.tsx          # Contenido educativo
│   ├── ContenidoDetalle.tsx   # Detalle de contenido
│   ├── Feedback.tsx           # Retroalimentación
│   ├── Estadisticas.tsx       # Estadísticas
│   ├── Dashboard.tsx          # Dashboard admin
│   ├── Tienda.tsx             # Sistema de tienda
│   ├── Estado.tsx             # Estado del sistema
│   ├── Mantenimiento.tsx      # Mantenimiento
│   ├── NotFound.tsx           # Página 404
│   └── index.ts               # Exportaciones
│
├── components/                 # Componentes reutilizables
│   ├── Layout.tsx             # Wrapper principal
│   ├── Header.tsx             # Navegación principal
│   ├── Footer.tsx             # Pie de página
│   ├── Breadcrumbs.tsx        # Migas de pan
│   ├── QuickLinks.tsx         # Enlaces rápidos
│   ├── ScrollToTop.tsx        # Auto-scroll
│   ├── ProtectedRoute.tsx     # Ruta protegida
│   ├── HeroSection.tsx        # Sección hero
│   ├── FeaturesSection.tsx    # Características
│   ├── StatsSection.tsx       # Estadísticas
│   ├── UserModal.tsx          # Modal de usuario
│   ├── CatalogModal.tsx       # Modal de catálogo
│   ├── HelpModal.tsx          # Modal de ayuda
│   ├── CatalogPage.tsx        # Vista catálogo
│   ├── ProductDetailPage.tsx  # Vista detalle producto
│   ├── ContentPage.tsx        # Vista contenido
│   ├── ContentDetailPage.tsx  # Vista detalle contenido
│   ├── FeedbackPage.tsx       # Vista feedback
│   ├── MaintenancePage.tsx    # Vista mantenimiento
│   ├── dashboard/             # Módulos del dashboard
│   │   ├── DashboardLayout.tsx
│   │   ├── DashboardLogin.tsx
│   │   ├── DashboardInventory.tsx
│   │   ├── CatalogManagement.tsx
│   │   ├── ProductManagement.tsx
│   │   └── AccountManagement.tsx
│   ├── shop/                  # Módulos de tienda
│   │   ├── ShopLayout.tsx
│   │   ├── ShopLogin.tsx
│   │   ├── ShopInventory.tsx
│   │   ├── ShopProductManagement.tsx
│   │   └── ShopSales.tsx
│   ├── status/
│   │   └── StatusPage.tsx
│   └── ui/                    # Componentes UI base
│
├── hooks/                      # Custom hooks
│   └── useAuth.ts             # Hook de autenticación
│
├── config/                     # Configuración
│   └── routes.ts              # Configuración de rutas
│
├── styles/
│   └── globals.css            # Estilos globales
│
├── App.tsx                     # Componente principal
├── ESTRUCTURA_RUTAS.md        # Documentación de rutas
├── CAMBIOS_ROUTING.md         # Resumen de cambios
└── README.md                   # Este archivo
```

## 🗺️ Mapa de Rutas

### Rutas Públicas
- `/` - Página de inicio
- `/catalogo` - Catálogo de productos
- `/catalogo/:id` - Detalle de producto específico
- `/contenido` - Contenido educativo (infografías, videos, trivias)
- `/contenido/:tipo/:id` - Detalle de contenido específico
- `/feedback` - Formulario de retroalimentación
- `/estadisticas` - Estadísticas del sistema

### Rutas Protegidas (requieren autenticación)
- `/dashboard` - Dashboard administrativo
  - Gestión de inventario
  - Gestión de catálogo
  - Gestión de productos
  - Gestión de cuentas de usuario
- `/tienda` - Sistema de tienda/cafetería
  - Gestión de inventario
  - Gestión de productos
  - Registro de ventas

### Rutas del Sistema
- `/estado` - Estado del sistema y servicios
- `/mantenimiento` - Información de mantenimiento

### Error
- `/*` - Página 404 (ruta no encontrada)

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **React Router v6** - Enrutamiento
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de autenticación

## 🎨 Diseño y Estilos

### Colores Principales
- Verde principal: `#16a249`
- Degradados: Verde-Azul (`from-emerald-50 to-cyan-50`)
- Texto: Gris oscuro para contenido, Verde para títulos

### Tipografía
- **Sans-serif**: Contenido general
- **Monospace**: Logo "SMARTFOOD"

## 💻 Uso del Sistema de Rutas

### Navegación con Links
```tsx
import { Link } from 'react-router-dom';

<Link to="/catalogo">Ver Catálogo</Link>
<Link to="/catalogo/123">Ver Producto 123</Link>
```

### Navegación Programática
```tsx
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/catalogo')}>
      Ir al Catálogo
    </button>
  );
}
```

### Acceso a Parámetros de URL
```tsx
import { useParams } from 'react-router-dom';

function ProductoDetalle() {
  const { id } = useParams();
  // Usar el id del producto
}
```

### Usar Configuración de Rutas
```tsx
import { ROUTES } from './config/routes';

navigate(ROUTES.CATALOGO);
navigate(ROUTES.PRODUCTO_DETALLE(123));
navigate(ROUTES.CONTENIDO_DETALLE('videos', 5));
```

## 🔐 Autenticación

### Dashboard
```tsx
// Login persiste en localStorage con key 'dashboardAuth'
const { isAuthenticated, login, logout } = useAuth({ 
  storageKey: 'dashboardAuth' 
});
```

### Tienda
```tsx
// Login persiste en localStorage con key 'shopAuth'
const { isAuthenticated, login, logout } = useAuth({ 
  storageKey: 'shopAuth' 
});
```

## 📝 Formularios del Sistema

El proyecto incluye 13 formularios diferentes con más de 47 campos únicos:

### Autenticación (3 formularios)
- Login
- Registro
- Recuperación de contraseña

### Dashboard Admin (4 módulos)
- Gestión de inventario
- Gestión de catálogo
- Gestión de productos
- Gestión de cuentas

### Sistema de Tienda (3 módulos)
- Inventario
- Productos
- Ventas

### Otros (3 formularios)
- Feedback
- Filtros de catálogo
- Filtros de contenido

## 🌐 Navegación

### Header
- Logo SMARTFOOD (enlace a inicio)
- Inicio
- Catálogo
- Contenido
- Retroalimentación
- Icono de Usuario (abre modal)

### Breadcrumbs
- Navegación visual del camino actual
- Enlaces clicables para retroceder
- Se oculta en página de inicio

### Footer
- Enlaces a Dashboard Admin
- Enlaces a Tienda
- Enlaces a Estado del Sistema
- Enlaces a Mantenimiento

### Botón de Ayuda
- Flotante en esquina inferior derecha
- Abre modal de ayuda
- Se oculta en rutas especiales

## 📦 Componentes Principales

### Layout Components
- `Layout` - Wrapper con Header, Breadcrumbs, Modals
- `Header` - Navegación principal
- `Footer` - Pie de página con enlaces útiles
- `Breadcrumbs` - Migas de pan de navegación

### Page Components
- `Home` - Hero + Features + QuickLinks + Footer
- `Catalogo` - Listado de productos con filtros
- `ProductoDetalle` - Información detallada de producto
- `Contenido` - Infografías, videos y trivias
- `ContenidoDetalle` - Visualización de contenido
- `Feedback` - Formulario de retroalimentación
- `Estadisticas` - Métricas y estadísticas
- `Dashboard` - Panel administrativo
- `Tienda` - Sistema de ventas
- `NotFound` - Página 404

### Utility Components
- `ScrollToTop` - Auto-scroll en cambio de ruta
- `ProtectedRoute` - Wrapper para rutas protegidas
- `QuickLinks` - Enlaces rápidos visuales

## 🔧 Hooks Personalizados

### useAuth
```tsx
const { isAuthenticated, isLoading, login, logout } = useAuth({
  storageKey: 'dashboardAuth'
});
```

## 📚 Documentación Adicional

- `ESTRUCTURA_RUTAS.md` - Documentación completa del sistema de rutas
- `CAMBIOS_ROUTING.md` - Resumen de cambios implementados
- `guidelines/Guidelines.md` - Guías de desarrollo

## 🚦 Estado del Proyecto

- ✅ Estructura de rutas implementada
- ✅ Navegación completa funcional
- ✅ Sistema de autenticación básico
- ✅ Dashboard administrativo completo
- ✅ Sistema de tienda/cafetería completo
- ✅ Breadcrumbs y navegación mejorada
- ✅ Página 404 personalizada
- ✅ Scroll automático entre rutas

## 🎯 Próximas Mejoras

1. **Context API**: Implementar AuthContext global
2. **Lazy Loading**: Carga diferida de componentes
3. **Transiciones**: Animaciones entre rutas
4. **PWA**: Progressive Web App features
5. **Internacionalización**: Soporte multi-idioma
6. **Testing**: Unit tests y E2E tests
7. **Analytics**: Tracking de navegación
8. **Optimización**: Code splitting y performance

## 👥 Contribución

Este proyecto es parte del sistema SMARTFOOD para gestión de alimentación escolar saludable.

## 📄 Licencia

Todos los derechos reservados - SMARTFOOD

---

**Última actualización**: Diciembre 2025
**Versión**: 2.0.0 (Sistema de Rutas Implementado)
