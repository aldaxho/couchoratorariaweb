import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';
import { PracticaService } from '../services/practicaService';
import { useNavigate } from 'react-router-dom';
import './PracticaPage.css';

const PracticaPage = () => {
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [idSesion, setIdSesion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate();

  const startRecording = async () => {
    try {
      setError('');
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
        chunksRef.current = [];
        
        // Detener stream
        stream.getTracks().forEach(track => track.stop());
      };

      // Iniciar práctica en el backend
      const response = await PracticaService.iniciarPractica();
      setIdSesion(response.idSesion);

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

  const handleFinalizarPractica = async () => {
    if (!idSesion) return;

    setLoading(true);
    setError('');

    try {
      const response = await PracticaService.finalizarPractica(idSesion, 'video_practica.mp4');
      navigate(`/analisis/${response.idPractica}`);
    } catch (err) {
      setError('Error al finalizar la práctica. Intenta nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecordedVideo(null);
    setIdSesion(null);
    setError('');
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
              {!recordedVideo ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
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

            <div className="video-controls">
              {!recording && !recordedVideo && (
                <Button
                  variant="primary"
                  size="large"
                  onClick={startRecording}
                >
                  Iniciar Grabación
                </Button>
              )}

              {recording && (
                <Button
                  variant="danger"
                  size="large"
                  onClick={stopRecording}
                >
                  Detener Grabación
                </Button>
              )}

              {recordedVideo && !recording && (
                <div className="video-actions">
                  <Button
                    variant="secondary"
                    onClick={handleReset}
                  >
                    Grabar de Nuevo
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleFinalizarPractica}
                    disabled={loading}
                  >
                    {loading ? 'Procesando...' : 'Finalizar Práctica'}
                  </Button>
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
