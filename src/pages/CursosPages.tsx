import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  LinearProgress,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CourseAccordion from '../components/CourseAccordion';
import ModuleList from '../components/ModuleList';
import { useAuth } from '../context/AuthContext';

const CursosPage = () => {
  const { user } = useAuth();

  const modulos = [
  {
    titulo: 'Módulo 1: Introducción',
    progreso: 100,
    estado: 'Completado',
    color: 'success' as const,
    boton: 'Repasar',
  },
  {
    titulo: 'Módulo 2: Mantenimiento Preventivo',
    progreso: 60,
    estado: 'En Progreso',
    color: 'primary' as const,
    boton: 'Continuar',
  },
  {
    titulo: 'Módulo 3: Mantenimiento Correctivo',
    progreso: 0,
    estado: 'Bloqueado',
    color: 'secondary' as const,
    boton: 'Próximamente',
  },
];


  return (
    <Container sx={{ my: 4 }}>
      <CourseAccordion
        titulo="Mantenimiento de Paneles Solares"
        descripcion="Curso especializado en mantenimiento preventivo y correctivo de sistemas solares."
        progreso={parseInt(user?.progress?.replace('%', '') || '0')}
        progresoTexto={user?.progress || '0%'}
      >
        <ModuleList modulos={modulos} />
      </CourseAccordion>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del Curso
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Videos Completados" />
              <Badge color="success" badgeContent={user?.lessons || '0/0'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Evaluaciones Aprobadas" />
              <Badge color="success" badgeContent={user?.evaluations || '0/0'} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Tiempo Dedicado" />
              <Badge color="success" badgeContent={user?.studyTime || '0h'} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Button fullWidth variant="contained" color="success">
          Descargar Contenido para Modo Offline
        </Button>
      </Box>
    </Container>
  );
};

export default CursosPage;