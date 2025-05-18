import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import cursoMantenimiento from '../assets/curso-mantenimiento.jpg';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        Bienvenido a Jepirachi
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
          <strong>Jepirachi</strong> significa "enseñanza" en Wayuú, reflejando nuestro compromiso con la educación en comunidades energéticamente sostenibles.
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 800, mx: 'auto', boxShadow: 3 }}>
        <img src={cursoMantenimiento} alt="Curso de Mantenimiento" style={{ width: '100%', borderRadius: '4px 4px 0 0' }} />
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Mantenimiento de Paneles Solares
          </Typography>
          <Typography variant="body2" paragraph>
            Aprende las técnicas esenciales para el mantenimiento preventivo y correctivo de sistemas solares en zonas rurales y apartadas.
          </Typography>
          <ul style={{ paddingLeft: '1.2rem', marginBottom: '1rem' }}>
            <li>Contenido disponible offline</li>
            <li>Videos tutoriales prácticos</li>
            <li>Evaluaciones interactivas</li>
            <li>Certificado al completar</li>
          </ul>
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ textTransform: 'none', fontWeight: 500 }}
            onClick={() => navigate('/cursos')}
          >
            Comenzar Curso
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
          Próximamente
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Estamos desarrollando nuevos cursos adaptados a las necesidades de la comunidad Wayuú y otras regiones de Colombia.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;