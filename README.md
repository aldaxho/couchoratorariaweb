# AppSwUno Web - Aplicación de Práctica Oral

Aplicación web React para mejorar habilidades de oratoria mediante práctica guiada, análisis de desempeño y seguimiento de progreso.

## Características Principales

### Autenticación
- Registro e inicio de sesión con JWT
- Gestión segura de tokens
- Rutas protegidas

### Práctica Oral
- Grabación de video desde el navegador
- Análisis automático de desempeño
- Historial detallado de prácticas
- Retroalimentación personalizada

### Planes de Entrenamiento
- Planes semanales personalizados
- Seguimiento de tareas diarias
- Progreso visual
- Resumen de avances

### Sistema de Recompensas
- Insignias por logros
- Racha de días consecutivos
- Estadísticas de desempeño

## Tecnologías

- **React 19** - Framework principal
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP para API REST
- **Vite** - Build tool y dev server

## Estructura del Proyecto

```
src/
├── config/
│   ├── AppConfig.js         # Configuración de la aplicación
│   └── ApiClient.js         # Cliente HTTP con interceptores
├── context/
│   └── AuthContext.jsx      # Contexto de autenticación
├── services/
│   ├── authService.js       # Servicio de autenticación
│   ├── practicaService.js   # Servicio de prácticas
│   ├── planService.js       # Servicio de planes
│   └── recompensaService.js # Servicio de recompensas
├── pages/
│   ├── LoginPage.jsx        # Página de login
│   ├── RegisterPage.jsx     # Página de registro
│   ├── DashboardPage.jsx    # Dashboard principal
│   ├── PracticaPage.jsx     # Grabación de práctica
│   ├── AnalisisPage.jsx     # Análisis de práctica
│   ├── HistorialPage.jsx    # Historial de prácticas
│   ├── PlanPage.jsx         # Plan de entrenamiento
│   └── RecompensasPage.jsx  # Recompensas e insignias
├── components/
│   ├── Button.jsx           # Componente de botón
│   ├── Card.jsx             # Componente de tarjeta
│   ├── Input.jsx            # Componente de input
│   ├── Loader.jsx           # Indicador de carga
│   ├── Navbar.jsx           # Barra de navegación
│   └── ProtectedRoute.jsx   # Protección de rutas
└── utils/
    └── tokenManager.js      # Gestión de tokens JWT
```

## Configuración de API

### Endpoints Disponibles

#### Producción (Desplegado)
```
https://softwaredlv.duckdns.org
```

#### Desarrollo Local
```
http://localhost:8000
```

### Cambiar Configuración

Edita el archivo `src/config/AppConfig.js`:

```javascript
// Para usar el servidor desplegado (por defecto)
AppConfig.instance = new AppConfig({
  baseUrl: 'https://softwaredlv.duckdns.org',
  useMock: false,
  connectTimeout: 30000,
});

// Para desarrollo local
AppConfig.instance = new AppConfig({
  baseUrl: 'http://localhost:8000',
  useMock: false,
  connectTimeout: 30000,
});
```

## Instalación y Ejecución

### Prerrequisitos
- Node.js 16 o superior
- npm o yarn

### Pasos

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar el endpoint de la API**

Edita `src/config/AppConfig.js` y configura la URL del backend (por defecto usa producción)

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

4. **Construir para producción**
```bash
npm run build
```

5. **Previsualizar build de producción**
```bash
npm run preview
```

## Uso de la Aplicación

### 1. Registro e Inicio de Sesión
- Crea una cuenta con email y contraseña
- Inicia sesión para acceder al dashboard

### 2. Dashboard Principal
- Visualiza tu racha de días
- Ve tus insignias obtenidas
- Revisa estadísticas de desempeño
- Accede a todas las funcionalidades

### 3. Realizar una Práctica
- Ve a "Práctica"
- Permite acceso a cámara y micrófono
- Graba tu video de oratoria
- Finaliza y recibe análisis automático

### 4. Seguir tu Plan
- Ve a "Plan de Entrenamiento"
- Revisa tareas diarias
- Marca tareas como completadas
- Visualiza tu progreso semanal

### 5. Ver Recompensas
- Consulta todas tus insignias
- Verifica tu racha de días
- Desbloquea nuevos logros

## Documentación de API

### Base URL
```
https://softwaredlv.duckdns.org
```

### Autenticación

Todos los endpoints (excepto `/auth/registrar` y `/auth/login`) requieren autenticación JWT mediante el header:
```
Authorization: Bearer <token>
```

---

### Endpoints

## Autenticación

### 1. Registrar Usuario
```http
POST /auth/registrar
```

**Parámetros de entrada:**
```json
{
  "nombre": "string",
  "email": "string",
  "password": "string"
}
```

**Respuesta:**
```json
{
  "token": "string",
  "user": {
    "id": "integer",
    "nombre": "string",
    "email": "string"
  }
}
```

---

### 2. Iniciar Sesión
```http
POST /auth/login
```

**Parámetros de entrada:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Respuesta:**
```json
{
  "token": "string",
  "user": {
    "id": "integer",
    "nombre": "string",
    "email": "string"
  }
}
```

---

## Práctica Oral

