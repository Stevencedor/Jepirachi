import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';

interface ModuloViewerProps {
  titulo: string;
  descripcion?: string;
  videoUrl: string;
}

const ModuloViewer = ({ titulo, descripcion, videoUrl }: ModuloViewerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoCompleted, setVideoCompleted] = useState(() => {
    if (!id) return false;
    const completed = localStorage.getItem(`video-${id}-completed`);
    return completed === 'true';
  });

  // Actualizar estado basado en localStorage cuando cambia el módulo
  useEffect(() => {
    const completed = localStorage.getItem(`video-${id}-completed`);
    setVideoCompleted(completed === 'true');
  }, [id]);

  // Extraer el ID del video de la URL de YouTube
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeId(videoUrl);

  const handleVideoEnd = () => {
    setVideoCompleted(true);
    localStorage.setItem(`video-${id}-completed`, 'true');
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{titulo}</Typography>
        {descripcion && (
          <Typography variant="body2" paragraph>{descripcion}</Typography>
        )}
        <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          {videoId && (
            <YouTube
              videoId={videoId}
              onEnd={handleVideoEnd}
              opts={{
                width: '100%',
                height: '450px',
                playerVars: {
                  autoplay: 1, // Activar reproducción automática
                  rel: 0, // No mostrar videos relacionados
                  modestbranding: 1, // Ocultar logo de YouTube
                  showinfo: 0, // Ocultar información del video
                },
              }}
              style={{ display: 'block' }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          {parseInt(id || '0') > 1 && (
            <Button
              variant="outlined"
              color="primary"
              sx={{ flex: 1 }}
              onClick={() => {
                const prevModuleId = parseInt(id || '0') - 1;
                navigate(`/modulo/${prevModuleId}`);
              }}
            >
              Volver al módulo anterior
            </Button>
          )}
          
          <Button
            variant="contained"
            color="success"
            sx={{ flex: 1 }}
            disabled={!videoCompleted}
            startIcon={videoCompleted ? <CheckCircleIcon /> : null}
            onClick={() => {
              if (videoCompleted && id) {
                if (parseInt(id) < 3) { // Si no es el último módulo
                  const nextModuleId = parseInt(id) + 1;
                  navigate(`/modulo/${nextModuleId}`);
                } else {
                  navigate('/cursos'); // Redirigir a la página de cursos si es el último módulo
                }
              }
            }}
          >
            {!videoCompleted
              ? 'Complete el video para continuar'
              : parseInt(id || '0') === 3
                ? '¡Felicidades! Volver a cursos'
                : 'Continuar al siguiente módulo'
            }
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ModuloViewer;
