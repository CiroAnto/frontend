import { Box, Container, Typography } from '@mui/material';

// Importamos Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import TestimonioCard from './TestimonioCard';

const testimoniosData = [
  { 
    id: 1, nombre: "Carlos Mendoza", localidad: "Col. Centro", iniciales: "CM", color: '#3498db',
    texto: "Excelente servicio. La fibra óptica es súper estable y me instalaron el mismo día que llamé. Lo recomiendo al 100% para trabajo remoto." 
  },
  { 
    id: 2, nombre: "Ana Lucía Torres", localidad: "Col. 5 de Octubre", iniciales: "AT", color: '#e84393',
    texto: "Por fin puedo hacer mis videollamadas de la escuela sin que se trabe el internet. El soporte técnico es muy amable y rápido." 
  },
  { 
    id: 3, nombre: "Ricardo Silva", localidad: "Residencial", iniciales: "RS", color: '#27ae60',
    texto: "Contraté el paquete Gamer y los juegos cargan rapidísimo. La latencia es bajísima, no he tenido nada de lag jugando en línea." 
  },
  { 
    id: 4, nombre: "Mariana Ríos", localidad: "Zona Norte", iniciales: "MR", color: '#8e44ad',
    texto: "Llevaba años sufriendo con otra compañía. El cambio a Internet TECHNOLOGY fue la mejor decisión, la app móvil es súper útil para pagar." 
  },
  { 
    id: 5, nombre: "Familia Gómez", localidad: "Fraccionamiento Las Palmas", iniciales: "FG", color: '#f39c12',
    texto: "Tenemos 4 pantallas conectadas, celulares y computadoras al mismo tiempo y el plan Familiar aguanta todo sin despeinarse." 
  }
];

const Testimonios = () => {
  return (
    <Box id="testimonios" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        
        {/* ENCABEZADO */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: '#2c3e50', mb: 2 }}>
            Lo que dicen nuestros clientes
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
            Cientos de familias ya disfrutan de la mejor conexión. Únete a la comunidad de Internet TECHNOLOGY.
          </Typography>
        </Box>

        {/* CARRUSEL DE TESTIMONIOS */}
        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            breakpoints={{
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '60px' }} // Espacio para los dots de paginación
          >
            {testimoniosData.map((testimonio) => (
              <SwiperSlide key={testimonio.id} style={{ display: 'flex', height: 'auto' }}>
                <TestimonioCard testimonio={testimonio} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

      </Container>
    </Box>
  );
};

export default Testimonios;