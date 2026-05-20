import { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Box, CircularProgress, Alert, IconButton, InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd as PersonAddIcon } from '@mui/icons-material';

const ModalNuevoAdmin = ({ abierto, alCerrar, onSubmit, cargando, error }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => setMostrarPassword(!mostrarPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClose = () => {
    if (!cargando) {
      setFormData({ fullName: '', username: '', email: '', password: '', role: 'admin' });
      alCerrar();
    }
  };

  return (
    <Dialog open={abierto} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <PersonAddIcon sx={{ mr: 1 }} />
        Registrar Nuevo Administrador
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="fullName"
              label="Nombre Completo"
              fullWidth
              required
              value={formData.fullName}
              onChange={handleChange}
              disabled={cargando}
            />
            <TextField
              name="username"
              label="Nombre de Usuario (Login)"
              fullWidth
              required
              value={formData.username}
              onChange={handleChange}
              disabled={cargando}
            />
            <TextField
              name="email"
              label="Correo Electrónico"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              disabled={cargando}
            />
            <TextField
              name="password"
              label="Contraseña"
              type={mostrarPassword ? 'text' : 'password'}
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              disabled={cargando}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {mostrarPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit" disabled={cargando} sx={{ fontWeight: 'bold' }}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={cargando}
            sx={{ backgroundColor: '#3498db', '&:hover': { backgroundColor: '#2980b9' }, fontWeight: 'bold' }}
          >
            {cargando ? <CircularProgress size={24} color="inherit" /> : 'Crear Administrador'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalNuevoAdmin;