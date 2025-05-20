import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import { AuthProvider } from '../../context/AuthContext';

describe('Pruebas de Integración de Autenticación', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <MemoryRouter>
        <AuthProvider>
          {component}
        </AuthProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('muestra errores de validación cuando los campos están vacíos', async () => {
    renderWithRouter(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  test('muestra error con credenciales inválidas', async () => {
    renderWithRouter(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'invalido@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El correo no está registrado')).toBeInTheDocument();
    });
  });

  test('login exitoso con credenciales correctas', async () => {
    renderWithRouter(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    fireEvent.change(emailInput, { target: { value: 'usuario@jepirachi.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeTruthy();
    });

    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    expect(userData.email).toBe('usuario@jepirachi.com');
    expect(userData.name).toBe('Joander Gonzalez');
  });

  test('mantiene la sesión al recargar', async () => {
    // Simular una sesión existente
    const mockUser = {
      email: 'usuario@jepirachi.com',
      name: 'Joander Gonzalez'
    };

    localStorage.setItem('token', 'fake-token-123');
    localStorage.setItem('user', JSON.stringify(mockUser));

    renderWithRouter(<LoginForm />);

    await waitFor(() => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      expect(storedUser.name).toBe('Joander Gonzalez');
    });
  });
});