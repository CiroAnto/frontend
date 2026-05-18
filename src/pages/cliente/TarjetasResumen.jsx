import { Grid, Paper, Typography, Box, Chip, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Payment as PaymentIcon, SupportAgent as SupportAgentIcon, Cancel as CancelIcon } from '@mui/icons-material';

const TarjetasResumen = ({ cliente, historialPagos = [], onAbrirSoporte, onPagar }) => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const mesActualNombre = meses[new Date().getMonth()];
  const anioActual = new Date().getFullYear();
  
  if (!cliente) return null;

  const diaCorte = String(cliente.diaDeCorte || 5).padStart(2, '0');
  const mesActualStr = `${mesActualNombre} ${anioActual}`;
  const yaPagoEsteMes = historialPagos.some(pago => pago.mesCorrespondiente === mesActualStr);

  return (
    <Grid container spacing={4} sx={{ mb: 6 }}>
      
      {/* tarjeta estado */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: cliente.active ? '5px solid #27ae60' : '5px solid #e74c3c', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50" align="center">Estado del Servicio</Typography>
          <Box sx={{ textAlign: 'center', my: 3 }}>
            {cliente.active ? (
              <Chip icon={<CheckCircleIcon />} label="Activo" color="success" sx={{ fontSize: '1.2rem', py: 2.5, px: 2, fontWeight: 'bold' }} />
            ) : (
              <Chip icon={<CancelIcon />} label="Suspendido" color="error" sx={{ fontSize: '1.2rem', py: 2.5, px: 2, fontWeight: 'bold' }} />
            )}
          </Box>
          <Typography align="center" color="text.secondary">
            Paquete: <Box component="span" fontWeight="bold" color="#2c3e50">{cliente.paquete}</Box>
          </Typography>
        </Paper>
      </Grid>

      {/* tarjeta proximo pago*/}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: yaPagoEsteMes ? '5px solid #27ae60' : '5px solid #e67e22', borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Typography variant="h6" fontWeight="bold" color="#2c3e50" align="center">
            {yaPagoEsteMes ? 'Mensualidad Cubierta' : 'Próximo Pago'}
          </Typography>
          
          <Box sx={{ textAlign: 'center', my: 2 }}>
            {yaPagoEsteMes ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 50, color: '#27ae60', mb: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="#27ae60">¡Todo al día!</Typography>
                <Typography variant="subtitle2" color="text.secondary">Gracias por tu pago</Typography>
              </Box>
            ) : (
              <>
                <Typography variant="h3" fontWeight="bold" color="#2c3e50">
                  ${cliente.montoMensual ? cliente.montoMensual.toFixed(2) : '0.00'}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" color="#e67e22" sx={{ mt: 1 }}>
                  Vence: {diaCorte} de {mesActualNombre}
                </Typography>
              </>
            )}
          </Box>

          <Button 
            variant="contained" 
            fullWidth 
            startIcon={yaPagoEsteMes ? <CheckCircleIcon /> : <PaymentIcon />} 
            onClick={onPagar} 
            disabled={yaPagoEsteMes}
            sx={{ 
              backgroundColor: yaPagoEsteMes ? '#ecf0f1' : '#3498db', 
              color: yaPagoEsteMes ? '#7f8c8d' : 'white',
              py: 1.5, 
              fontWeight: 'bold',
              '&:hover': { backgroundColor: yaPagoEsteMes ? '#ecf0f1' : '#2980b9' }
            }}
          >
            {yaPagoEsteMes ? 'Mes Pagado' : 'Pagar Ahora'}
          </Button>
        </Paper>
      </Grid>

      {/* tarjeta soporte*/}
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