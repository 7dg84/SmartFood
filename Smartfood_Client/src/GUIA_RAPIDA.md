# 🚀 Guía Rápida - SMARTFOOD

Referencia rápida para trabajar con el sistema de rutas de SMARTFOOD.

## 📌 Navegación Básica

### 1. Crear un Link
```tsx
import { Link } from 'react-router-dom';

// Link simple
<Link to="/catalogo">Ir al Catálogo</Link>

// Link con parámetro
<Link to={`/catalogo/${productId}`}>Ver Producto</Link>

// Link con estilos condicionales
<Link 
  to="/catalogo"
  className="text-blue-600 hover:underline"
>
  Catálogo
</Link>
```

### 2. Navegar Programáticamente
```tsx
import { useNavigate } from 'react-router-dom';

function MyButton() {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate('/catalogo')}>
      Ir al Catálogo
    </button>
  );
}
```

### 3. Navegar con Datos
```tsx
// Ir atrás
navigate(-1);

// Ir adelante
navigate(1);

// Reemplazar en historial (no se puede volver)
navigate('/catalogo', { replace: true });

// Pasar estado
navigate('/producto', { state: { from: 'search' } });
```

## 🎯 Rutas Disponibles

### Públicas
```tsx
/                           // Home
/catalogo                   // Catálogo
/catalogo/:id              // Detalle producto
/contenido                 // Contenido
/contenido/:tipo/:id       // Detalle contenido
/feedback                  // Feedback
/estadisticas              // Estadísticas
```

### Protegidas
```tsx
/dashboard                 // Dashboard (requiere login)
/tienda                    // Tienda (requiere login)
```

### Sistema
```tsx
/estado                    // Estado del sistema
/mantenimiento            // Mantenimiento
```

## 🔧 Hooks Útiles

### useNavigate
```tsx
const navigate = useNavigate();
navigate('/catalogo');
```

### useParams
```tsx
const { id } = useParams();
// URL: /catalogo/123 → id = "123"
```

### useLocation
```tsx
const location = useLocation();
console.log(location.pathname);  // "/catalogo"
console.log(location.search);    // "?filter=fruit"
console.log(location.state);     // { from: 'home' }
```

### useSearchParams
```tsx
const [searchParams, setSearchParams] = useSearchParams();

// Leer: ?filter=fruit
const filter = searchParams.get('filter');

// Escribir
setSearchParams({ filter: 'vegetables' });
```

## 🏗️ Crear Nueva Página

### 1. Crear el archivo de página
```tsx
// /pages/MiNuevaPagina.tsx
export function MiNuevaPagina() {
  return (
    <div>
      <h1>Mi Nueva Página</h1>
    </div>
  );
}
```

### 2. Exportar en index.ts
```tsx
// /pages/index.ts
export { MiNuevaPagina } from './MiNuevaPagina';
```

### 3. Agregar ruta en App.tsx
```tsx
// /App.tsx
import { MiNuevaPagina } from './pages';

<Route path="/mi-nueva-pagina" element={<Layout><MiNuevaPagina /></Layout>} />
```

### 4. Agregar a config/routes.ts
```tsx
// /config/routes.ts
export const ROUTES = {
  // ...
  MI_NUEVA_PAGINA: '/mi-nueva-pagina',
};
```

## 🔐 Crear Ruta Protegida

### Opción 1: Lógica en la Página
```tsx
// /pages/MiPaginaProtegida.tsx
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from './LoginPage';

export function MiPaginaProtegida() {
  const { isAuthenticated } = useAuth({ storageKey: 'myAuth' });
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  return <div>Contenido protegido</div>;
}
```

### Opción 2: Usar ProtectedRoute
```tsx
// /App.tsx
import { ProtectedRoute } from './components/ProtectedRoute';

<Route 
  path="/admin" 
  element={
    <ProtectedRoute isAuthenticated={isAuth}>
      <AdminPage />
    </ProtectedRoute>
  }
/>
```

## 🎨 Breadcrumbs Personalizados

Los breadcrumbs se generan automáticamente, pero puedes personalizarlos:

