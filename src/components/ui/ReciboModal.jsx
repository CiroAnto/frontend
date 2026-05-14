import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { Receipt as ReceiptIcon, Print as PrintIcon, Close as CloseIcon } from '@mui/icons-material';

const ReciboModal = ({ abierto, alCerrar, recibo }) => {
  
  const imprimirRecibo = () => {
    window.print(); 
  };

  return (
    <Dialog 
      open={abierto} 
      onClose={alCerrar}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      {/* Solo renderizamos el contenido si el objeto "recibo" tiene datos */}
      {recibo && (
        <>
          <DialogTitle sx={{ backgroundColor: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ReceiptIcon /> Recibo de Pago
            </Box>
            <Button onClick={alCerrar} sx={{ color: 'white', minWidth: 'auto', p: 0 }}>
              <CloseIcon />
            </Button>
          </DialogTitle>
          
          <DialogContent sx={{ mt: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <img src="/images/internet.jpg" alt="Logo" width="60" style={{ borderRadius: '50%', marginBottom: '10px' }} />
              <Typography variant="h5" fontWeight="bold" color="#2c3e50">Internet TECHNOLOGY</Typography>
              <Typography variant="body2" color="text.secondary">Comprobante de Servicio</Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Folio:</Typography>
              <Typography fontWeight="bold">{recibo.folio}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Fecha de Pago:</Typography>
              <Typography>{recibo.fechaPago}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Cliente:</Typography>
              <Typography>{recibo.nombre} (ID: #{recibo.idCliente})</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography color="text.secondary">Método de Pago:</Typography>
              <Typography>{recibo.metodo}</Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed', mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', p: 2, borderRadius: 2 }}>
              <Typography fontWeight="bold" color="#2c3e50">Mes Cobrado:</Typography>
              <Typography fontWeight="bold" color="#3498db">{recibo.mes}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, px: 2 }}>
              <Typography variant="h6" fontWeight="bold" color="#2c3e50">TOTAL PAGADO</Typography>
              <Typography variant="h5" fontWeight="bold" color="#27ae60">${recibo.monto.toFixed(2)} MXN</Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
            <Button onClick={imprimirRecibo} variant="contained" startIcon={<PrintIcon />} sx={{ backgroundColor: '#3498db' }}>
              Imprimir Recibo
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ReciboModal;