import { TextField, Button } from '@mui/material';
import { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('direccion api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, location }),
      });

      if (!response.ok) throw new Error('Error al registrar usuario');

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      setName('');
      setLocation('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Error en el registro. Intenta nuevamente.');
    }
  };

  return (
    <>
      <TextField
        label="Nombre Completo"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Ubicación"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Correo Electrónico"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirmar Contraseña"
        fullWidth
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && (
        <p style={{ color: 'red', marginTop: 8 }}>{error}</p>
      )}
      <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleRegister}
      >
        Registrarse
      </Button>
    </>
  );
};

export default RegisterForm;
