import { Paper, Box, Typography, Divider, Grid, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Save as SaveIcon, VpnKey as VpnKeyIcon, Person as PersonIcon } from '@mui/icons-material';

const FormularioPerfil = ({ formData, onChange, onSubmit, cargando, errorValidacion }) => {
  return (
    <Paper component="form" onSubmit={onSubmit} sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
      
      {errorValidacion && (
        <Alert severity="error" sx={{ mb: 3, fontWeight: 'bold' }}>
          {errorValidacion}
        </Alert>
      )}

      {/* datos personales */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <PersonIcon sx={{ color: '#3498db' }} />
        <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Actualizar Datos Personales
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="Nombre Completo" name="nombre" value={formData.nombre} onChange={onChange} required disabled={cargando} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={onChange} required disabled={cargando} />
        </Grid>
      </Grid>

      {/* seguridad */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, mt: 5 }}>
        <VpnKeyIcon sx={{ color: '#e74c3c' }} />
        <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Seguridad
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Contraseña Actual" name="passActual" type="password" placeholder="********" value={formData.passActual} onChange={onChange} disabled={cargando} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Nueva Contraseña" name="passNueva" type="password" placeholder="********" value={formData.passNueva} onChange={onChange} disabled={cargando} />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          disabled={cargando}
          sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, px: 4 }}
        >
          {cargando ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </Box>
    </Paper>
  );
};

export default FormularioPerfil;