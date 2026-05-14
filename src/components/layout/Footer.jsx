import { Box, Container, Typography, Grid, IconButton, Link, Divider, Stack } from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" id="contacto" sx={{ backgroundColor: '#1e293b', color: '#f8f9fa', pt: 10, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          
          {/* COLUMNA 1: Branding y Descripción */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {/* Puedes cambiar esto por tu etiqueta <img /> del logo si lo prefieres */}
              <Box sx={{ width: 40, height: 40, backgroundColor: '#3498db', borderRadius: '50%', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                IT
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                Admin<Box component="span" sx={{ color: '#3498db' }}>IT</Box>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 3, pr: { md: 4 } }}>
              Somos una empresa dedicada a brindar la mejor experiencia de conectividad. Nuestro equipo de profesionales está comprometido con mantener tu hogar siempre en línea, a la máxima velocidad.
            </Typography>
            
            {/* REDES SOCIALES */}
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#3498db', backgroundColor: 'rgba(52, 152, 219, 0.1)' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#3498db', backgroundColor: 'rgba(52, 152, 219, 0.1)' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#e84393', backgroundColor: 'rgba(232, 67, 147, 0.1)' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#27ae60', backgroundColor: 'rgba(39, 174, 96, 0.1)' } }}>
                <WhatsAppIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* COLUMNA 2: Enlaces Rápidos */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
              Enlaces Rápidos
            </Typography>
            <Stack spacing={2}>
              {['Paquetes', 'Beneficios', 'Cobertura', 'Portal de Cliente'].map((link) => (
                <Link 
                  href={`#${link.toLowerCase()}`} 
                  key={link} 
                  underline="none" 
                  sx={{ 
                    color: '#94a3b8', 
                    transition: 'color 0.2s',
                    '&:hover': { color: '#3498db', transform: 'translateX(5px)' },
                    display: 'inline-block'
                  }}
                >
                  {link}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* COLUMNA 3: Contacto */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
              Contacto Directo
            </Typography>
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationIcon sx={{ color: '#3498db', mr: 2, mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.6 }}>
                  Av. Tecnológico #123, Col. Centro<br />
                  Ciudad, Estado, C.P. 90000
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#3498db', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  (800) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ color: '#3498db', mr: 2 }} />
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  soporte@internettechnology.com
                </Typography>
              </Box>
            </Stack>
          </Grid>

        </Grid>

        {/* LÍNEA DIVISORIA Y COPYRIGHT */}
        <Divider sx={{ mt: 8, mb: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#64748b', mb: { xs: 2, sm: 0 } }}>
            &copy; {new Date().getFullYear()} Internet TECHNOLOGY. Todos los derechos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="#" underline="none" sx={{ color: '#64748b', fontSize: '0.875rem', '&:hover': { color: 'white' } }}>
              Términos de Servicio
            </Link>
            <Link href="#" underline="none" sx={{ color: '#64748b', fontSize: '0.875rem', '&:hover': { color: 'white' } }}>
              Política de Privacidad
            </Link>
          </Stack>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;