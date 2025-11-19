# Guía de Configuración - AppSwUno Web

## Cambiar la URL del Backend

### Opción 1: Usando el servidor desplegado (Por defecto)

El archivo `src/config/AppConfig.js` ya está configurado para usar:
```
https://softwaredlv.duckdns.org
```

No necesitas hacer cambios.

### Opción 2: Desarrollo Local

Si tienes el backend corriendo localmente en el puerto 8000:

1. Abre `src/config/AppConfig.js`
2. Cambia el `baseUrl`:

```javascript
AppConfig.instance = new AppConfig({
  baseUrl: 'http://localhost:8000',
  useMock: false,
  connectTimeout: 30000,
});
```

### Opción 3: Otro servidor

Para apuntar a otro servidor:

```javascript
AppConfig.instance = new AppConfig({
  baseUrl: 'https://tu-servidor.com',
  useMock: false,
  connectTimeout: 30000,
});
```

## Configuración de CORS

Si tienes problemas de CORS al conectarte con el backend, asegúrate de que el servidor tenga configurado:

```python
# En FastAPI (ejemplo)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Permisos de Cámara y Micrófono

Para que la funcionalidad de grabación de video funcione:

1. El navegador debe tener permisos de cámara y micrófono
2. En desarrollo local (http://localhost), los navegadores modernos permiten acceso
3. En producción, **DEBES usar HTTPS** para acceder a cámara/micrófono

## Variables de Entorno (Opcional)

Puedes crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://softwaredlv.duckdns.org
VITE_API_TIMEOUT=30000
```

Y luego usar en `AppConfig.js`:

```javascript
AppConfig.instance = new AppConfig({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://softwaredlv.duckdns.org',
  useMock: false,
  connectTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
});
```

## Despliegue

### Netlify

1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel

1. Importa el proyecto
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Servidor propio

```bash
# Construir
npm run build

# Los archivos estarán en la carpeta dist/
# Sirve con cualquier servidor web estático (nginx, apache, etc.)
```

## Solución de Problemas

### Error: "Network Error" al hacer login

- Verifica que el backend esté corriendo
- Verifica que la URL en `AppConfig.js` sea correcta
- Revisa la consola del navegador para más detalles
- Verifica configuración de CORS en el backend

### Error: "Camera access denied"

- Permite permisos de cámara en el navegador
- En Chrome: Settings > Privacy and security > Site Settings > Camera
- Asegúrate de usar HTTPS en producción

### El video no se graba

- Verifica que los permisos estén otorgados
- Prueba en otro navegador
- Revisa la consola del navegador para errores

### Token expirado

- El token JWT tiene un tiempo de expiración
- Si expira, serás redirigido al login automáticamente
- Inicia sesión nuevamente

## Estructura de Respuestas del Backend

### Login exitoso
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "nombre": "Usuario",
    "email": "usuario@example.com"
  }
}
```

### Análisis de práctica
```json
{
  "calificacion_general": 8.5,
  "claridad": 8.0,
  "fluidez": 9.0,
  "vocabulario": 8.5,
  "confianza": 8.0,
  "fortalezas": ["Buena dicción", "Ritmo adecuado"],
  "areas_mejora": ["Usar más vocabulario técnico"]
}
```

## Personalización de Estilos

Los colores principales están en varios archivos CSS. Para cambiar el tema:

### Color primario (morado/violeta)
Busca `#667eea` y `#764ba2` en los archivos CSS y reemplázalos.

### Ejemplo de paleta alternativa

**Azul:**
- Primario: `#3b82f6`
- Secundario: `#1d4ed8`

**Verde:**
- Primario: `#10b981`
- Secundario: `#059669`

**Naranja:**
- Primario: `#f59e0b`
- Secundario: `#d97706`

## Contacto y Soporte

Para problemas o preguntas:
- Repositorio: https://github.com/aldaxho/movilAppSoftware2025
- Issues: https://github.com/aldaxho/movilAppSoftware2025/issues
