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

El backend por defecto está configurado en:
```
https://softwaredlv.duckdns.org
```

Para cambiar la configuración, edita `src/config/AppConfig.js`:

```javascript
// Producción
AppConfig.instance = new AppConfig({
  baseUrl: 'https://softwaredlv.duckdns.org',
  useMock: false,
  connectTimeout: 30000,
});

// Desarrollo local
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

2. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

3. **Construir para producción**
```bash
npm run build
```

4. **Previsualizar build de producción**
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

## API Endpoints

La aplicación se conecta a los siguientes endpoints:

- **Autenticación:** `/auth/register`, `/auth/login`
- **Prácticas:** `/practicas/iniciar`, `/practicas/finalizar`, `/practicas/analisis/:id`, `/practicas/historial`
- **Planes:** `/planes/actual`, `/planes/completar-tarea`, `/planes/resumen`
- **Recompensas:** `/recompensas/insignias`, `/recompensas/racha`, `/recompensas/estadisticas`

## Características de Diseño

- Diseño responsive adaptado a móviles y escritorio
- Interfaz limpia y profesional
- Gradientes modernos y sutiles
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

## Licencia

Proyecto educativo - Software 2025

## Autor

Desarrollado como proyecto académico
