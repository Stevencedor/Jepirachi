import { Box, Typography, Card, CardContent, Button, Tabs, Tab, LinearProgress } from '@mui/material';
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ExamViewer from './ExamViewer';
import CertificateViewer from './CertificateViewer';
import LearningTools from './LearningTools';

interface ModuloViewerProps {
  titulo: string;
  descripcion?: string;
  videoUrl: string;
}

const ModuloViewer = ({ titulo, descripcion, videoUrl }: ModuloViewerProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [moduleProgress, setModuleProgress] = useState(() => {
    if (!id) return 0;
    const progress = localStorage.getItem(`module-${id}-progress`);
    return progress ? parseInt(progress) : 0;
  });

  const [videoCompleted, setVideoCompleted] = useState(() => {
    if (!id) return false;
    const completed = localStorage.getItem(`video-${id}-completed`);
    return completed === 'true';
  });

  const [examScore, setExamScore] = useState(() => {
    if (!id) return 0;
    const score = localStorage.getItem(`exam-${id}-lastScore`);
    return score ? parseInt(score) : 0;
  });

  // Sincronizar progreso cuando cambia el módulo
  useEffect(() => {
    if (!id) return;

    const video = localStorage.getItem(`video-${id}-completed`) === 'true';
    const exam = localStorage.getItem(`exam-${id}-lastScore`);
    const examCompleted = exam ? parseInt(exam) >= 70 : false;
    
    setVideoCompleted(video);
    setExamScore(exam ? parseInt(exam) : 0);
    
    // Calcular progreso total del módulo
    const progress = video ? (examCompleted ? 100 : 50) : 0;
    setModuleProgress(progress);
    localStorage.setItem(`module-${id}-progress`, progress.toString());

    // Sincronizar progreso cuando hay conexión
    if (navigator.onLine) {
      const progressData = {
        moduleId: id,
        videoCompleted: video,
        examScore: exam ? parseInt(exam) : 0,
        progress,
      };
      localStorage.setItem('pending-sync', JSON.stringify(progressData));
    }
  }, [id, videoCompleted, examScore]);

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

  const handleExamComplete = (score: number) => {
    setExamScore(score);
    localStorage.setItem(`exam-${id}-lastScore`, score.toString());

    if (score >= 70) {
      setModuleProgress(100);
      localStorage.setItem(`module-${id}-progress`, '100');
    }
  };

  const mockExamQuestions = [
    {
      id: 1,
      question: '¿Cuál es el principal beneficio de la energía solar?',
      options: [
        'Es una fuente renovable y limpia',
        'Es más cara que otras energías',
        'Solo funciona durante el día',
        'Requiere mucho mantenimiento'
      ],
      correctAnswer: 0,
      explanation: 'La energía solar es una fuente renovable que no contamina el medio ambiente.'
    },
    {
      id: 2,
      question: '¿Qué componente convierte la luz solar en electricidad?',
      options: [
        'El inversor',
        'La batería',
        'El panel solar',
        'El medidor'
      ],
      correctAnswer: 2,
      explanation: 'Los paneles solares utilizan células fotovoltaicas para convertir la luz solar en electricidad.'
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{titulo}</Typography>
          {descripcion && (
            <Typography variant="body2" paragraph>{descripcion}</Typography>
          )}

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
              <Tab label={t('module')} />
              <Tab label={t('exam')} disabled={!videoCompleted} />
              {moduleProgress === 100 && <Tab label={t('certificate')} />}
              <Tab label={t('my_notes')} />
            </Tabs>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={moduleProgress} 
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {t('progress')}: {moduleProgress}%
            </Typography>
          </Box>

          {activeTab === 0 && (
            <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              {videoId && (
                <YouTube
                  videoId={videoId}
                  onEnd={handleVideoEnd}
                  opts={{
                    width: '100%',
                    height: '450px',
                    playerVars: {
                      autoplay: 1,
                      rel: 0,
                      modestbranding: 1,
                      showinfo: 0,
                    },
                  }}
                  style={{ display: 'block' }}
                />
              )}

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {parseInt(id || '0') > 1 && (
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ flex: 1 }}
                    onClick={() => navigate(`/modulo/${parseInt(id || '0') - 1}`)}
                  >
                    {t('prev_module')}
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
                      if (parseInt(id) < 3) {
                        navigate(`/modulo/${parseInt(id) + 1}`);
                      } else {
                        navigate('/cursos');
                      }
                    }
                  }}
                >
                  {!videoCompleted
                    ? t('complete_video')
                    : parseInt(id || '0') === 3
                      ? t('back_to_courses')
                      : t('next_module')
                  }
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === 1 && videoCompleted && (
            <ExamViewer
              moduleId={id || '1'}
              questions={mockExamQuestions}
              onComplete={handleExamComplete}
            />
          )}

          {activeTab === 2 && moduleProgress === 100 && (
            <CertificateViewer
              userName="Joander Gonzalez"
              courseName="Mantenimiento de Paneles Solares"
              completionDate={new Date().toLocaleDateString()}
              certificateId={`CERT-${id}-${Date.now()}`}
            />
          )}

          {activeTab === 3 && (
            <LearningTools moduleId={id || '1'} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModuloViewer;
