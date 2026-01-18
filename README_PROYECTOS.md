# SmartFood - Arquitectura de Proyectos Separados

## 📁 Estructura General

```
smartfood/
├── Smartfood_Client/       # Aplicación principal (Puerto 5173)
├── Smartfood_Dashboard/    # Panel de administración (Puerto 5174)
├── Smartfood_Shop/         # Sistema de tienda (Puerto 5175)
├── API/                    # Backend Django
├── start-all.ps1          # Script para iniciar todos los proyectos
└── GUIA_PROYECTOS_SEPARADOS.md
```

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```powershell
.\start-all.ps1
```

### Opción 2: Manual
```bash
# Terminal 1 - Cliente
cd Smartfood_Client
npm run dev

# Terminal 2 - Dashboard
cd Smartfood_Dashboard
npm run dev

# Terminal 3 - Shop
cd Smartfood_Shop
npm run dev
```

## 🌐 URLs de Desarrollo

- **Cliente Principal:** http://localhost:5173
- **Dashboard Admin:** http://localhost:5174
- **Shop:** http://localhost:5175
- **API Backend:** http://localhost:8000

## 📦 Proyectos

### 1️⃣ Smartfood_Client (Cliente Principal)
**Propósito:** Aplicación web pública para usuarios finales

**Funcionalidades:**
- ✅ Catálogo de productos
- ✅ Contenido educativo (artículos, videos, infografías)
- ✅ Sistema de feedback y calificaciones
- ✅ Estadísticas públicas
- ✅ Autenticación de usuarios

**Stack:**
- React + TypeScript
- React Router
- Tailwind CSS
- Axios
- React Hot Toast

---

### 2️⃣ Smartfood_Dashboard (Panel Admin)
**Propósito:** Sistema de administración completo

**Funcionalidades:**
- ✅ Gestión de inventario con gráficas
- ✅ Gestión de catálogo de alimentos
- ✅ Gestión de productos
- ✅ Gestión de cuentas (administradores y personal)
- ✅ Dashboard con métricas en tiempo real

**Stack:**
- React + TypeScript
- React Router
- Tailwind CSS
- Recharts (gráficas)
- Axios

---

### 3️⃣ Smartfood_Shop (Sistema de Tienda)
**Propósito:** Herramienta para personal de tienda

**Funcionalidades:**
- ✅ Gestión de inventario de tienda
- ✅ Gestión de productos
- ✅ Registro de ventas
- ✅ Autenticación separada

**Stack:**
- React + TypeScript
- React Router
- Tailwind CSS
- Axios

## 🔧 Instalación Inicial

En cada proyecto (Client, Dashboard, Shop):

```bash
cd [proyecto]
npm install
```

## 🏗️ Construcción para Producción

```bash
# Cliente
cd Smartfood_Client && npm run build

# Dashboard
cd Smartfood_Dashboard && npm run build

# Shop
cd Smartfood_Shop && npm run build
```

## 🔐 Autenticación

Cada proyecto maneja su propia autenticación de forma independiente:

- **Cliente:** `localStorage.token`, `localStorage.username`
- **Dashboard:** `localStorage.dashboardToken`, `localStorage.dashboardUsername`
- **Shop:** `localStorage.shopToken`, `localStorage.shopUsername`

## 📝 Notas Importantes

1. **Independencia total:** Cada proyecto es completamente independiente y puede ejecutarse por separado
2. **Compartir componentes:** Si necesitas compartir código, considera crear una biblioteca compartida
3. **API común:** Todos los proyectos se conectan al mismo backend Django
4. **Configuración:** Cada proyecto tiene su propio `vite.config.ts` y `package.json`

## 🐛 Solución de Problemas

### Error: Puerto en uso
Si algún puerto está ocupado, edita `vite.config.ts` en el proyecto correspondiente:
```typescript
server: {
  port: 5176, // Cambia al puerto deseado
  host: true
}
```

### Error: Módulos no encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentación Adicional

- [Guía Completa de Proyectos](./GUIA_PROYECTOS_SEPARADOS.md)
- README individual de cada proyecto

## 🎯 Ventajas de esta Arquitectura

✨ **Escalabilidad:** Cada aplicación escala independientemente  
✨ **Mantenimiento:** Cambios aislados sin afectar otros sistemas  
✨ **Seguridad:** Mejor separación de responsabilidades  
✨ **Despliegue:** Deploy independiente de cada servicio  
✨ **Desarrollo:** Equipos pueden trabajar en paralelo  

---

**Última actualización:** Enero 2026
