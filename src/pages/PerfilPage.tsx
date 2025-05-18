import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs'; 

const PerfilPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Container sx={{ my: 4 }}>
      <Box
        textAlign="center"
        bgcolor="#198754"
        color="white"
        py={4}
        borderRadius="0 0 20px 20px"
        mb={4}
      >
        <Avatar
          src={user.avatar || ''}
          alt="Perfil"
          sx={{
            width: 120,
            height: 120,
            mx: 'auto',
            mb: 2,
            border: '4px solid white',
          }}
        />
        <Typography variant="h5">{user.name}</Typography>
        <Typography>{user.role || 'Estudiante registrado'}</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
        mb={4}
      >
        <Box flex={1}>
          <Card>
            <CardContent>
              <Typography variant="h6">Información Personal</Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body2">
                <strong>Ubicación:</strong> {user.location || 'No disponible'}
              </Typography>
              <Typography variant="body2">
                <strong>Miembro desde:</strong>{' '}
                {user.joined ? dayjs(user.joined).format('MMMM YYYY') : 'No especificado'}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box flex={2}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Progreso del Curso</Typography>
              <Box mt={2} mb={2}>
                <Box bgcolor="#e0e0e0" height={10} borderRadius={5}>
                  <Box
                    bgcolor="#198754"
                    height={10}
                    width={user.progress || '60%'}
                    borderRadius="5px 0 0 5px"
                  ></Box>
                </Box>
              </Box>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Box textAlign="center">
                  <Typography variant="h6">{user.lessons || '0/0'}</Typography>
                  <Typography variant="body2">Lecciones</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6">{user.practices || '0/0'}</Typography>
                  <Typography variant="body2">Prácticas</Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6">{user.evaluations || '0/0'}</Typography>
                  <Typography variant="body2">Evaluaciones</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6">Estadísticas</Typography>
            <Stack direction="row" spacing={2} mt={2} justifyContent="center">
              <Box textAlign="center">
                <Typography variant="h5" color="success.main">
                  {user.studyTime || '0h'}
                </Typography>
                <Typography variant="body2">Tiempo de Estudio</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h5" color="success.main">
                  {user.score || '0%'}
                </Typography>
                <Typography variant="body2">Promedio Evaluaciones</Typography>
              </Box>
            </Stack>
          </Card>

          <Card>
            <CardContent
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography>{user.lastModule || 'Módulo 1: Introducción'}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Completado: {user.moduleCompleted || 'No registrado'}
                </Typography>
              </Box>
              <Button variant="outlined" color="success">
                Descargar Certificado
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="success" fullWidth>
          Sincronizar Datos
        </Button>
      </Box>
    </Container>
  );
};

export default PerfilPage;