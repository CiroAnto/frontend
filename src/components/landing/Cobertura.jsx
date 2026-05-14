import { useState } from 'react';
import { 
  Box, Container, Typography, Grid, TextField, Button, InputAdornment, 
  Paper, Alert, Collapse, CircularProgress 
} from '@mui/material';
import { LocationOn as LocationIcon, Search as SearchIcon } from '@mui/icons-material';

const Cobertura = () => {
  // Definir los estados
  const [cp, setCp] = useState('');
  const [cargando, setCargando] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  // El evento para verificar la cobertura
  const verificarCobertura = (e) => {
    e.preventDefault();

    // Validación básica
    if (!/^\d{5}$/.test(cp)) {
      setNotificacion({ tipo: 'error', texto: 'Por favor, ingresa un Código Postal válido de 5 dígitos.' });
      return;
    }

    setCargando(true);
    setNotificacion(null);

    // Simulación de la consulta
    setTimeout(() => {
      // Usamos el CP 73xxx (común en algunas zonas de México) como éxito garantizado en tu lógica
      if (cp.startsWith('73')) {
        setNotificacion({ tipo: 'success', texto: `¡Excelente! Tenemos cobertura total en la zona ${cp}.` });
      } else {
        if (Math.random() > 0.3) {
          setNotificacion({ tipo: 'success', texto: `¡Sí! Hay fibra óptica disponible en el CP ${cp}.` });
        } else {
          setNotificacion({ tipo: 'error', texto: `Lo sentimos, aún no llegamos al CP ${cp}. ¡Estamos trabajando en ello!` });
        }
      }
      setCargando(false);
      setCp(''); // limpiar el campo
    }, 1500);
  };

  return (
    <Box sx={{ backgroundColor: '#2c3e50', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0} 
          sx={{ 
            backgroundColor: 'transparent', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 4, 
            p: { xs: 4, md: 6 },
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05), transparent)'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            
            {/* Textos */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationIcon sx={{ color: '#f1c40f', fontSize: 40, mr: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                  ¿Llegamos a tu zona?
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: '#bdc3c7', fontWeight: 400 }}>
                Ingresa tu Código Postal y descubre si ya puedes disfrutar de nuestra fibra óptica de ultra velocidad.
              </Typography>
            </Grid>

            {/* Formulario de Búsqueda y Notificaciones */}
            <Grid item xs={12} md={6}>
              <Box component="form" onSubmit={verificarCobertura} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ej. 90000"
                  value={cp}
                  onChange={(e) => setCp(e.target.value)}
                  required
                  disabled={cargando}
                  inputProps={{ maxLength: 5, pattern: "[0-9]{5}" }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon sx={{ color: '#7f8c8d' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={cargando}
                  startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                  sx={{ 
                    backgroundColor: '#f1c40f', 
                    color: '#2c3e50', 
                    fontWeight: 'bold',
                    borderRadius: 2,
                    px: 4,
                    minWidth: { sm: 200 },
                    '&:hover': { backgroundColor: '#f39c12' },
                    '&.Mui-disabled': { backgroundColor: '#f1c40f80' } // Estilo cuando está deshabilitado
                  }}
                >
                  {cargando ? 'Buscando...' : 'Comprobar'}
                </Button>
              </Box>

              {/* Render de la notificación con animación de Material-UI */}
              <Collapse in={Boolean(notificacion)}>
                {notificacion && (
                  <Alert 
                    severity={notificacion.tipo} 
                    variant="filled"
                    sx={{ 
                      borderRadius: 2, 
                      fontWeight: 'bold',
                      // Ajustamos el color para que haga buen contraste con el fondo azul oscuro
                      backgroundColor: notificacion.tipo === 'success' ? '#27ae60' : '#e74c3c' 
                    }}
                  >
                    {notificacion.texto}
                  </Alert>
                )}
              </Collapse>
            </Grid>

          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Cobertura;