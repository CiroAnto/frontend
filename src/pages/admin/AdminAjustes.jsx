import { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, TextField, Button, Divider, Snackbar, Alert } from '@mui/material';
import { Save as SaveIcon, VpnKey as VpnKeyIcon, Person as PersonIcon } from '@mui/icons-material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { useNavigate } from 'react-router-dom';

const AdminAjustes = () => {
  // 1. Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: 'Administrador Principal',
    email: 'admin@tecnologico.com',
    passActual: '',
    passNueva: ''
  });

  // 2. Estado para la alerta de éxito
  const [alertaGuardado, setAlertaGuardado] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica real para actualizar el perfil en la base de datos
    console.log("Nuevos datos guardados:", formData);
    
    // Mostramos la alerta de éxito
    setAlertaGuardado(true);
    
    // Limpiamos solo las contraseñas por seguridad
    setFormData({ ...formData, passActual: '', passNueva: '' });
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        
        {/* CABECERA */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Configuración de Cuenta
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
            Administración del perfil de empleado
          </Typography>
        </Box>

        <Grid container spacing={4}>
          
          {/* ==========================================
              COLUMNA IZQUIERDA: TARJETA DE PERFIL (1/3 del ancho)
              ========================================== */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', height: '100%' }}>
              <Box sx={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                backgroundColor: '#e0e6ed', 
                margin: '0 auto 20px auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <img src="/images/internet.jpg" alt="Foto de Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              
              <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                {formData.nombre}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Gerente de Operaciones
              </Typography>
              
              {/* Nota: El botón de cerrar sesión principal ya lo tenemos en el Navbar */}
              <Button 
                variant="outlined" 
                color="error" 
                fullWidth 
                sx={{ borderRadius: 2 }}
                onClick={() => {
                    localStorage.removeItem('sesionActiva');
                    navigate('/login', { replace: true });
                }}
              >
                Cerrar Sesión Segura
              </Button>
            </Paper>
          </Grid>

          {/* ==========================================
              COLUMNA DERECHA: FORMULARIO (2/3 del ancho)
              ========================================== */}
          <Grid item xs={12} md={8}>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              
              {/* Sección: Datos Personales */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon sx={{ color: '#3498db' }} />
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Actualizar Datos Personales
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              {/* Sección: Seguridad */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, mt: 5 }}>
                <VpnKeyIcon sx={{ color: '#e74c3c' }} />
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Seguridad
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contraseña Actual"
                    name="passActual"
                    type="password"
                    placeholder="********"
                    value={formData.passActual}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contraseña Nueva"
                    name="passNueva"
                    type="password"
                    placeholder="********"
                    value={formData.passNueva}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              {/* Botón de Guardar */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, px: 4 }}
                >
                  Guardar Cambios
                </Button>
              </Box>

            </Paper>
          </Grid>

        </Grid>
      </Container>

      {/* ==========================================
          ALERTA FLOTANTE (SNACKBAR)
          ========================================== */}
      <Snackbar 
        open={alertaGuardado} 
        autoHideDuration={4000} // Se cierra sola a los 4 segundos
        onClose={() => setAlertaGuardado(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setAlertaGuardado(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          ¡Datos actualizados correctamente!
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default AdminAjustes;