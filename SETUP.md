# AppSwUno Web - Guía de Configuración

## Características Implementadas ✅

### 1. Autenticación con Google OAuth
- Integración completa con `@react-oauth/google`
- Botón de inicio de sesión con Google en LoginPage
- Soporte para One Tap

**Configuración requerida:**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
```

Para obtener el Client ID:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita Google OAuth 2.0
4. Crea credenciales OAuth 2.0
5. Copia el Client ID

### 2. Supabase Storage para Videos
- Cliente de Supabase configurado
- Servicio de almacenamiento para subir/descargar videos
- Integración con PracticaPage

**Configuración requerida:**
```bash
# Agregar al archivo .env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

Para configurar Supabase:
1. Ve a [Supabase](https://supabase.com/)
2. Crea un nuevo proyecto
3. Ve a Settings > API
4. Copia la URL y la anon/public key
5. Crea un bucket llamado `practice-videos` en Storage
6. Configura las políticas de acceso según tus necesidades

### 3. Selector de Archivos de Video
- File picker integrado en PracticaPage
- Soporte para grabar O subir videos existentes
- Validación de tipo y tamaño de archivo (máx 500MB)
- Barra de progreso durante la carga

### 4. Gráficos con Chart.js
- Componente `ProgressChart` para gráficos de líneas
- Componente `StreakChart` para gráficos de barras
- Integrado en Dashboard y Plan
- Visualización de progreso semanal y evolución de puntuaciones

### 5. Pestañas en Plan de Entrenamiento
- Tab "Plan Actual": muestra tareas de la semana
- Tab "Historial": muestra planes anteriores
- Tab "Progreso": gráficos de evolución

### 6. Transcripciones en Análisis
- Muestra la transcripción del video si está disponible
- Diseño scrollable con estilo de código
- Se integra automáticamente cuando el backend retorna el campo `transcripcion`

### 7. Funcionalidad de Compartir
- Servicio `ShareService` con Web Share API
- Fallback a copiar al portapapeles
- Botones para compartir:
  - Resultados de análisis
  - Racha de días
  - Insignias/logros

### 8. Visualización de Estadísticas Mejorada
- Gráficos de tendencias en Dashboard
- Gráfico de prácticas por día de la semana
- Evolución de puntuaciones
- Estadísticas visuales en todas las páginas

## Dependencias Instaladas

```json
{
  "@react-oauth/google": "^0.12.1",
  "@supabase/supabase-js": "^2.x.x",
  "react-chartjs-2": "^5.x.x",
  "chart.js": "^4.x.x"
}
```

## Instrucciones de Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y configura tus credenciales:
```bash
cp .env.example .env
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

### 4. Compilar para producción
```bash
npm run build
```

## Notas Importantes

- **Google OAuth**: Si no configuras las credenciales, el botón de Google aparecerá pero no funcionará
- **Supabase**: La app funcionará sin Supabase, pero los videos no se guardarán en almacenamiento externo
- **Web Share API**: Solo funciona en navegadores compatibles (principalmente móviles). En desktop, copia al portapapeles
- **Gráficos**: Actualmente usan datos de ejemplo. Actualiza las funciones para usar datos reales del backend

## Próximos Pasos Recomendados

1. Conectar gráficos con datos reales del backend
2. Implementar historial de planes desde el backend
3. Agregar más tipos de gráficos (radar, donut, etc.)
4. Implementar notificaciones push
5. Agregar modo oscuro
6. Optimizar carga de videos grandes

## Soporte

Si encuentras algún problema, verifica:
- Variables de entorno configuradas correctamente
- Backend está corriendo y accesible
- Permisos de cámara/micrófono para grabación
- Políticas de Supabase Storage configuradas

---

**Última actualización**: 20 de noviembre de 2025
