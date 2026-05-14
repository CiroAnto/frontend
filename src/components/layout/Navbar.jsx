import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText, Container, useScrollTrigger } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Efecto sutil para que el Navbar cambie de opacidad al hacer scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: 'Paquetes', path: '#paquetes' },
    { title: 'Beneficios', path: '#ventajas' },
    { title: 'Contacto', path: '#contacto' },
  ];

  // Estilo común para los links de navegación
  const linkStyle = {
    color: 'white',
    textTransform: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    mx: 1.5,
    transition: '0.3s',
    '&:hover': {
      color: '#f1c40f',
      backgroundColor: 'transparent'
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: trigger ? 'rgba(44, 62, 80, 0.95)' : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          boxShadow: trigger ? 4 : 'none',
          transition: '0.4s ease-in-out',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: trigger ? 0.5 : 1.5 }}>
            
            {/* LOGO */}
            <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src="/images/internet.jpg" alt="Logo" width="45" height="45" style={{ borderRadius: '50%' }} />
              <Box sx={{ ml: 1.5, color: 'white', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>
                AdminIT
              </Box>
            </Box>

            {/* LINKS DESKTOP */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navLinks.map((item) => (
                <Button key={item.title} href={item.path} sx={linkStyle}>
                  {item.title}
                </Button>
              ))}
              <Button 
                component={Link} 
                to="/login" 
                variant="contained"
                sx={{ 
                  ml: 3, 
                  backgroundColor: '#f1c40f', 
                  color: '#2c3e50',
                  fontWeight: 'bold',
                  borderRadius: '20px',
                  px: 3,
                  '&:hover': { backgroundColor: '#f39c12' }
                }}
              >
                Mi Cuenta
              </Button>
            </Box>

            {/* ICONO MENÚ MÓVIL */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </Container>
      </AppBar>

      {/* DRAWER (MENÚ LATERAL MÓVIL) */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 240, backgroundColor: '#2c3e50', color: 'white' } }}
      >
        <Box sx={{ p: 2, textAlign: 'right' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((item) => (
            <ListItem button key={item.title} component="a" href={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.title} sx={{ textAlign: 'center' }} />
            </ListItem>
          ))}
          <Box sx={{ p: 2 }}>
            <Button 
              fullWidth 
              component={Link} 
              to="/login" 
              variant="contained" 
              sx={{ backgroundColor: '#f1c40f', color: '#2c3e50', fontWeight: 'bold' }}
            >
              Mi Cuenta
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;