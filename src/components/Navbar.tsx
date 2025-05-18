import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Cursos', path: '/cursos', icon: <SchoolIcon /> },
    { label: 'Mi Perfil', path: '/perfil', icon: <AccountCircleIcon /> },
  ];

  if (!isAuthenticated) return null; // 👈 Oculta la navbar si no hay sesión

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#198754' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                flexGrow: 1,
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Logo"
                sx={{ height: 40, borderRadius: '50%', mr: 2 }}
              />
              <Typography variant="h6">
                Jepirachi
              </Typography>
            </Box>

            {!isMobile && user && (
              <Typography variant="body2" sx={{ mr: 2 }}>
                Bienvenido, {user.name}
              </Typography>
            )}

            {isMobile ? (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.path}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                  Cerrar sesión
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer para móviles */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <Button
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none', width: '100%' }}
                >
                  {item.label}
                </Button>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ justifyContent: 'flex-start', textTransform: 'none', width: '100%' }}
              >
                Cerrar sesión
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
