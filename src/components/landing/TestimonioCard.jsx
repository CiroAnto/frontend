import { Box, Typography, Paper, Avatar, Rating } from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';

const TestimonioCard = ({ testimonio }) => {
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
        width: '100%',
        height: '100%', // Clave para que se estire en el carrusel
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden', 
        borderRadius: 4,
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.06)'
        }
      }}
    >
      {/* COMILLAS DECORATIVAS EN EL FONDO */}
      <QuoteIcon 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20, 
          fontSize: 80, 
          color: '#f1f5f9', 
          transform: 'rotate(180deg)',
          zIndex: 0
        }} 
      />

      {/* CONTENIDO SUPERIOR */}
      <Box sx={{ position: 'relative', zIndex: 1, flexGrow: 1 }}>
        <Rating value={5} readOnly size="small" sx={{ color: '#f1c40f', mb: 2 }} />
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#475569', 
            fontStyle: 'italic',
            lineHeight: 1.7,
            mb: 4
          }}
        >
          "{testimonio.texto}"
        </Typography>
      </Box>

      {/* INFO DEL CLIENTE */}
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <Avatar 
          sx={{ 
            backgroundColor: testimonio.color, 
            fontWeight: 'bold',
            width: 48,
            height: 48,
            mr: 2
          }}
        >
          {testimonio.iniciales}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2 }}>
            {testimonio.nombre}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {testimonio.localidad}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TestimonioCard;