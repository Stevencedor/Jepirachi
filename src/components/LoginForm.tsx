import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../interface/User';
import { useEffect } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Limpiar errores anteriores
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    if (!email) {
      setEmailError('El correo es obligatorio');
      hasError = true;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria');
      hasError = true;
    }

    if (hasError) return;

    const defaultUser: User = {
      email: 'usuario@jepirachi.com',
      password: '123456',
      name: 'Joander Gonzalez',
      location: 'La Guajira, Colombia',
      joined: '2025-03-01',
      progress: '60%',
      lessons: '8/12',
      practices: '2/6',
      evaluations: '2/3',
      studyTime: '2.5h',
      score: '85%',
      lastModule: 'Módulo 1: Introducción',
      moduleCompleted: 'Marzo 2025',
      badge1: '/assets/badge-intro.png',
      badge2: '/assets/badge-practice.png',
      avatar: '/assets/Joander-Gonzalez.jpg',
      role: 'Estudiante de Mantenimiento de Paneles Solares',
    };

    if (email !== defaultUser.email) {
      setEmailError('El correo no está registrado');
      return;
    }

    if (password !== defaultUser.password) {
      setPasswordError('La contraseña es incorrecta');
      return;
    }

    // Autenticación simulada
    const mockData = {
      token: 'fake-token-123',
      user: defaultUser,
    };
    login(mockData);
    navigate('/');
  };
    useEffect(() => {
    const checkSession = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
        const response = await fetch('direccion api', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error('Sesión no válida');

        const data = await response.json(); // { user }
        login({ user: data.user, token });
        navigate('/');
        } catch (error) {
        console.log('Sesión inválida o expirada:', error);
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        }
    };

    checkSession();
    }, []);
  return (
    <>
      <TextField
        label="Correo"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Contraseña"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleLogin}
      >
        Iniciar sesión
      </Button>
    </>
  );
};

export default LoginForm;
