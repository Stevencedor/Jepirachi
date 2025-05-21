import { TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar errores anteriores
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    try {
      let hasError = false;

      if (!email) {
        setEmailError(t('email_required'));
        hasError = true;
      }

      if (!password) {
        setPasswordError(t('password_required'));
        hasError = true;
      }

      if (hasError) {
        setIsLoading(false);
        return;
      }

      // Simulamos un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar usuario registrado
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const user = registeredUsers.find((u: any) => u.email === email);

      // Si no encontramos el usuario, verificamos el usuario por defecto
      if (!user) {
        const defaultUser = {
          email: 'usuario@jepirachi.com',
          password: 'Demo123456Jepircahi!',
          name: 'Joander Gonzalez',
          location: 'La Guajira, Colombia',
          joined: '2025-03-01',
          progress: '60%',
          lessons: '8/12',
          practices: '2/6',
          evaluations: '2/3',
          studyTime: '2.5h',
          score: '85%',
          lastModule: 'module_1_title',
          moduleCompletedMonth: 'march',
          moduleCompletedYear: '2025',
          badge1: '/assets/badge-intro.png',
          badge2: '/assets/badge-practice.png',
          avatar: '/assets/Joander-Gonzalez.jpg',
          role: 'student_role',
          program: 'solar_maintenance',
        };

        if (email !== defaultUser.email) {
          setEmailError(t('email_not_registered'));
          setIsLoading(false);
          return;
        }

        if (password !== defaultUser.password) {
          setPasswordError(t('password_incorrect'));
          setIsLoading(false);
          return;
        }

        // Login con usuario por defecto
        login({
          token: `token-${Date.now()}`, //'fake-token-123',
          user: defaultUser,
        });
      } else {
        // Verificar contraseña del usuario registrado
        if (password !== user.password) {
          setPasswordError(t('password_incorrect'));
          setIsLoading(false);
          return;
        }

        // Login con usuario registrado
        login({
          token: `token-${Date.now()}`,
          user: {
            ...user,
            progress: '0%',
            lessons: '0/12',
            practices: '0/6',
            evaluations: '0/3',
            studyTime: '0h',
            score: '0%',
            lastModule: 'module_1_title',
            moduleCompleted: '-',
            moduleCompletedMonth: 'march',
            moduleCompletedYear: '2025',
            role: 'student_role',
            program: 'solar_maintenance'
          },
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Error durante el login:', error);
      setEmailError(t('login_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        label={t('email')}
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
        disabled={isLoading}
        autoComplete="email"
        required
      />
      <TextField
        label={t('password')}
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
        disabled={isLoading}
        autoComplete="current-password"
        required
      />

      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2, height: 48 }}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          t('login')
        )}
      </Button>

      {/* Credenciales de prueba */}
      <div style={{ marginTop: '16px', textAlign: 'center', color: 'gray' }}>
        <small>
          {t('test_credentials')}:<br />
          Email: usuario@jepirachi.com<br />
          {t('password')}: Demo123456Jepircahi!
        </small>
      </div>
    </form>
  );
};

export default LoginForm;
