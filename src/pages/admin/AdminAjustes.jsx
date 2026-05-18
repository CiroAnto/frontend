import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Snackbar, Alert } from '@mui/material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { actualizarPerfil, obtenerPerfil } from '@/services/authService';

import TarjetaPerfil from '@/components/ui/TarjetaPerfil';
import FormularioPerfil from '@/components/ui/FormularioPerfil';

const AdminAjustes = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: 'Administrador Principal',
    email: '',
    passActual: '',
    passNueva: ''
  });

  const [usernameActual, setUsernameActual] = useState('');
  const [cargando, setCargando] = useState(false);
  const [alertaGuardado, setAlertaGuardado] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  useEffect(() => {
    const cargarDatosPerfil = async () => {
      const token = localStorage.getItem('auth_token'); 
      if (token) {
        try {
          const decodificado = jwtDecode(token);
          const username = decodificado.user?.username || 'Admin';
          setUsernameActual(username);
          
          const perfilBD = await obtenerPerfil(username);
          
          if (perfilBD) {
            setFormData(prev => ({
              ...prev,
              nombre: perfilBD.fullName || '',
              email: perfilBD.email || ''
            }));
          }
        } catch (err) {
          console.log("Error leyendo token o perfil", err);
        }
      }
    };
    cargarDatosPerfil();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorValidacion('');
    setCargando(true);

    try {
      const payload = { fullName: formData.nombre, email: formData.email };

      if (formData.passActual || formData.passNueva) {
        if (!formData.passActual || !formData.passNueva) {
          throw new Error("Para cambiar la contraseña, debes llenar ambos campos de seguridad.");
        }
        payload.currentPassword = formData.passActual;
        payload.newPassword = formData.passNueva;
      }

      await actualizarPerfil(usernameActual, payload);
      
      setAlertaGuardado(true);
      setFormData({ ...formData, passActual: '', passNueva: '' });

    } catch (error) {
        setErrorValidacion(error.message || error);
    } finally {
        setCargando(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Configuración de Cuenta
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
            Administración del perfil de empleado
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            {/*compponent tarheta*/}
            <TarjetaPerfil 
              nombre={formData.nombre} 
              username={usernameActual} 
              onLogout={handleLogout} 
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {/* component formulario*/}
            <FormularioPerfil 
              formData={formData} 
              onChange={handleChange} 
              onSubmit={handleSubmit} 
              cargando={cargando} 
              errorValidacion={errorValidacion} 
            />
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={alertaGuardado} autoHideDuration={4000} onClose={() => setAlertaGuardado(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setAlertaGuardado(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          ¡Perfil actualizado correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAjustes;