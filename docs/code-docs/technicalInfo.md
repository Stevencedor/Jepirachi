# Documentación Técnica - Plataforma Jepirachi

Esta documentación proporciona detalles técnicos sobre la implementación y el código fuente de la plataforma Jepirachi.

## Índice

1. [Estructura de componentes](#estructura-de-componentes)
2. [Sistema de contexto](#sistema-de-contexto)
3. [Flujo de autenticación](#flujo-de-autenticación)
4. [Internacionalización (i18n)](#internacionalización-i18n)
5. [Sistema de almacenamiento offline](#sistema-de-almacenamiento-offline)
6. [Componentes principales](#componentes-principales)

## Estructura de componentes

### Jerarquía de componentes

La aplicación sigue una estructura jerárquica de componentes:

```
App
├── PrivateRoutes
│   ├── HomePage
│   ├── CursosPages
│   ├── ModuleViewerPage
│   │   └── ModuloViewer
│   ├── PerfilPage
│   └── TestCertificatePage
└── PublicRoutes
    ├── LoginPage
    │   └── LoginForm
    └── RegisterPage
        └── RegisterForm
```

### Componentes reutilizables

| Componente | Descripción | Propiedades principales |
|------------|-------------|------------------------|
| Navbar | Barra de navegación principal | `user`, `isAuthenticated` |
| ModuloViewer | Visualizador de módulos educativos | `id`, `titulo`, `descripcion`, `videoUrl` |
| ExamViewer | Componente de evaluaciones | `preguntas`, `moduleId` |
| CertificateViewer | Generador de certificados | `user`, `course`, `date` |

## Sistema de contexto

### AuthContext

Maneja el estado de autenticación del usuario en toda la aplicación.

```tsx
// Ejemplo de uso
import { useAuth } from '../context/AuthContext';

const MiComponente = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Uso del contexto
};
```

Interfaz principal:

```tsx
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
  register: (userData: UserRegistration) => Promise<boolean>;
}
```

### LanguageContext

Gestiona la internacionalización de la aplicación.

```tsx
// Ejemplo de uso
import { useLanguage } from '../context/LanguageContext';

const MiComponente = () => {
  const { language, setLanguage, t } = useLanguage();
  
  return <h1>{t('welcome')}</h1>;
};
```

## Flujo de autenticación

El proceso de autenticación sigue estos pasos:

1. El usuario ingresa sus credenciales en `LoginForm`
2. Se validan los datos de entrada
3. Se verifica contra los datos de usuario (simulados en localStorage)
4. Si las credenciales son válidas:
   - Se guarda el token en localStorage
   - Se actualiza el estado en AuthContext
   - Se redirige al usuario a la página principal

Código simplificado del proceso de login:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validación...
  
  try {
    // Verificación de credenciales...
    
    // Login exitoso
    login({
      token: `token-${Date.now()}`,
      user: userDetails
    });
    
    navigate('/');
  } catch (error) {
    // Manejo de errores...
  }
};
```

## Internacionalización (i18n)

### Sistema de traducciones

Las traducciones se almacenan en un objeto en `LanguageContext.tsx`:

```tsx
const translations: Translations = {
  es: {
    'welcome': 'Bienvenido',
    'courses': 'Cursos',
    ...
  },
  en: {
    'welcome': 'Welcome',
    'courses': 'Courses',
    ...
  },
  wayuu: {
    'welcome': 'Anabaa',
    'courses': 'Ekirajaaya',
    ...
  }
};
```

### Función de traducción

La función `t` permite acceder a las traducciones:

```tsx
const t = useCallback((key: string) => {
  return translations[language][key] || key;
}, [language]);
```

## Sistema de almacenamiento offline

### Estrategia de caché

El progreso del usuario se almacena localmente usando localStorage:

```tsx
// Guardar progreso de video
localStorage.setItem(`video-${moduleId}-completed`, 'true');

// Verificar progreso
const videoCompleted = localStorage.getItem(`video-${moduleId}-completed`) === 'true';
```

### Persistencia de sesión

Los datos de la sesión del usuario se mantienen entre recargas:

```tsx
// Recuperar sesión al iniciar la aplicación
useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (token && userData) {
    setUser(userData);
    setIsAuthenticated(true);
  }
}, []);
```

## Componentes principales

### ModuloViewer

El componente central para la visualización de módulos educativos.

Funcionalidades principales:
- Reproducción de videos de YouTube
- Seguimiento de progreso
- Navegación entre módulos
- Cambio entre secciones de contenido, evaluación y notas

Eventos clave:
- `onVideoEnd`: Marca el video como completado
- `onTabChange`: Cambia entre las diferentes secciones del módulo
- `handleModuleNavigation`: Gestiona la navegación entre módulos

### ExamViewer

Componente para realizar evaluaciones.

Funcionalidades principales:
- Presentación de preguntas de opción múltiple
- Validación de respuestas
- Cálculo de puntuación
- Retroalimentación al usuario
