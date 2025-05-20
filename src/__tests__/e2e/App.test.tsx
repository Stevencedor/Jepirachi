import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

const renderApp = (initialEntry = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <App useCustomRouter={false} />
    </MemoryRouter>
  );
};

describe('Pruebas E2E de la Aplicación', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('flujo completo: login -> home -> perfil -> cursos', async () => {
    renderApp('/login');

    // 1. Verificar que inicia en la página de login
    const loginButton = await screen.findByRole('button', { name: /iniciar sesión/i });
    expect(loginButton).toBeInTheDocument();

    // 2. Realizar login
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'usuario@jepirachi.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.click(loginButton);

    // 3. Verificar redirección a home y contenido
    await waitFor(() => {
      expect(screen.getByText(/bienvenido.*jepirachi/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText(/bienvenido,\s*joander gonzalez/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // 4. Navegar al perfil
    const perfilLink = screen.getByText(/mi perfil/i);
    fireEvent.click(perfilLink);

    // 5. Verificar contenido del perfil
    await waitFor(() => {
      expect(screen.getByText('Joander Gonzalez')).toBeInTheDocument();
    }, { timeout: 3000 });

    // 6. Verificar secciones del perfil
    await waitFor(() => {
      expect(screen.getByText('Progreso del Curso')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText('Lecciones')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText('Evaluaciones')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByText('Módulo 1: Introducción')).toBeInTheDocument();
    }, { timeout: 3000 });

    // 7. Navegar a cursos
    const cursosLink = screen.getByText(/cursos/i);
    fireEvent.click(cursosLink);

    // 8. Verificar contenido de cursos
    await waitFor(() => {
      expect(screen.getByText(/Mantenimiento de Paneles Solares/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // 9. Verificar que se mantiene la sesión
    expect(localStorage.getItem('token')).toBeTruthy();
    expect(localStorage.getItem('user')).toBeTruthy();
  });

  test('protección de rutas privadas sin autenticación', async () => {
    renderApp('/perfil');

    // Debería redirigir al login
    await waitFor(() => {
      const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
      expect(loginButton).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('cierre de sesión y limpieza de datos', async () => {
    // Simular usuario autenticado
    localStorage.setItem('token', 'fake-token-123');
    localStorage.setItem('user', JSON.stringify({
      email: 'usuario@jepirachi.com',
      name: 'Joander Gonzalez'
    }));

    renderApp('/');

    // Verificar que está autenticado
    await waitFor(() => {
      expect(screen.getByText(/bienvenido,\s*joander gonzalez/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Realizar logout
    const logoutButton = screen.getByText(/cerrar sesión/i);
    fireEvent.click(logoutButton);

    // Verificar redirección a login y limpieza de datos
    await waitFor(() => {
      const loginButton = screen.getByRole('button', { name: /iniciar sesión/i });
      expect(loginButton).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Verificar limpieza de datos de sesión
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});