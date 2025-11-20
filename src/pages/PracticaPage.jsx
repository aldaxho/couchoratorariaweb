import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { PracticaService } from '../services/practicaService';
import { StorageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './PracticaPage.css';

const PracticaPage = () => {
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoSource, setVideoSource] = useState(null); // 'recorded' o 'uploaded'
  const [idSesion, setIdSesion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const startRecording = async () => {
    try {
      setError('');
      
      // Primero iniciar la sesión en el backend
      const response = await PracticaService.iniciarPractica();
      setIdSesion(response.idSesion);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });

      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedVideo(blob);
        setVideoSource('recorded');
        chunksRef.current = [];
        
        // Detener stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      setError('Error al acceder a la cámara. Verifica los permisos.');
      console.error('Error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      videoRef.current.srcObject = null;
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validar que sea un archivo de video
    if (!file.type.startsWith('video/')) {
      setError('Por favor selecciona un archivo de video válido');
      return;
    }

    // Validar tamaño máximo (500MB)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 500MB');
      return;
    }

    try {
      // Iniciar sesión en el backend al seleccionar archivo
      const response = await PracticaService.iniciarPractica();
      setIdSesion(response.idSesion);
      
      setUploadedVideo(file);
      setVideoSource('uploaded');
      setError('');
    } catch (err) {
      setError('Error al iniciar la práctica. Intenta nuevamente.');
      console.error('Error:', err);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFinalizarPractica = async () => {
    if (!idSesion) {
      setError('No hay sesión activa. Intenta grabar o subir el video nuevamente.');
      return;
    }

    if (!recordedVideo && !uploadedVideo) {
      setError('No hay video para procesar.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setUploadProgress(10);
      
      // Preparar el archivo de video
      const videoFile = videoSource === 'uploaded' 
        ? uploadedVideo 
        : new File([recordedVideo], `practica-${Date.now()}.webm`, { type: 'video/webm' });
      
      console.log('Preparando video...', {
        size: videoFile.size,
        type: videoFile.type,
        name: videoFile.name
      });

      setUploadProgress(20);

      // 1. Subir video a Supabase Storage
      console.log('Subiendo video a Supabase...');
      const { url: videoUrl } = await StorageService.uploadVideo(videoFile, user.id);
      
      setUploadProgress(60);
      console.log('Video subido exitosamente a Supabase:', videoUrl);

      // 2. Enviar URL del video al backend
      console.log('Enviando URL al backend...');
      const response = await PracticaService.finalizarPractica(idSesion, videoUrl);
      
      setUploadProgress(100);
      console.log('Práctica finalizada:', response);
      
      navigate(`/analisis/${response.idPractica}`);
    } catch (err) {
      const errorMsg = err.message || err.error || 'Error al finalizar la práctica.';
      setError(errorMsg);
      console.error('Error completo:', err);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setRecordedVideo(null);
    setUploadedVideo(null);
    setVideoSource(null);
    setIdSesion(null);
    setError('');
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Nueva Práctica</h1>
          <p>Graba tu práctica de oratoria y recibe retroalimentación</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="practica-container">
          <Card className="video-card">
            <div className="video-container">
              {!recordedVideo && !uploadedVideo ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="video-preview"
                />
              ) : uploadedVideo ? (
                <video
                  src={URL.createObjectURL(uploadedVideo)}
                  controls
                  className="video-preview"
                />
              ) : (
                <video
                  src={URL.createObjectURL(recordedVideo)}
                  controls
                  className="video-preview"
                />
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="video/*"
              style={{ display: 'none' }}
            />

            <div className="video-controls">
              {!recording && !recordedVideo && !uploadedVideo && (
                <>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={startRecording}
                  >
                    📹 Grabar Video
                  </Button>
                  <Button
                    variant="secondary"
                    size="large"
                    onClick={handleUploadClick}
                  >
                    📁 Subir Video
                  </Button>
                </>
              )}

              {recording && (
                <Button
                  variant="danger"
                  size="large"
                  onClick={stopRecording}
                >
                  ⏹️ Detener Grabación
                </Button>
              )}

              {(recordedVideo || uploadedVideo) && !recording && (
                <div className="video-actions">
                  <Button
                    variant="secondary"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    🔄 Seleccionar Otro Video
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleFinalizarPractica}
                    disabled={loading}
                  >
                    {loading 
                      ? `${uploadProgress > 0 ? `Subiendo ${uploadProgress}%...` : 'Procesando...'}` 
                      : '✓ Finalizar y Analizar'}
                  </Button>
                </div>
              )}

              {loading && uploadProgress > 0 && (
                <div className="upload-progress-container">
                  <div className="upload-progress-bar">
                    <div 
                      className="upload-progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="upload-progress-text">
                    {uploadProgress < 20 && '📁 Preparando video...'}
                    {uploadProgress >= 20 && uploadProgress < 60 && '☁️ Subiendo a Supabase...'}
                    {uploadProgress >= 60 && uploadProgress < 100 && '📤 Enviando al servidor...'}
                    {uploadProgress >= 100 && '✅ Completado!'}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card title="Consejos para tu Práctica">
            <ul className="tips-list">
              <li>Asegúrate de tener buena iluminación</li>
              <li>Habla con claridad y a un ritmo moderado</li>
              <li>Mantén contacto visual con la cámara</li>
              <li>Practica tu postura y lenguaje corporal</li>
              <li>Organiza tus ideas antes de comenzar</li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PracticaPage;
