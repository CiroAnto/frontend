import { Box, Container, Typography, Button, Stack, Chip, Fade, Slide } from '@mui/material';
import { Speed as SpeedIcon, SupportAgent as SupportIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const Hero = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #3498db 100%)', // Degradado ligeramente más oscuro para mayor contraste
        color: 'white',
        pt: { xs: 12, md: 18 }, // Más espacio superior para que no choque con el Navbar
        pb: { xs: 15, md: 20 }, // Extra padding inferior para la onda
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: {
          xs: '1fr',
          md: '1.2fr 0.8fr'},
          gap: { xs: 6, md: 8 },
          alignItems: 'center'
        }}>
          
          {/*COLUMNA IZQUIERDA: Textos y Botones Animados*/}
          <Box>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    textShadow: '0px 4px 15px rgba(0,0,0,0.2)' // Sutil sombra para que el texto resalte más
                  }}
                >
                  La velocidad que tu hogar <Box component="span" sx={{ color: '#f1c40f' }}>necesita</Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ mb: 4, fontWeight: 400, opacity: 0.9, lineHeight: 1.6, maxWidth: 600 }}
                >
                  Disfruta de fibra óptica de alta velocidad, sin interrupciones y con el mejor soporte técnico 24/7.
                </Typography>
              </Box>
            </Fade>

            <Slide direction="up" in={true} timeout={1200}>
              <Box>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="#paquetes"
                    endIcon={<SpeedIcon />}
                    sx={{
                      backgroundColor: '#f1c40f',
                      color: '#2c3e50',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      // Efecto Pulse
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(241, 196, 15, 0.7)' },
                        '70%': { boxShadow: '0 0 0 15px rgba(241, 196, 15, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(241, 196, 15, 0)' }
                      },
                      '&:hover': { backgroundColor: '#f39c12', animation: 'none', transform: 'scale(1.05)', transition: '0.3s' }
                    }}
                  >
                    Ver Paquetes
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="#soporte"
                    startIcon={<SupportIcon />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Soporte Técnico
                  </Button>
                </Stack>

                {/* Etiquetas de Confianza */}
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Chip 
                    icon={<CheckCircleIcon sx={{ color: '#2ecc71 !important' }} />} 
                    label="Fibra Óptica Real" 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, backdropFilter: 'blur(4px)' }} 
                  />
                  <Chip 
                    icon={<CheckCircleIcon sx={{ color: '#2ecc71 !important' }} />} 
                    label="Instalación Rápida" 
                    sx={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, backdropFilter: 'blur(4px)' }} 
                  />
                </Stack>
              </Box>
            </Slide>
          </Box>

          {/*COLUMNA DERECHA: Imagen/Ilustración*/}
          <Box
  sx={{
    display: { xs: 'none', md: 'flex' },
    justifyContent: 'center'
  }}>
            <Fade in={true} timeout={1500}>
              <Box
                component="img"
                src="/images/internet.jpg" 
                alt="Conexión de Alta Velocidad"
                sx={{
                  width: '100%',
                  maxWidth: 380,
                  borderRadius: '50%',
                  border: '8px solid rgba(255,255,255,0.1)', // Marco sutil translúcido
                  boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                  }
                }}
              />
            </Fade>
          </Box>

        </Box>
      </Container>

      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: -1, // Evita líneas blancas indeseadas en algunos navegadores
          left: 0, 
          width: '100%', 
          overflow: 'hidden', 
          lineHeight: 0 
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: 'block', width: 'calc(100% + 1.3px)', height: '80px' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,195.9,103.55Q258.64,88.45,321.39,56.44Z" fill="#f8f9fa"></path>
        </svg>
      </Box>
    </Box>
  );
};

export default Hero;