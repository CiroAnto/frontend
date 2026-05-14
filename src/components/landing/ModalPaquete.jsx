import { forwardRef } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, Typography, 
  IconButton, Divider, Grid, Box, Button, Zoom, Backdrop 
} from '@mui/material';
import { 
  Close as CloseIcon,
  Speed as SpeedIcon,
  Router as RouterIcon,
  SupportAgent as SupportIcon,
  CheckCircle as CheckCircleIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

// 1. Animación de entrada (Scale + Fade) nativa de MUI
const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

// 2. Componente de Icono con fondo circular (Duotone effect simulado)
const IconoConFondo = ({ icon: Icon, color }) => (
  <Box 
    sx={{ 
      backgroundColor: `${color}15`, // 15 = Transparencia (Hex Alpha)
      borderRadius: '50%', 
      p: 1.5, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      mr: 2,
      minWidth: 48, // Asegura que todos los iconos ocupen el mismo ancho
      minHeight: 48
    }}
  >
    <Icon sx={{ color: color, fontSize: 24 }} />
  </Box>
);

const ModalPaquete = ({ paquete, abierto, alCerrar }) => {
  if (!paquete) return null;

  return (
    <Dialog 
      open={abierto} 
      onClose={alCerrar}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition} // Aplicamos la animación
      keepMounted={false} // Destruye el DOM al cerrar para mejor rendimiento
      // 3. Efecto Glassmorphism en el fondo (Backdrop)
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(15, 23, 42, 0.4)', // Color oscuro base
            backdropFilter: 'blur(8px)', // Efecto de cristal
          },
        },
      }}
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          overflow: 'hidden', // Para que el botón inferior respete las curvas
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
        } 
      }}
    >
      {/* 4. Título y Botón de Cerrar Ampliado */}
      <DialogTitle sx={{ m: 0, p: { xs: 3, sm: 4 }, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2" fontWeight="800" color={paquete.color}>
          Detalles del {paquete.nombre}
        </Typography>
        <IconButton 
          onClick={alCerrar} 
          aria-label="Cerrar modal"
          sx={{ 
            color: '#7f8c8d', 
            // Área de clic accesible (min 44px)
            width: 48, 
            height: 48,
            backgroundColor: '#f8f9fa',
            '&:hover': { backgroundColor: '#e2e8f0', color: '#e74c3c', transform: 'rotate(90deg)', transition: '0.3s' } 
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider sx={{ mx: 4 }} />
      
      {/* 5. Contenido con más "Aire" (Padding incrementado) */}
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        
        {/* Precio Destacado en el cuerpo (Nueva recomendación) */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, p: 2, backgroundColor: '#f8f9fa', borderRadius: 3 }}>
           <IconoConFondo icon={MoneyIcon} color="#27ae60" />
           <Box>
             <Typography variant="subtitle2" color="text.secondary" textTransform="uppercase" fontWeight="bold">
               Inversión Mensual
             </Typography>
             <Typography variant="h4" fontWeight="800" color="#2c3e50">
               ${paquete.precio} <Typography component="span" variant="body1" color="text.secondary">/ mes</Typography>
             </Typography>
           </Box>
        </Box>

        <Typography variant="body1" sx={{ color: '#475569', mb: 5, fontSize: '1.1rem', lineHeight: 1.6 }}>
          {paquete.descripcion}
        </Typography>

        {/* 6. Cuadrícula Alineada y con Micro-interacciones visuales */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <IconoConFondo icon={SpeedIcon} color={paquete.color} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Velocidad</Typography>
                <Typography variant="body1" fontWeight="600" color="#1e293b">{paquete.velocidadSubida}</Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <IconoConFondo icon={RouterIcon} color={paquete.color} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Tecnología</Typography>
                <Typography variant="body1" fontWeight="600" color="#1e293b">{paquete.tecnologia}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <IconoConFondo icon={SupportIcon} color={paquete.color} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Soporte</Typography>
                <Typography variant="body1" fontWeight="600" color="#1e293b">Asistencia Premium</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <IconoConFondo icon={CheckCircleIcon} color={paquete.color} />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Términos</Typography>
                <Typography variant="body1" fontWeight="600" color="#1e293b">{paquete.contrato}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      {/* 7. Footer del Modal más limpio */}
      <DialogActions sx={{ p: { xs: 3, sm: 4 }, pt: 0, backgroundColor: 'white', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="large"
          fullWidth
          // AutoFocus cumple con tu requerimiento de Accesibilidad
          autoFocus
          onClick={() => {
            alCerrar();
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
          }}
          sx={{ 
            backgroundColor: paquete.color, 
            py: 1.8, 
            fontSize: '1.1rem',
            fontWeight: 'bold', 
            borderRadius: 3,
            boxShadow: `0 10px 20px ${paquete.color}40`, // Sombra del color del paquete
            '&:hover': { backgroundColor: paquete.color, filter: 'brightness(0.9)', transform: 'translateY(-2px)' },
            transition: 'all 0.2s'
          }}
        >
          Contratar Ahora
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPaquete;