import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import cursoMantenimiento from '../assets/curso-mantenimiento.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    t('offline_content'),
    t('video_tutorials'),
    t('interactive_evaluations'),
    t('completion_certificate')
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        {t('welcome_to_jepirachi')}
      </Typography>

      <Box
        sx={{
          backgroundColor: '#e8f5e9',
          borderLeft: '6px solid #198754',
          p: 3,
          borderRadius: 2,
          mb: 4,
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Typography fontSize={16}>
          {t('jepirachi_description')}
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
        <img 
          src={cursoMantenimiento} 
          alt={t('solar_maintenance_course')} 
          style={{ width: '100%', borderRadius: '4px 4px 0 0' }} 
        />
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('solar_maintenance_course')}
          </Typography>
          <Typography variant="body2" paragraph>
            {t('course_description')}
          </Typography>
          <List sx={{ 
            pl: 2, 
            mb: 2,
            '& .MuiListItem-root': {
              p: 0,
              mb: 0.5,
              display: 'list-item'
            }
          }}>
            {features.map((feature, index) => (
              <ListItem key={index}>
                <Typography variant="body2" component="span">
                  {feature}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ textTransform: 'none', fontWeight: 500 }}
            onClick={() => navigate('/cursos')}
          >
            {t('start_course')}
          </Button>
        </CardContent>
      </Card>

      <Box
        textAlign="center"
        mt={6}
        p={3}
        bgcolor="#f8f9fa"
        borderRadius={2}
        border="1px dashed #ccc"
        maxWidth={800}
        mx="auto"
      >
        <Typography variant="h6" gutterBottom fontWeight={500}>
          {t('coming_soon_title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('coming_soon_description')}
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;