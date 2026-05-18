import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider } from '@mui/material';
import { AccountBalance as BankIcon, CloudUpload as UploadIcon } from '@mui/icons-material';

const ModalPago = ({ abierto, alCerrar, cliente, onPagoSimulado }) => {
  if (!cliente) return null;

  return (
    <Dialog open={abierto} onClose={alCerrar} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
        Realizar Pago Mensual
      </DialogTitle>
      
      <DialogContent sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Total a pagar:
        </Typography>
        <Typography variant="h2" sx={{ color: '#27ae60', fontWeight: 'bold', mb: 3 }}>
          ${cliente.montoMensual?.toFixed(2)}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ backgroundColor: '#f8f9fa', p: 3, borderRadius: 2, textAlign: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BankIcon sx={{ color: '#3498db', mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">Datos para Transferencia</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">Banco: <strong>BBVA Bancomer</strong></Typography>
          <Typography variant="body2" color="text.secondary">CLABE: <strong>012 3456 7890 1234 567</strong></Typography>
          <Typography variant="body2" color="text.secondary">Concepto: <strong>{cliente.clienteId}</strong></Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          fullWidth 
          startIcon={<UploadIcon />}
          onClick={onPagoSimulado}
          sx={{ backgroundColor: '#3498db', py: 1.5, fontWeight: 'bold' }}
        >
          Ya pagué (Subir comprobante)
        </Button>
        <Button onClick={alCerrar} color="inherit" sx={{ fontWeight: 'bold' }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPago;