# Guía de Proyectos Separados - SmartFood

Este documento explica cómo trabajar con los tres proyectos separados de SmartFood.

## Estructura de Proyectos

La aplicación SmartFood ahora está dividida en tres proyectos independientes:

### 1. **Smartfood_Client** (Puerto 5173)
El sitio principal para usuarios finales.

**Características:**
- Catálogo de productos
- Contenido educativo
- Sistema de feedback
- Estadísticas públicas

**Ubicación:** `smartfood/Smartfood_Client/`

**Ejecutar:**
```bash
cd Smartfood_Client
npm install
npm run dev
```

**URL:** http://localhost:5173

---

### 2. **Smartfood_Dashboard** (Puerto 5174)
Panel de administración para gestionar el sistema.

**Características:**
- Gestión de inventario
- Gestión de catálogo
- Gestión de productos
- Gestión de cuentas de administradores

**Ubicación:** `smartfood/Smartfood_Dashboard/`

**Ejecutar:**
```bash
cd Smartfood_Dashboard
npm install
npm run dev
```

**URL:** http://localhost:5174

---

### 3. **Smartfood_Shop** (Puerto 5175)
Sistema de tienda para el personal de ventas.

**Características:**
- Gestión de inventario de tienda
- Gestión de productos
- Registro de ventas

**Ubicación:** `smartfood/Smartfood_Shop/`

**Ejecutar:**
```bash
cd Smartfood_Shop
npm install
npm run dev
```

**URL:** http://localhost:5175

---

## Configuración de la API

Cada proyecto tiene su propio archivo de configuración de API en `src/config/api.ts`.

Por defecto, todos apuntan a: `http://localhost:8000/api`

Para cambiar la URL de la API, puedes:

1. **Modificar el archivo directamente:**
   ```typescript
   export const API_BASE_URL = 'https://tu-api.com/api';
   ```

2. **Usar variables de entorno:**
   Crea un archivo `.env` en la raíz de cada proyecto:
   ```
   VITE_API_URL=https://tu-api.com/api
   ```

---

## Ejecutar Todos los Proyectos Simultáneamente

### Opción 1: Manualmente en terminales separadas
```bash
# Terminal 1
cd Smartfood_Client
npm run dev

# Terminal 2
cd Smartfood_Dashboard
npm run dev

# Terminal 3
cd Smartfood_Shop
npm run dev
```

### Opción 2: Script PowerShell (Windows)
Crea un archivo `start-all.ps1`:
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Smartfood_Client; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Smartfood_Dashboard; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Smartfood_Shop; npm run dev"
```

Ejecutar:
```bash
.\start-all.ps1
```

---

## Construcción para Producción

Cada proyecto se construye de forma independiente:

```bash
# Cliente Principal
cd Smartfood_Client
npm run build

# Dashboard
cd Smartfood_Dashboard
npm run build

# Shop
cd Smartfood_Shop
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/` de cada proyecto.

---

## Despliegue en Servidores Separados

Cada proyecto puede desplegarse en diferentes servidores o dominios:

- **Cliente:** `https://smartfood.com`
- **Dashboard:** `https://admin.smartfood.com`
- **Shop:** `https://shop.smartfood.com`

### Configuración de NGINX (Ejemplo)

```nginx
# Cliente Principal
server {
    listen 80;
    server_name smartfood.com;
    root /var/www/smartfood-client/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Dashboard
server {
    listen 80;
    server_name admin.smartfood.com;
    root /var/www/smartfood-dashboard/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Shop
server {
    listen 80;
    server_name shop.smartfood.com;
    root /var/www/smartfood-shop/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Ventajas de la Separación

1. **Escalabilidad:** Cada aplicación puede escalar independientemente
2. **Mantenimiento:** Más fácil mantener y actualizar cada parte
3. **Seguridad:** Mejor aislamiento entre sistemas
4. **Despliegue:** Despliegues independientes sin afectar otros servicios
5. **Rendimiento:** Optimización específica por aplicación

---

## Notas Importantes

- Los proyectos **NO** comparten dependencias, cada uno tiene su propio `package.json`
- Los cambios en componentes compartidos deben replicarse manualmente
- Asegúrate de tener la API backend corriendo para funcionalidad completa
- Las credenciales de autenticación están separadas entre proyectos (diferentes localStorage keys)

---

## Solución de Problemas

### Puerto ya en uso
Si recibes un error de puerto en uso, cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 5176, // Cambia a un puerto disponible
  host: true
}
```

### Error de dependencias
Ejecuta en cada proyecto:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de compilación TypeScript
Verifica que todas las importaciones estén correctas y que los tipos estén definidos.

---

Para más información, consulta el README.md de cada proyecto individual.
