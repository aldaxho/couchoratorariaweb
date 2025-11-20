# 📹 Flujo de Subida de Video - AppSwUno Web

## 🎯 Flujo Correcto (Alineado con Flutter)

### Paso a Paso

```
Usuario graba/selecciona video
         ↓
1️⃣ POST /practica/iniciar
   ← { idSesion: "abc123" }
         ↓
2️⃣ Subir video a Supabase Storage
   - Bucket: "videos"
   - Path: "{userId}/video_{timestamp}.webm"
   - Ejemplo: "14/video_1732145678123.webm"
         ↓
3️⃣ Obtener URL pública de Supabase
   ← "https://udmxynklzvmfrzhdmocp.supabase.co/storage/v1/object/public/videos/14/video_1732145678123.webm"
         ↓
4️⃣ POST /practica/finalizar
   Body: {
     idSesion: "abc123",
     urlArchivo: "https://..."
   }
         ↓
5️⃣ Backend descarga video desde URL
   Backend analiza con IA
         ↓
6️⃣ Backend responde con análisis
   ← {
       idPractica: 123,
       analisis: { ... }
     }
         ↓
7️⃣ Navegar a /analisis/123
```

## 🔧 Configuración Requerida

### 1. Crear Bucket en Supabase

Ejecuta el script (solo una vez):
```bash
node create-videos-bucket.js
```

O manualmente en Supabase Dashboard:
1. Ve a Storage → Create bucket
2. Nombre: `videos`
3. ✅ Marcar como "Public bucket"
4. Click "Create bucket"

### 2. Configurar Políticas RLS

En Supabase Dashboard → Storage → videos → Policies:

**Política 1 - Permitir subida:**
```sql
CREATE POLICY "Allow anon uploads"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'videos');
```

**Política 2 - Permitir lectura:**
```sql
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'videos');
```

### 3. Variables de Entorno (.env)

```env
VITE_SUPABASE_URL=https://udmxynklzvmfrzhdmocp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📂 Estructura de Archivos en Supabase

```
videos/
├── 14/
│   ├── video_1732145678123.webm
│   ├── video_1732145680456.webm
│   └── video_1732145682789.webm
├── 15/
│   └── video_1732145685012.webm
└── 16/
    └── video_1732145687234.webm
```

Cada usuario tiene su carpeta (userId) con sus videos.

## 💻 Código Implementado

### PracticaPage.jsx
```javascript
import { StorageService } from '../services/storageService';

const handleFinalizarPractica = async () => {
  // 1. Preparar video
  const videoFile = videoSource === 'uploaded' 
    ? uploadedVideo 
    : new File([recordedVideo], `practica-${Date.now()}.webm`, { type: 'video/webm' });

  // 2. Subir a Supabase
  const { url: videoUrl } = await StorageService.uploadVideo(videoFile, user.id);
  
  // 3. Enviar URL al backend
  const response = await PracticaService.finalizarPractica(idSesion, videoUrl);
  
  // 4. Navegar a análisis
  navigate(`/analisis/${response.idPractica}`);
};
```

### practicaService.js
```javascript
async finalizarPractica(idSesion, urlArchivo) {
  const response = await apiClient.post('/practica/finalizar', {
    idSesion,
    urlArchivo  // ← URL de Supabase, NO el archivo
  });
  return response.data;
}
```

### storageService.js
```javascript
async uploadVideo(file, userId) {
  const fileName = `video_${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Subir archivo
  await supabase.storage
    .from('videos')
    .upload(filePath, file);

  // Obtener URL pública
  const { data } = supabase.storage
    .from('videos')
    .getPublicUrl(filePath);

  return { url: data.publicUrl, path: filePath };
}
```

## ✅ Diferencia con Flutter

| Aspecto | Flutter Mobile | Web React |
|---------|---------------|-----------|
| **Bucket** | `videos` | `videos` ✅ |
| **Path** | `{userId}/video_{timestamp}.mp4` | `{userId}/video_{timestamp}.webm` ✅ |
| **Upload** | Supabase SDK | Supabase SDK ✅ |
| **Backend** | Recibe URL | Recibe URL ✅ |

**¡100% Compatible!** El backend recibe la misma estructura de URL en ambos casos.

## 🐛 Errores Comunes

### Error: "Bucket not found"
**Solución:** Ejecutar `node create-videos-bucket.js`

### Error: "new row violates row-level security policy"
**Solución:** Configurar políticas RLS en Supabase Dashboard

### Error: "Supabase no está configurado"
**Solución:** Verificar que `.env` tiene `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`

### Error: "Failed to upload video"
**Solución:** 
1. Verificar que el bucket es público
2. Verificar tamaño del video (max 500MB)
3. Verificar tipo de archivo permitido

## 🔍 Verificación

Para verificar que todo funciona:

1. **Prueba de subida:**
```javascript
const testFile = new File(['test'], 'test.webm', { type: 'video/webm' });
const result = await StorageService.uploadVideo(testFile, '14');
console.log('URL generada:', result.url);
```

2. **Verificar en Supabase Dashboard:**
   - Storage → videos → Deberías ver carpetas por userId
   - Click en un archivo → "Copy URL" → Debe ser accesible

3. **Verificar backend:**
```bash
curl -X POST https://softwaredlv.duckdns.org/practica/finalizar \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "idSesion": "abc123",
    "urlArchivo": "https://udmxynklzvmfrzhdmocp.supabase.co/storage/v1/object/public/videos/14/video_XXX.webm"
  }'
```

## 📊 Progreso Visual

Durante la subida, el usuario ve:

- **10-20%**: 📁 Preparando video...
- **20-60%**: ☁️ Subiendo a Supabase...
- **60-100%**: 📤 Enviando al servidor...
- **100%**: ✅ Completado!

## 🎯 Resultado Final

El backend recibe:
```json
{
  "idSesion": "abc123",
  "urlArchivo": "https://udmxynklzvmfrzhdmocp.supabase.co/storage/v1/object/public/videos/14/video_1732145678123.webm"
}
```

Y el backend:
1. Descarga el video desde esa URL
2. Lo analiza con IA
3. Devuelve el análisis completo

---

**¡Listo!** El flujo está 100% alineado con la versión móvil Flutter.
