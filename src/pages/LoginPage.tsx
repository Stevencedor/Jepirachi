import { Container, Box, Typography, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container sx={{ my: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5">Bienvenido a Jepirachi</Typography>
        <Typography variant="body2" color="text.secondary">
          Accede a tu cuenta para continuar aprendiendo
        </Typography>
      </Box>

      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
        <Tab label="Iniciar Sesión" />
        <Tab label="Registrarse" />
      </Tabs>

      <Box mt={3}>
        {tab === 0 ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Container>
  );
};

export default LoginPage;
