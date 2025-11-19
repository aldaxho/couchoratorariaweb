# AppSwUno Web - Información del Proyecto

## Resumen del Proyecto

Aplicación web desarrollada con React que permite a los usuarios mejorar sus habilidades de oratoria mediante:

- Práctica con grabación de video
- Análisis automático de desempeño
- Planes de entrenamiento personalizados
- Sistema de recompensas e insignias
- Seguimiento de progreso y estadísticas

## Stack Tecnológico

### Frontend
- **React 19.2.0** - Biblioteca de UI
- **React Router DOM 7.x** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vite 7.2.2** - Build tool y desarrollo

### Características Implementadas

#### 1. Sistema de Autenticación
- Login y registro de usuarios
- JWT para autenticación
- Persistencia de sesión con localStorage
- Rutas protegidas
- Interceptores HTTP para tokens

#### 2. Grabación de Práctica
- Acceso a cámara y micrófono del navegador
- Grabación de video WebM
- Previsualización antes de enviar
- Subida de video al servidor

#### 3. Análisis y Retroalimentación
- Visualización de calificación general
- Métricas detalladas (claridad, fluidez, vocabulario, confianza)
- Barras de progreso visuales
- Listas de fortalezas y áreas de mejora

#### 4. Historial de Prácticas
- Tarjetas con resumen de cada práctica
- Códigos de color según calificación
- Navegación a análisis completo
- Ordenamiento cronológico

#### 5. Plan de Entrenamiento
- Visualización de plan semanal
- Barra de progreso global
- Tarjetas de tareas por día
- Marcado de tareas completadas
- Estado visual de completitud

#### 6. Sistema de Recompensas
- Visualización de racha de días
- Galería de insignias
- Estado de insignias (obtenidas/bloqueadas)
- Requisitos para desbloquear

#### 7. Dashboard
- Estadísticas generales
- Tarjetas con métricas clave
- Progreso semanal
- Últimos logros obtenidos

## Componentes Reutilizables

- **Button** - Botón con variantes (primary, secondary, danger, success, outline)
- **Card** - Tarjeta de contenido con título opcional
- **Input** - Campo de entrada con label y manejo de errores
- **Loader** - Indicador de carga (normal y pantalla completa)
- **Navbar** - Barra de navegación con enlaces y logout
- **ProtectedRoute** - HOC para proteger rutas privadas

## Servicios Implementados

### AuthService
- `register(userData)` - Registro de usuario
- `login(credentials)` - Inicio de sesión
- `loginWithGoogle(token)` - Login con Google (preparado)
- `logout()` - Cerrar sesión
- `getCurrentUser()` - Obtener usuario actual
- `isAuthenticated()` - Verificar autenticación

### PracticaService
- `iniciarPractica(data)` - Crear nueva práctica
- `finalizarPractica(id, video)` - Finalizar y subir video
- `obtenerAnalisis(id)` - Obtener análisis de práctica
- `obtenerHistorial()` - Listar todas las prácticas
- `obtenerDetallePractica(id)` - Detalle de una práctica

### PlanService
- `obtenerPlanActual()` - Obtener plan semanal activo
- `completarTarea(tareaId)` - Marcar tarea como completada
- `obtenerResumen()` - Resumen de progreso

### RecompensaService
- `obtenerInsignias()` - Listar todas las insignias
- `obtenerRacha()` - Obtener racha actual y mejor racha
- `obtenerEstadisticas()` - Estadísticas generales del usuario

## Rutas de la Aplicación

- `/` - Redirige a `/dashboard`
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/dashboard` - Dashboard principal (protegida)
- `/practica` - Nueva práctica con grabación (protegida)
- `/analisis/:id` - Análisis de práctica específica (protegida)
- `/historial` - Historial completo de prácticas (protegida)
- `/plan` - Plan de entrenamiento semanal (protegida)
- `/recompensas` - Insignias y racha (protegida)

## Paleta de Colores

### Colores Principales
- Primario: `#667eea` (Violeta)
- Secundario: `#764ba2` (Morado)
- Éxito: `#10b981` (Verde)
- Peligro: `#ef4444` (Rojo)
- Advertencia: `#f59e0b` (Naranja)
- Info: `#3b82f6` (Azul)

### Grises
- Texto Principal: `#1f2937`
- Texto Secundario: `#6b7280`
- Bordes: `#d1d5db`
- Fondo: `#f9fafb`
- Fondo Claro: `#f3f4f6`

## Características de Diseño

### Diseño Limpio y Profesional
- Sin emojis excesivos (solo iconos contextuales)
- Espaciado consistente
- Jerarquía visual clara
- Tipografía legible

### Responsive
- Grid adaptativo
- Mobile-first approach
- Breakpoint principal: 768px
- Colapso de elementos en móvil

### Animaciones Sutiles
- Transiciones suaves (0.3s)
- Hover effects discretos
- Transform translateY en tarjetas
- Barras de progreso animadas

### Feedback Visual
- Estados de carga
- Mensajes de error claramente visibles
- Confirmaciones de acciones
- Colores según contexto

## Mejores Prácticas Implementadas

1. **Separación de responsabilidades** - Servicios, componentes, páginas separados
2. **Componentes reutilizables** - DRY principle
3. **Context API** - Estado global de autenticación
4. **Manejo centralizado de errores** - Interceptores de Axios
5. **Rutas protegidas** - HOC ProtectedRoute
6. **Token management** - Utility dedicada
7. **CSS modular** - Un archivo CSS por componente/página
8. **Código limpio** - Nombres descriptivos, funciones pequeñas

## Testing Recomendado

### Flujo de Usuario
1. Registro de nuevo usuario
2. Login con credenciales
3. Visualización de dashboard vacío
4. Creación de primera práctica
5. Grabación de video
6. Visualización de análisis
7. Revisión de historial
8. Seguimiento de plan
9. Verificación de recompensas

### Casos de Prueba
- Login con credenciales incorrectas
- Registro con email duplicado
- Acceso a rutas protegidas sin autenticación
- Grabación sin permisos de cámara
- Pérdida de conexión durante operación
- Token expirado

## Próximas Mejoras (Sugerencias)

1. Integración real con Google Sign-In
2. Edición de perfil de usuario
3. Cambio de contraseña
4. Recuperación de contraseña
5. Modo oscuro
6. Exportación de estadísticas (PDF/CSV)
7. Gráficas de progreso temporal
8. Comparación de prácticas
9. Compartir logros en redes sociales
10. Notificaciones push para recordatorios

## Scripts de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build producción
npm run build

# Preview producción
npm run preview

# Lint
npm run lint
```

## URLs de Acceso

- **Desarrollo:** http://localhost:5173 (o 5174 si el puerto está ocupado)
- **Producción:** (Configurar según hosting)

## Documentación Adicional

- `README_WEB.md` - Documentación principal
- `CONFIGURACION.md` - Guía de configuración y troubleshooting

## Estado del Proyecto

✅ Autenticación completa
✅ Grabación de video funcional
✅ Análisis y retroalimentación
✅ Historial de prácticas
✅ Plan de entrenamiento
✅ Sistema de recompensas
✅ Dashboard con estadísticas
✅ Diseño responsive
✅ Manejo de errores
✅ Rutas protegidas

## Notas Finales

- Todos los archivos están creados y organizados
- El servidor de desarrollo está corriendo
- La aplicación está lista para conectarse al backend
- El diseño es limpio, profesional y sin emojis sobresalientes
- Todos los componentes son reutilizables
- El código está bien estructurado y documentado

**Aplicación lista para usar y probar!**

Accede a: http://localhost:5174
