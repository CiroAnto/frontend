import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, MenuItem, Button, IconButton } from '@mui/material';
import { Close as CloseIcon, Send as SendIcon } from '@mui/icons-material';

const ModalFalla = ({ abierto, alCerrar, onReporteEnviado }) => {
  const [fallaData, setFallaData] = useState({ tipo: '', detalle: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onReporteEnviado(); 
    setFallaData({ tipo: '', detalle: '' }); // Limpia el formulario
  };

  return (
    <Dialog open={abierto} onClose={alCerrar} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#2c3e50', fontWeight: 'bold' }}>
        Reportar Falla
        <IconButton onClick={alCerrar} sx={{ color: '#7f8c8d' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, pb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
            Lamentamos los inconvenientes. Descríbenos el problema para ayudarte rápidamente.
          </Typography>

          <TextField
            select
            fullWidth
            required
            label="Tipo de Problema"
            value={fallaData.tipo}
            onChange={(e) => setFallaData({ ...fallaData, tipo: e.target.value })}
            sx={{ mb: 3 }}
          >
            <MenuItem value="sin_internet">No tengo Internet (Foco rojo/apagado)</MenuItem>
            <MenuItem value="lento">Internet muy lento o intermitente</MenuItem>
            <MenuItem value="modem">El módem hace ruido o está dañado</MenuItem>
            <MenuItem value="otro">Otro problema</MenuItem>
          </TextField>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Detalles (Opcional)"
            placeholder="Ej. El internet se va por las noches..."
            value={fallaData.detalle}
            onChange={(e) => setFallaData({ ...fallaData, detalle: e.target.value })}
          />
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button type="submit" variant="contained" fullWidth endIcon={<SendIcon />} sx={{ backgroundColor: '#3498db', py: 1.5, fontWeight: 'bold' }}>
            Generar Reporte
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalFalla;