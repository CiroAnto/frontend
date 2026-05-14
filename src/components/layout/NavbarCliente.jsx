import { AppBar, Toolbar, Box, Typography, Button, Tooltip } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NavbarCliente = () => {
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    localStorage.removeItem('sesionActiva');
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', mb: 5 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/images/internet.jpg" alt="Logo" width="40" height="40" style={{ borderRadius: '50%', marginRight: '15px' }} />
          <Typography variant="h6" fontWeight="bold">Mi Cuenta</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" fontWeight="bold" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Hola, Fer
          </Typography>
          <Tooltip title="Cerrar Sesión">
            <Button 
              variant="contained" 
              color="error" 
              size="small" 
              endIcon={<LogoutIcon />}
              onClick={handleCerrarSesion}
              sx={{ textTransform: 'none', borderRadius: 2 }}
            >
              Salir
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarCliente;