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
import Box from '@mui/material/Box';

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
              <Box sx={{ mt: '64px', pt: 2 }}>
                <HomePage />
              </Box>
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
              <Box sx={{ mt: '64px', pt: 2 }}>
                <CursosPage />
              </Box>
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
              <Box sx={{ mt: '15px', pt: 2 }}>
                <PerfilPage />
              </Box>
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
              <Box sx={{ mt: '64px', pt: 2 }}>
                <ModuloViewerPage />
              </Box>
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
              <Box sx={{ mt: '64px', pt: 2 }}>
                <TestCertificatePage />
              </Box>
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
