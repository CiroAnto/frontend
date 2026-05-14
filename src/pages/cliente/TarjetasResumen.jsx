import { Grid, Paper, Typography, Box, Chip, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Payment as PaymentIcon, SupportAgent as SupportAgentIcon } from '@mui/icons-material';

const TarjetasResumen = ({ onAbrirSoporte, onPagar }) => {
  return (
    <Grid container spacing={4} sx={{ mb: 6 }}>
      {/* Tarjeta 1: Estado */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid #27ae60', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50" align="center">Estado del Servicio</Typography>
          <Box sx={{ textAlign: 'center', my: 3 }}>
            <Chip icon={<CheckCircleIcon />} label="Activo" color="success" sx={{ fontSize: '1.2rem', py: 2.5, px: 2, fontWeight: 'bold' }} />
          </Box>
          <Typography align="center" color="text.secondary">
            Paquete: <Box component="span" fontWeight="bold" color="#2c3e50">Familiar 150 Mbps</Box>
          </Typography>
        </Paper>
      </Grid>

      {/* Tarjeta 2: Próximo Pago */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid #e67e22', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50" align="center">Próximo Pago</Typography>
          <Box sx={{ textAlign: 'center', my: 2 }}>
            <Typography variant="h3" fontWeight="bold" color="#2c3e50">$699.00</Typography>
            <Typography variant="subtitle1" fontWeight="bold" color="#e67e22" sx={{ mt: 1 }}>Vence: 05 de Mayo</Typography>
          </Box>
          <Button variant="contained" fullWidth startIcon={<PaymentIcon />} onClick={onPagar} sx={{ backgroundColor: '#3498db', py: 1.5, fontWeight: 'bold' }}>
            Pagar Ahora
          </Button>
        </Paper>
      </Grid>

      {/* Tarjeta 3: Soporte */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '5px solid #3498db', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50" align="center">Soporte Técnico</Typography>
          <Typography align="center" color="text.secondary" sx={{ my: 3 }}>
            ¿Tienes problemas con tu conexión o quieres cambiar tu contraseña?
          </Typography>
          <Button variant="contained" fullWidth startIcon={<SupportAgentIcon />} onClick={onAbrirSoporte} sx={{ backgroundColor: '#2c3e50', py: 1.5, fontWeight: 'bold' }}>
            Reportar Falla
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TarjetasResumen;