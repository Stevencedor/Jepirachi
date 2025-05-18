import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoutes';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPages';
import PerfilPage from './pages/PerfilPage';
import ModuloViewerPage from './pages/ModuleViewerPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
