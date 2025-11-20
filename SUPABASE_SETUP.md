# Configuración de Supabase Storage

## Crear Bucket para Videos

1. Ve a tu proyecto en Supabase: https://app.supabase.com/project/udmxynklzvmfrzhdmocp

2. En el menú lateral, ve a **Storage**

3. Crea un nuevo bucket:
   - Nombre: `practice-videos`
   - Público: ✅ Sí (para que los URLs sean accesibles)

4. Configura las políticas de seguridad (RLS Policies):

### Política para Subir Videos (INSERT)
```sql
-- Permitir a usuarios autenticados subir videos
CREATE POLICY "Users can upload their own videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'practice-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Política para Ver Videos (SELECT)
```sql
-- Permitir a usuarios autenticados ver sus propios videos
CREATE POLICY "Users can view their own videos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'practice-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Política para Eliminar Videos (DELETE)
```sql
-- Permitir a usuarios autenticados eliminar sus propios videos
CREATE POLICY "Users can delete their own videos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'practice-videos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## Alternativa: Bucket Público (más simple pero menos seguro)

Si prefieres una configuración más simple para desarrollo:

1. Crea el bucket como **público**
2. No configures políticas RLS
3. Todos los videos serán accesibles públicamente

## Verificar Configuración

Puedes probar la configuración con este código en la consola del navegador:

```javascript
// Verificar que Supabase esté configurado
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Client configurado:', !!supabase);
```

## Solución Temporal

Si no quieres usar Supabase por ahora, simplemente no configures las variables de entorno o déjalas vacías. La app funcionará pero los videos no se guardarán externamente.
