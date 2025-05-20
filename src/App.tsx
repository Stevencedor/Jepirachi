import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import PrivateRoute from './routes/PrivateRoutes';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPages';
import PerfilPage from './pages/PerfilPage';
import ModuloViewerPage from './pages/ModuleViewerPage';
import TestCertificatePage from './pages/TestCertificatePage';
import Navbar from './components/Navbar';

interface AppProps {
  useCustomRouter?: boolean;
}

function App({ useCustomRouter = true }: AppProps) {
  const AppContent = () => (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <HomePage />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/cursos"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <CursosPage />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <PerfilPage />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/modulo/:id"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <ModuloViewerPage />
            </>
          </PrivateRoute>
        }
      />
      <Route
        path="/test-certificate"
        element={
          <PrivateRoute>
            <>
              <Navbar />
              <TestCertificatePage />
            </>
          </PrivateRoute>
        }
      />
    </Routes>
  );

  return (
    <AuthProvider>
      <LanguageProvider>
        {useCustomRouter ? (
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        ) : (
          <AppContent />
        )}
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
