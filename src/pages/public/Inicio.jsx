import { Box } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Beneficios from '@/components/landing/Beneficios';
import Paquetes from '@/components/landing/Paquetes';
import Cobertura from '@/components/landing/Cobertura';
import Testimonios from '@/components/landing/Testimonios';
import Faq from '@/components/landing/Faq';
import Footer from '@/components/layout/Footer';

const Inicio = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      
      <Hero />
      <Paquetes />
      <Cobertura />
      <Beneficios />
      <Testimonios />
      <Faq />
      
      <Footer />
    </Box>
  );
};

export default Inicio;