### 3. Iniciar Práctica
```http
POST /practicas/iniciar
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Parámetros de entrada:**
```json
{
  "titulo": "string",
  "fecha": "string (ISO 8601)"
}
```

**Respuesta:**
```json
{
  "practica_id": "integer"
}
```

---

### 4. Finalizar Práctica
```http
POST /practicas/finalizar
```

**Headers requeridos:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Parámetros de entrada (FormData):**
- `practica_id`: integer
- `video`: File (opcional)

**Respuesta:**
```json
{
  "id": "integer",
  "mensaje": "string"
}
```

---

### 5. Obtener Análisis de Práctica
```http
GET /practicas/analisis/{practicaId}
```

**Parámetros de URL:**
- `practicaId` (integer): ID de la práctica

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "calificacion_general": "float",
  "claridad": "float",
  "fluidez": "float",
  "vocabulario": "float",
  "confianza": "float",
  "fortalezas": ["string"],
  "areas_mejora": ["string"]
}
```

---

### 6. Obtener Historial de Prácticas
```http
GET /practicas/historial
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
[
  {
    "id": "integer",
    "titulo": "string",
    "fecha": "string (ISO 8601)",
    "duracion": "integer",
    "calificacion_general": "float",
    "claridad": "float",
    "fluidez": "float"
  }
]
```

---

### 7. Obtener Práctica Específica
```http
GET /practicas/{practicaId}
```

**Parámetros de URL:**
- `practicaId` (integer): ID de la práctica

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "id": "integer",
  "titulo": "string",
  "fecha": "string (ISO 8601)",
  "duracion": "integer",
  "calificacion_general": "float",
  "claridad": "float",
  "fluidez": "float",
  "vocabulario": "float",
  "confianza": "float"
}
```

---

## Planes de Entrenamiento

### 8. Obtener Plan Actual
```http
GET /planes/actual
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "id": "integer",
  "titulo": "string",
  "semana": "integer",
  "descripcion": "string",
  "tareas": [
    {
      "id": "integer",
      "dia": "integer (1-7)",
      "titulo": "string",
      "descripcion": "string",
      "duracion_estimada": "integer",
      "completada": "boolean"
    }
  ]
}
```

---

### 9. Completar Tarea del Plan
```http
POST /planes/completar-tarea
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Parámetros de entrada:**
```json
{
  "tarea_id": "integer"
}
```

**Respuesta:**
```json
{
  "mensaje": "string"
}
```

---

### 10. Obtener Resumen de Progreso
```http
GET /planes/resumen
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "total_practicas": "integer",
  "practicas_semana": "integer",
  "tareas_completadas": "integer",
  "promedio_calificacion": "float"
}
```

---

## Recompensas e Insignias

### 11. Obtener Insignias
```http
GET /recompensas/insignias
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
[
  {
    "id": "integer",
    "nombre": "string",
    "descripcion": "string",
    "icono": "string",
    "requisito": "string",
    "obtenida": "boolean",
    "fecha_obtencion": "string (ISO 8601)"
  }
]
```

---

### 12. Obtener Racha de Días
```http
GET /recompensas/racha
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "dias_consecutivos": "integer",
  "mejor_racha": "integer",
  "fecha_inicio": "string (ISO 8601)",
  "fecha_ultima_practica": "string (ISO 8601)"
}
```

---

### 13. Obtener Estadísticas
```http
GET /recompensas/estadisticas
```

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "total_practicas": "integer",
  "practicas_semana": "integer",
  "insignias_obtenidas": "integer",
  "promedio_calificacion": "float",
  "tiempo_total": "integer",
  "tareas_completadas": "integer",
  "ultimas_insignias": [
    {
      "nombre": "string",
      "descripcion": "string",
      "icono": "string"
    }
  ]
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 201 | Recurso creado |
| 400 | Solicitud incorrecta |
| 401 | No autorizado (token inválido o ausente) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

**Formato de respuesta de error:**
```json
{
  "message": "Mensaje de error descriptivo"
}
```

## Características de Diseño

- Diseño responsive adaptado a móviles y escritorio
- Interfaz limpia y profesional
- Paleta de colores: Azul marino, negro y blanco
- Animaciones suaves
- Feedback visual claro
- Tipografía legible y jerarquía clara

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza build de producción
- `npm run lint` - Ejecuta linter

## Navegadores Soportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notas Técnicas

- La aplicación usa `localStorage` para persistir el token JWT y datos de usuario
- Los tokens son agregados automáticamente a todas las peticiones HTTP mediante interceptores
- Las rutas están protegidas y redirigen al login si no hay autenticación
- La cámara y micrófono requieren permisos del navegador
- Los videos se graban en formato WebM

## Documentación Adicional

- `CONFIGURACION.md` - Guía de configuración y troubleshooting
- `PROYECTO_INFO.md` - Información detallada del proyecto

## Licencia

Proyecto educativo - Software 2025

## Soporte

Para problemas o preguntas:
- Repositorio: https://github.com/aldaxho/movilAppSoftware2025
- Issues: https://github.com/aldaxho/movilAppSoftware2025/issues

---

**Nota:** Asegúrate de tener el backend ejecutándose en `https://softwaredlv.duckdns.org` o configura la URL apropiada en `src/config/AppConfig.js`.
