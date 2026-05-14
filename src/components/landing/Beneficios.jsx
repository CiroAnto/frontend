import { Box, Container, Typography, Paper, Fade } from '@mui/material';
import { 
  RocketLaunch as RocketIcon, 
  Engineering as SupportIcon, 
  InstallMobile as AppIcon 
} from '@mui/icons-material';

const beneficiosData = [
  {
    id: 1,
    titulo: 'Velocidad simétrica',
    descripcion: <>Sube y descarga archivos a la <strong>misma velocidad</strong> sin cuellos de botella, ideal para creadores de contenido.</>,
    icono: <RocketIcon sx={{ fontSize: 40, color: '#3498db' }} />,
    colorFondo: '#3498db1A'
  },
  {
    id: 2,
    titulo: 'Soporte local',
    descripcion: <>Nuestros técnicos están en tu ciudad, listos para resolver cualquier problema el <strong>mismo día</strong>, sin esperas largas.</>,
    icono: <SupportIcon sx={{ fontSize: 40, color: '#27ae60' }} />,
    colorFondo: '#27ae601A'
  },
  {
    id: 3,
    titulo: 'Gestión desde tu celular',
    descripcion: <>Paga tu servicio, consulta tu saldo o pide ayuda técnica directamente desde nuestro Portal de Cliente <strong>24/7</strong>.</>,
    icono: <AppIcon sx={{ fontSize: 40, color: '#8e44ad' }} />,
    colorFondo: '#8e44ad1A'
  }
];

const Beneficios = () => {
  return (
    <Box id="ventajas" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: '#2c3e50', mb: 2 }}>
            ¿Por qué escoger Internet <Box component="span" sx={{ color: '#3498db' }}>TECHNOLOGY</Box>?
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
            No solo te conectamos a la red, te brindamos una experiencia de servicio diseñada para tu tranquilidad.
          </Typography>
        </Box>

        {/* GRID SOLUCIONADO DEFINITIVO */}
        <Box
          sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      md: 'repeat(3, 1fr)'
    },
    gap: 4,
    alignItems: 'stretch'
  }}>
          {beneficiosData.map((beneficio, index) => (
            // 1. Grid item LIMPIO: Solo le decimos cuánto debe medir, sin ponerle "sx"
            <Box key={beneficio.id}>
              
              {/* 2. El Fade envuelve al Paper */}
              <Fade in={true} style={{ transitionDelay: `${index * 300}ms` }} timeout={1000}>
                
                {/* 3. El Paper es el que maneja todo el flexbox y la altura */}
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%', // Clave: Obliga a la tarjeta a estirarse sin romper el Grid
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    borderRadius: 4,
                    border: '1px solid #f0f0f0',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                      borderColor: '#e2e8f0'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 70, 
                      height: 70, 
                      mb: 3, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: beneficio.colorFondo,
                      borderRadius: '50%',
                      transition: 'transform 0.3s ease',
                      '.MuiPaper-root:hover &': {
                        transform: 'scale(1.1)' 
                      }
                    }}
                  >
                    {beneficio.icono}
                  </Box>

                  <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: '#1e293b', mb: 2 }}>
                    {beneficio.titulo}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#475569', 
                      lineHeight: 1.6,
                      fontWeight: 400,
                      '& strong': { color: '#0f172a', fontWeight: 700 }
                    }}
                  >
                    {beneficio.descripcion}
                  </Typography>
                  
                </Paper>
              </Fade>

            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
};

export default Beneficios;