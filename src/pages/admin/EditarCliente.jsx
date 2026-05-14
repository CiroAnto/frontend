import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, TextField, Button, CircularProgress, Divider, FormControlLabel, Switch, Skeleton, MenuItem, Alert } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

import AdminNavbar from '@/components/layout/AdminNavbar';
// 1. Importamos las funciones del servicio
import { obtenerCliente, actualizarCliente } from '@/services/clienteService';

const paquetesDisponibles = [
  { nombre: 'Básico 50 Mbps', precio: 350 },
  { nombre: 'Familiar 150 Mbps', precio: 450 },
  { nombre: 'Gamer 500 Mbps', precio: 800 },
  { nombre: 'Empresarial 1 Gbps', precio: 1200 }
];

const EditarCliente = () => {
  // Nota: En AdminClientes configuramos el Link para mandar el 'name' en lugar del 'id'
  const { id: nombreOriginalUrl } = useParams(); 
  const navigate = useNavigate();

  const [cargandoDatos, setCargandoDatos] = useState(true); 
  const [guardando, setGuardando] = useState(false);        
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    clienteId: '',
    nombre: '',
    apellido: '',
    telefono: '',
    referencias: '',
    paquete: '',
    montoMensual: '',
    diaDeCorte: '',
    activo: true
  });

  // 2. Cargar los datos reales desde MongoDB
  useEffect(() => {
    const cargarCliente = async () => {
      try {
        // Buscamos usando el nombre que viene en la URL
        const clienteReal = await obtenerCliente(nombreOriginalUrl);
        
        // Llenamos el formulario con los datos que nos dio MongoDB
        setFormData({
          clienteId: clienteReal.clienteId || '',
          nombre: clienteReal.name || '',
          apellido: clienteReal.lastname || '',
          telefono: clienteReal.phone || '',
          referencias: clienteReal.reference || '',
          paquete: clienteReal.paquete || '',
          montoMensual: clienteReal.montoMensual || '',
          diaDeCorte: clienteReal.diaDeCorte || 5,
          activo: clienteReal.active !== false // Por defecto true si no viene
        });
      } catch (err) {
        setError('No se pudo encontrar la información del cliente. Es posible que el nombre sea incorrecto.', err);
      } finally {
        setCargandoDatos(false);
      }
    };
    cargarCliente();
  }, [nombreOriginalUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'paquete') {
      const paqueteSeleccionado = paquetesDisponibles.find(p => p.nombre === value);
      setFormData({
        ...formData,
        paquete: value,
        montoMensual: paqueteSeleccionado ? paqueteSeleccionado.precio : ''
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, activo: e.target.checked });
  };

  // 3. Enviar la actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    try {
      // Formateamos los datos para que el backend los reconozca
      const datosParaActualizar = {
        clienteId: formData.clienteId,
        name: formData.nombre,
        lastname: formData.apellido,
        phone: formData.telefono,
        reference: formData.referencias,
        paquete: formData.paquete,
        montoMensual: Number(formData.montoMensual),
        diaDeCorte: Number(formData.diaDeCorte),
        active: formData.activo
      };

      // Le pasamos el nombre original por si acaso lo modificó en el input
      await actualizarCliente(nombreOriginalUrl, datosParaActualizar);
      
      // Si funciona, volvemos a la tabla
      navigate('/admin/clientes');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar el cliente.');
      setGuardando(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="md">
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
          <Button component={Link} to="/admin/clientes" startIcon={<ArrowBackIcon />} sx={{ color: '#7f8c8d' }}>
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            {cargandoDatos ? 'Cargando...' : `Editar Cliente: ${formData.clienteId}`}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          
          {cargandoDatos ? (
            <Box>
              <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
            </Box>
          ) : (
            <>
              {/* === SECCIÓN 1: DATOS PERSONALES === */}
              <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold' }}>Datos Personales</Typography>
                
                <FormControlLabel
                  control={
                    <Switch checked={formData.activo} onChange={handleSwitchChange} color={formData.activo ? 'success' : 'error'} />
                  }
                  label={
                    <Typography fontWeight="bold" color={formData.activo ? '#27ae60' : '#e74c3c'}>
                      {formData.activo ? 'Servicio Activo' : 'Servicio Suspendido'}
                    </Typography>
                  }
                />
              </Box>
              <Divider sx={{ mb: 3, mt: -2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Nombre(s)" name="nombre" value={formData.nombre} onChange={handleChange} disabled={guardando} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Apellido(s)" name="apellido" value={formData.apellido} onChange={handleChange} disabled={guardando} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth label="Número de Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} disabled={guardando} />
                </Grid>
              </Grid>

              {/* === SECCIÓN 2: DATOS DEL SERVICIO === */}
              <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>Datos del Servicio</Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField select required fullWidth label="Paquete Contratado" name="paquete" value={formData.paquete} onChange={handleChange} disabled={guardando}>
                      {paquetesDisponibles.map((paquete) => (
                        <MenuItem key={paquete.nombre} value={paquete.nombre}>{paquete.nombre}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField required fullWidth label="Monto Mensual ($)" name="montoMensual" type="number" value={formData.montoMensual} onChange={handleChange} disabled={guardando} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField required fullWidth label="Día de Corte" name="diaDeCorte" type="number" value={formData.diaDeCorte} onChange={handleChange} disabled={guardando} inputProps={{ min: 1, max: 31 }} />
                  </Grid>
                </Grid>

                <TextField required fullWidth label="Referencias del Domicilio" name="referencias" multiline rows={3} value={formData.referencias} onChange={handleChange} disabled={guardando} />
              </Box>

              {/* === BOTONES === */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
                <Button variant="outlined" color="error" component={Link} to="/admin/clientes" disabled={guardando} sx={{ px: 4 }}>Cancelar</Button>
                <Button type="submit" variant="contained" startIcon={guardando ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, px: 4 }} disabled={guardando}>
                  {guardando ? 'Guardando...' : 'Actualizar Cliente'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default EditarCliente;