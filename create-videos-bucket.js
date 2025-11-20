import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://udmxynklzvmfrzhdmocp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkbXh5bmtsenZtZnJ6aGRtb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODczMTEsImV4cCI6MjA3OTA2MzMxMX0.FvzXmL-oklwSXFuB7lBs0NeJmhMfDyllvO5BZWBUSgc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBucket() {
  console.log('🔧 Creando bucket "videos" en Supabase...');
  
  // Crear bucket público
  const { data, error } = await supabase.storage.createBucket('videos', {
    public: true,
    fileSizeLimit: 524288000, // 500MB
    allowedMimeTypes: ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log('✅ El bucket "videos" ya existe');
      return;
    }
    console.error('❌ Error al crear bucket:', error);
    return;
  }

  console.log('✅ Bucket "videos" creado exitosamente:', data);
  
  // Verificar que el bucket se creó
  const { data: buckets } = await supabase.storage.listBuckets();
  console.log('\n📦 Buckets disponibles:');
  buckets.forEach(bucket => {
    console.log(`  - ${bucket.name} (${bucket.public ? 'público' : 'privado'})`);
  });
}

createBucket().catch(console.error);