```tsx
// /components/Breadcrumbs.tsx
const segmentLabels: Record<string, string> = {
  'catalogo': 'Catálogo',
  'mi-pagina': 'Mi Página Personalizada', // Agregar aquí
};
```

## 📱 Navegación Condicional

### Verificar ruta actual
```tsx
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  if (location.pathname === '/catalogo') {
    // Estamos en catálogo
  }
  
  if (location.pathname.startsWith('/contenido')) {
    // Estamos en cualquier ruta de contenido
  }
}
```

### NavLink con estado activo
```tsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/catalogo"
  className={({ isActive }) => 
    isActive ? 'text-green-600' : 'text-gray-600'
  }
>
  Catálogo
</NavLink>
```

## 🔄 Redirecciones

### Redirect simple
```tsx
import { Navigate } from 'react-router-dom';

function OldPage() {
  return <Navigate to="/nueva-ruta" replace />;
}
```

### Redirect condicional
```tsx
function CheckAuth() {
  const isLoggedIn = localStorage.getItem('auth');
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return <Dashboard />;
}
```

## 🎯 Configuración de Rutas

### Usar constantes
```tsx
// En lugar de:
navigate('/catalogo/123');

// Usa:
import { ROUTES } from './config/routes';
navigate(ROUTES.PRODUCTO_DETALLE(123));
```

### Beneficios:
- ✅ Autocomplete
- ✅ Type-safety
- ✅ Refactoring fácil
- ✅ Evita typos

## 🚨 Manejo de Errores

### Página 404
```tsx
// Ya implementada en /pages/NotFound.tsx
<Route path="*" element={<NotFound />} />
```

### Error Boundary (futuro)
```tsx
<Route 
  path="/mi-ruta" 
  element={<MiComponente />}
  errorElement={<ErrorPage />}
/>
```

## 💡 Tips y Trucos

### 1. Scroll al top en cambio de ruta
Ya implementado con `<ScrollToTop />` en App.tsx

### 2. Mantener estado de scroll
```tsx
<Link to="/catalogo" state={{ scrollY: window.scrollY }}>
  Ver Catálogo
</Link>

// En la otra página:
const location = useLocation();
const scrollY = location.state?.scrollY;
```

### 3. Confirmación antes de salir
```tsx
import { useBlocker } from 'react-router-dom';

function FormPage() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  useBlocker(() => {
    if (hasUnsavedChanges) {
      return !confirm('¿Salir sin guardar?');
    }
    return false;
  });
}
```

### 4. Prefetch de datos
```tsx
import { Link, useNavigate } from 'react-router-dom';

<Link
  to="/producto/123"
  onMouseEnter={() => prefetchProductData(123)}
>
  Ver Producto
</Link>
```

### 5. Query params en Link
```tsx
<Link to={`/catalogo?filter=fruit&sort=price`}>
  Ver Frutas
</Link>

// O mejor:
<Link to={{
  pathname: '/catalogo',
  search: '?filter=fruit&sort=price'
}}>
  Ver Frutas
</Link>
```

## 📦 Componentes Comunes

### Botón con navegación
```tsx
function NavButton({ to, children }: { to: string; children: React.ReactNode }) {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}
```

### Card con link
```tsx
function ProductCard({ id, name }: { id: number; name: string }) {
  return (
    <Link to={`/catalogo/${id}`} className="block hover:shadow-lg">
      <div className="p-4 border rounded">
        <h3>{name}</h3>
      </div>
    </Link>
  );
}
```

## 🔍 Debugging

### Mostrar ruta actual
```tsx
import { useLocation } from 'react-router-dom';

function DebugRouter() {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 bg-black text-white p-2 text-xs">
      {location.pathname}
    </div>
  );
}
```

### Log de navegación
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NavigationLogger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Navegado a:', location.pathname);
  }, [location]);
  
  return null;
}

// Agregar en App.tsx:
<NavigationLogger />
```

## 📚 Recursos

- [React Router Docs](https://reactrouter.com)
- `ESTRUCTURA_RUTAS.md` - Documentación completa
- `CAMBIOS_ROUTING.md` - Resumen de cambios
- `/config/routes.ts` - Configuración de rutas

---

**¿Necesitas ayuda?** Consulta la documentación completa en `ESTRUCTURA_RUTAS.md`
