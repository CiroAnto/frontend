import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Snackbar, Alert, Button } from '@mui/material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { actualizarPerfil, obtenerPerfil, registrarAdmin } from '@/services/authService';

import TarjetaPerfil from '@/components/ui/TarjetaPerfil';
import FormularioPerfil from '@/components/ui/FormularioPerfil';
import ModalNuevoAdmin from '@/components/ui/ModalNuevoAdmin';

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

  const [modalAdminAbierto, setModalAdminAbierto] = useState(false);
  const [cargandoNuevoAdmin, setCargandoNuevoAdmin] = useState(false);
  const [errorNuevoAdmin, setErrorNuevoAdmin] = useState('');
  const [alertaNuevoAdmin, setAlertaNuevoAdmin] = useState(false);

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

  const handleCrearAdmin = async (datosNuevoAdmin) => {
    setErrorNuevoAdmin('');
    setCargandoNuevoAdmin(true);
    try {
      await registrarAdmin(datosNuevoAdmin);
      setModalAdminAbierto(false); // Cerramos el modal
      setAlertaNuevoAdmin(true);   // Mostramos alerta de éxito
    } catch (error) {
      setErrorNuevoAdmin(error);
    } finally {
      setCargandoNuevoAdmin(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Configuración de Cuenta
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
            Administración del perfil de empleado
          </Typography>
          </Box>
          <Button 
            variant="contained" 
            color="success"
            startIcon={<PersonAddIcon />}
            onClick={() => setModalAdminAbierto(true)}
            sx={{ fontWeight: 'bold', px: 3, py: 1.5 }}
          >
            Nuevo Administrador
          </Button>
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

      <ModalNuevoAdmin 
        abierto={modalAdminAbierto}
        alCerrar={() => setModalAdminAbierto(false)}
        onSubmit={handleCrearAdmin}
        cargando={cargandoNuevoAdmin}
        error={errorNuevoAdmin}
      />

      <Snackbar open={alertaGuardado} autoHideDuration={4000} onClose={() => setAlertaGuardado(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setAlertaGuardado(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          ¡Perfil actualizado correctamente!
        </Alert>
      </Snackbar>

      <Snackbar open={alertaNuevoAdmin} autoHideDuration={5000} onClose={() => setAlertaNuevoAdmin(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setAlertaNuevoAdmin(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          ¡Nuevo administrador creado exitosamente!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAjustes;