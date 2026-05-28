import { Paper, Box, Typography, Button } from '@mui/material';

const TarjetaPerfil = ({ nombre, username, onLogout }) => {
  return (
    <Paper sx={{ p: 4, borderRadius: 3, textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', height: '100%' }}>
      <Box sx={{ 
        width: 120, height: 120, borderRadius: '50%', backgroundColor: '#e0e6ed', 
        margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
      }}>
        <img src="/images/internet.jpg" alt="Foto de Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      
      <Typography variant="h5" fontWeight="bold" color="#2c3e50">
        {nombre}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Gerente de Operaciones
      </Typography>
      <Typography variant="body2" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        @{username}
      </Typography>
      
      <Button 
        variant="outlined" 
        color="error" 
        fullWidth 
        sx={{ borderRadius: 2 }}
        onClick={onLogout}
      >
        Cerrar Sesión
      </Button>
    </Paper>
  );
};

export default TarjetaPerfil;