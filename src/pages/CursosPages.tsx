import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CourseAccordion from '../components/CourseAccordion';
import ModuleList, { ModuleStatus } from '../components/ModuleList';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const CursosPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const modulos = [
    {
      titulo: t('module_1_title'),
      progreso: 100,
      estado: 'completed' as ModuleStatus,
      estadoTexto: t('status_completed'),
      boton: t('review'),
    },
    {
      titulo: t('module_2_title'),
      progreso: 60,
      estado: 'in_progress' as ModuleStatus,
      estadoTexto: t('status_in_progress'),
      boton: t('continue'),
    },
    {
      titulo: t('module_3_title'),
      progreso: 0,
      estado: 'locked' as ModuleStatus,
      estadoTexto: t('status_locked'),
      boton: t('coming_soon'),
    },
  ];

  return (
    <Container sx={{ my: 4 }}>
      <CourseAccordion
        titulo={t('solar_maintenance_course')}
        descripcion={t('course_description')}
        progreso={parseInt(user?.progress?.replace('%', '') || '0')}
        progresoTexto={user?.progress || '0%'}
      >
        <ModuleList modulos={modulos} />
      </CourseAccordion>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {t('course_information')}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={t('completed_videos')} />
              <Badge color="success" badgeContent={user?.lessons || '0/0'} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t('passed_evaluations')} />
              <Badge color="success" badgeContent={user?.evaluations || '0/0'} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t('study_time')} />
              <Badge color="success" badgeContent={user?.studyTime || '0h'} />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Button 
          fullWidth 
          variant="contained" 
          color="success"
          startIcon={<CloudDownloadIcon />}
        >
          {t('download_offline_content')}
        </Button>
      </Box>
    </Container>
  );
};

export default CursosPage;