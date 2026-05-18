import { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Typography, Box, TextField, MenuItem, Button, CircularProgress 
} from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import { registrarPago } from '@/services/pagoService';

const RegistrarPagoModal = ({ abierto, cerrarModal, cliente, mesActualStr, onPagoExitoso }) => {
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [procesando, setProcesando] = useState(false);

  const confirmarPago = async () => {
    if (!cliente) return;
    setProcesando(true);
    
    try {
      const datosPago = {
        clienteId: cliente.clienteId,
        mesCorrespondiente: mesActualStr,
        montoPagado: Number(cliente.montoMensual || 0),
        metodoPago: metodoPago
      };

      // Mandamos el pago al backend
      await registrarPago(datosPago);

      // Avisamos a la pantalla principal que fue un éxito
      onPagoExitoso(cliente);
      cerrarModal();
      
      // Reseteamos el estado para el próximo cobro
      setMetodoPago('Efectivo');
    } catch (error) {
      console.error("Error al procesar el pago", error);
      alert("Hubo un error al registrar el pago.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <Dialog open={abierto} onClose={procesando ? undefined : cerrarModal} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f4f6f8', pb: 2 }}>
        Registrar Pago
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {cliente && (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" color="primary" fontWeight="bold">
              {cliente.name} {cliente.lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Folio: {cliente.clienteId} | Mes: {mesActualStr}
            </Typography>
            <Typography variant="h3" sx={{ color: '#27ae60', fontWeight: 'bold', mt: 2 }}>
              ${cliente.montoMensual ? cliente.montoMensual.toFixed(2) : '0.00'}
            </Typography>
          </Box>
        )}

        <TextField
          select
          fullWidth
          label="Método de Pago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          disabled={procesando}
        >
          <MenuItem value="Efectivo">Efectivo</MenuItem>
          <MenuItem value="Transferencia">Transferencia Bancaria</MenuItem>
          <MenuItem value="Tarjeta">Tarjeta de Crédito/Débito</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
        <Button onClick={cerrarModal} color="inherit" disabled={procesando}>
          Cancelar
        </Button>
        <Button 
          onClick={confirmarPago} 
          variant="contained" 
          sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, px: 4 }}
          disabled={procesando}
          startIcon={procesando ? <CircularProgress size={20} color="inherit" /> : <CheckIcon />}
        >
          {procesando ? 'Procesando...' : 'Confirmar Cobro'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrarPagoModal;