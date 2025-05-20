import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { AuthProvider } from '../../context/AuthContext';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginForm', () => {
  test('renderiza todos los elementos del formulario', () => {
    renderLoginForm();
    
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('muestra errores cuando los campos están vacíos', async () => {
    renderLoginForm();
    
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  test('muestra error con credenciales incorrectas', async () => {
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'correo@incorrecto.com' } });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('El correo no está registrado')).toBeInTheDocument();
    });
  });

  test('login exitoso con credenciales correctas', async () => {
    renderLoginForm();
    
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'usuario@jepirachi.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(loginButton);

    // Verificamos que no hay mensajes de error
    await waitFor(() => {
      expect(screen.queryByText('El correo no está registrado')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('La contraseña es incorrecta')).not.toBeInTheDocument();
    });
  });
});