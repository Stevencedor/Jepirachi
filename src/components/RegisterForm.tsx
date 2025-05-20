import { TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const { t } = useLanguage();

  const validateForm = () => {
    const newErrors = {
      name: '',
      location: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = t('name_required');
      isValid = false;
    }

    if (!location.trim()) {
      newErrors.location = t('location_required');
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = t('email_required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('email_invalid');
      isValid = false;
    }

    if (!password) {
      newErrors.password = t('password_required');
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('passwords_not_match');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulamos un delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // En una aplicación real, aquí harías la llamada a la API para registrar al usuario
      const newUser = {
        name,
        email,
        location,
        password,
        registeredAt: new Date().toISOString()
      };

      // Guardamos el usuario en localStorage (simulando una base de datos)
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      registeredUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
      
      alert(t('register_success'));
      
      // Limpiamos el formulario
      setName('');
      setLocation('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Cambiamos a la pestaña de login
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert(t('register_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        label={t('name')}
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        disabled={isLoading}
        autoComplete="name"
        required
      />
      <TextField
        label={t('location')}
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        error={!!errors.location}
        helperText={errors.location}
        disabled={isLoading}
        required
      />
      <TextField
        label={t('email')}
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
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
        error={!!errors.password}
        helperText={errors.password}
        disabled={isLoading}
        autoComplete="new-password"
        required
      />
      <TextField
        label={t('confirm_password')}
        fullWidth
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        disabled={isLoading}
        autoComplete="new-password"
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
          t('register')
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
