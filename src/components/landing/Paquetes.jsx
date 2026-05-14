import { useState } from 'react';
import { 
  Box, Container, Typography, Card, CardContent, CardActions, 
  Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  Star as StarIcon,
} from '@mui/icons-material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ModalPaquete from './ModalPaquete';

const paquetesData = [
  {
    id: 1,
    nombre: 'Básico 50 Mbps',
    descripcion: 'Navega, revisa tus redes y estudia sin problemas.',
    precio: '349',
    color: '#ff6b00',
    destacado: false,
    beneficios: ['Instalación sin costo', 'Módem doble banda', 'Soporte 24/7'],
    // Datos extra para el modal:
    velocidadSubida: '25 Mbps',
    tecnologia: 'Fibra Óptica FTTH',
    contrato: 'Sin plazo forzoso'
  },
  {
    id: 2,
    nombre: 'Familiar 150 Mbps',
    descripcion: 'Ideal para streaming en 4K y videojuegos en línea.',
    precio: '499',
    color: '#00b894',
    destacado: true,
    beneficios: ['Instalación sin costo', 'Módem Wi-Fi 6', 'Soporte prioritario', '1 Repetidor incluido'],
    velocidadSubida: '75 Mbps',
    tecnologia: 'Fibra Óptica FTTH + Wi-Fi 6',
    contrato: 'Plazo mínimo de 6 meses'
  },
  {
    id: 3,
    nombre: 'Gamer 300 Mbps',
    descripcion: 'Conexión extrema para descargas pesadas y trabajo remoto.',
    precio: '699',
    color: '#e84393',
    destacado: false,
    beneficios: ['Instalación rápida', 'Router Gamer', 'IP Pública dinámica'],
    velocidadSubida: '150 Mbps (Simétrico opcional)',
    tecnologia: 'Fibra Óptica Dedicada',
    contrato: 'Plazo mínimo de 12 meses'
  },
  {
    id: 4,
    nombre: 'Total 500 Mbps',
    descripcion: 'Para hogares inteligentes con múltiples dispositivos conectados.',
    precio: '899',
    color: '#8e44ad',
    destacado: false,
    beneficios: ['Instalación exprés', 'Módem Wi-Fi 6E', 'IP Pública fija', '2 Repetidores Mesh'],
    velocidadSubida: '250 Mbps',
    tecnologia: 'Fibra Óptica + Red Mesh',
    contrato: 'Plazo mínimo de 12 meses'
  }
];

const Paquetes = () => {
  // Estado para controlar el modal
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(null);

  const abrirModal = (paquete) => {
    setPaqueteSeleccionado(paquete);
  };

  const cerrarModal = () => {
    setPaqueteSeleccionado(null);
  };

  return (
    <Box id="paquetes" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: '#2c3e50', mb: 2 }}>
            Elige tu paquete ideal
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f8c8d', maxWidth: 600, mx: 'auto' }}>
            Desliza para ver todas nuestras opciones diseñadas para ti.
          </Typography>
        </Box>

        <Box sx={{ px: { xs: 2, md: 4 }, pb: 6 }}>
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation={true}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '50px', paddingTop: '20px' }}
          >
            {paquetesData.map((paquete) => (
              <SwiperSlide key={paquete.id} style={{ display: 'flex', height: 'auto' }}>
                <Card 
                  sx={{ 
                    width: '100%', display: 'flex', flexDirection: 'column', position: 'relative', borderRadius: 4,
                    boxShadow: paquete.destacado ? '0 15px 35px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
                    borderTop: `6px solid ${paquete.color}`, transition: 'all 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 20px 40px rgba(0,0,0,0.12)' },
                  }}
                >
                  {paquete.destacado && (
                    <Chip label="MÁS POPULAR" icon={<StarIcon sx={{ color: '#f1c40f !important' }} />} sx={{ position: 'absolute', top: 15, right: 15, backgroundColor: '#2c3e50', color: 'white', fontWeight: 'bold', borderRadius: 1, zIndex: 2 }} />
                  )}

                  <CardContent sx={{ flexGrow: 1, p: 4, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 800, color: paquete.color, mb: 1 }}>{paquete.nombre}</Typography>
                    <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 3, minHeight: 40 }}>{paquete.descripcion}</Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', mr: 0.5 }}>$</Typography>
                      <Typography variant="h2" sx={{ fontWeight: 800, color: '#2c3e50' }}>{paquete.precio}</Typography>
                      <Typography variant="subtitle1" sx={{ color: '#7f8c8d', ml: 1 }}>/mes</Typography>
                    </Box>

                    <List sx={{ mb: 2 }}>
                      {paquete.beneficios.map((beneficio, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}><CheckCircleIcon sx={{ color: paquete.color, fontSize: 20 }} /></ListItemIcon>
                          <ListItemText primary={beneficio} primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: '#2c3e50' }} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>

                  <CardActions sx={{ p: 4, pt: 0, mt: 'auto' }}>
                    <Button 
                      fullWidth variant={paquete.destacado ? "contained" : "outlined"} size="large"
                      onClick={() => abrirModal(paquete)} // ACA ABRIMOS EL MODAL
                      sx={{ 
                        borderRadius: 2, py: 1.5, fontWeight: 'bold',
                        ...(paquete.destacado ? { backgroundColor: paquete.color, '&:hover': { backgroundColor: paquete.color, filter: 'brightness(0.9)' } } : { color: paquete.color, borderColor: paquete.color, '&:hover': { backgroundColor: `${paquete.color}10`, borderColor: paquete.color } })
                      }}
                    >
                      {paquete.destacado ? 'Contratar Ahora' : 'Saber más'}
                    </Button>
                  </CardActions>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <ModalPaquete 
          paquete={paqueteSeleccionado} 
          abierto={Boolean(paqueteSeleccionado)} 
          alCerrar={cerrarModal} 
        />
        
      </Container>
    </Box>
  );
};

export default Paquetes;