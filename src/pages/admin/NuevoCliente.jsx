import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid, TextField, Button, CircularProgress, Divider, MenuItem, Alert } from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { crearCliente } from '@/services/clienteService';

//catalogo, puede cambiar
const paquetesDisponibles = [
  { nombre: 'Básico 50 Mbps', precio: 350 },
  { nombre: 'Familiar 150 Mbps', precio: 450 },
  { nombre: 'Gamer 500 Mbps', precio: 800 },
  { nombre: 'Empresarial 1 Gbps', precio: 1200 }
];

const NuevoCliente = () => {
  //campos
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    referencias: '',
    paquete: '',
    montoMensual: '',
    diaDeCorte: 5 //por defecto cobran los días 5
  });
  
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null); // Estado para mostrar errores del backend
  const navigate = useNavigate();

  //generar id automatico y aleatorio
  const generarFolio = () => {
    const aleatorio = Math.floor(10000000 + Math.random() * 90000000);
    return `D${aleatorio}`;
  };

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
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      //empaque de datos para el backend
      const datosParaBackend = {
        clienteId: generarFolio(),
        name: formData.nombre,
        lastname: formData.apellido,
        phone: formData.telefono,
        reference: formData.referencias,
        paquete: formData.paquete,
        montoMensual: Number(formData.montoMensual),
        diaDeCorte: Number(formData.diaDeCorte)
      };

      console.log("Enviando al backend:", datosParaBackend);
      
      //servicio para crear cliente
      await crearCliente(datosParaBackend);

      //regresa a la lista de clientes al guardar
      navigate('/admin/clientes');

    } catch (err) {
      console.error(err);
      //mensaje de error de Zod o Mongoose para mostrarlo en pantalla
      setError(err.response?.data?.message || 'Ocurrió un error al guardar el cliente. Revisa los datos.');
      setCargando(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="md">
        
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, mt: 4 }}>
          <Button component={Link} to="/admin/clientes" startIcon={<ArrowBackIcon />}
            sx={{ color: '#7f8c8d' }}
          >
            Volver
          </Button>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            Registrar Nuevo Cliente
          </Typography>
        </Box>

        <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          
          {/*mostrar error*/}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* datos personales */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
              Datos Personales
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Box>
                <TextField required fullWidth label="Nombre(s)" name="nombre" value={formData.nombre} onChange={handleChange} disabled={cargando} />
              </Box>
              <Box>
                <TextField required fullWidth label="Apellido(s)" name="apellido" value={formData.apellido} onChange={handleChange} disabled={cargando} />
              </Box>
              <Box>
                <TextField required fullWidth label="Número de Teléfono" name="telefono" type="tel" placeholder="Ej. 779879852" value={formData.telefono} onChange={handleChange} disabled={cargando} />
              </Box>
            </Grid>
          </Box>

          {/* datos del servicio */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#3498db', fontWeight: 'bold', mb: 1 }}>
              Datos del Servicio
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{display: 'grid', gridTemplateColumns:{xs: '1fr', md: '2fr 1fr 0.8fr'}, gap: 3, mb: 3}}>
              {/* paquete*/}
              <Grid item xs={12} md={7}>
                <TextField select required fullWidth label="Paquete Contratado" name="paquete" value={formData.paquete}
                  onChange={handleChange}
                  disabled={cargando} SelectProps={{displayEmpty: true}} InputLabelProps={{ shrink: true }}>
                  {paquetesDisponibles.map((paquete) => (
                    <MenuItem key={paquete.nombre} value={paquete.nombre}>
                      {paquete.nombre} - ${paquete.precio} MXN
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/*monto mensual*/}
              <Grid item xs={12} md={3}>
                <TextField required fullWidth label="Monto Mensual ($)" name="montoMensual" type="number" value={formData.montoMensual} onChange={handleChange} disabled={cargando} />
              </Grid>

              {/* dia corte*/}
              <Grid item xs={12} md={2}>
                <TextField required fullWidth label="Día de Corte" name="diaDeCorte" type="number" value={formData.diaDeCorte} onChange={handleChange} disabled={cargando} inputProps={{ min: 1, max: 31 }} />
              </Grid>
            </Box>

            {/* referencias*/}
            <TextField required fullWidth label="Referencias del Domicilio" name="referencias" multiline rows={3}
              placeholder="Ej. Casa roja de dos pisos con portón blanco, frente a la tienda."
              value={formData.referencias}
              onChange={handleChange}
              disabled={cargando}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
            <Button variant="outlined" color="error" component={Link} to="/admin/clientes" disabled={cargando} sx={{ px: 4 }}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, px: 4 }}
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Guardar Cliente'}
            </Button>
          </Box>
          
        </Paper>
      </Container>
    </Box>
  );
};

export default NuevoCliente;