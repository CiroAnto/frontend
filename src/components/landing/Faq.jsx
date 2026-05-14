import { useState } from 'react';
import { 
  Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button 
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon, 
  LiveHelp as HelpIcon,
  EventAvailable as CalendarIcon,
  AccessTime as TimeIcon,
  Payments as MoneyIcon,
  SyncAlt as SwapIcon,
  QuestionAnswer as ChatIcon
} from '@mui/icons-material';

// Añadimos la propiedad 'icono' a nuestra data
const faqData = [
  {
    id: 'panel1',
    pregunta: "¿Tienen plazos forzosos de contratación?",
    respuesta: "No, en Internet TECHNOLOGY confiamos tanto en la calidad de nuestro servicio que no te obligamos a firmar plazos forzosos. Puedes cancelar cuando lo desees sin penalizaciones.",
    icono: <CalendarIcon />
  },
  {
    id: 'panel2',
    pregunta: "¿Cuánto tiempo tarda la instalación?",
    respuesta: "Una vez que verificamos tu cobertura y agendas tu cita, nuestros técnicos suelen realizar la instalación en un plazo máximo de 24 a 48 horas hábiles.",
    icono: <TimeIcon />
  },
  {
    id: 'panel3',
    pregunta: "¿Qué incluye el costo de instalación?",
    respuesta: "El costo incluye la visita del técnico, el cableado de fibra óptica hasta tu domicilio, y un módem router de doble banda configurado y listo para usarse.",
    icono: <MoneyIcon />
  },
  {
    id: 'panel4',
    pregunta: "¿Puedo cambiar de paquete después de contratar?",
    respuesta: "¡Por supuesto! Puedes subir o bajar la velocidad de tu paquete en cualquier momento desde tu Portal de Cliente o llamando a nuestro centro de atención.",
    icono: <SwapIcon />
  }
];

const Faq = () => {
  const [panelExpandido, setPanelExpandido] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setPanelExpandido(isExpanded ? panel : false);
  };

  return (
    <Box id="faq" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
      <Container maxWidth="md"> 
        
        {/* ENCABEZADO */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box 
            sx={{ 
              width: 80, height: 80, mx: 'auto', mb: 3, 
              backgroundColor: '#e3f2fd', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}
          >
            <HelpIcon sx={{ fontSize: 40, color: '#3498db' }} />
          </Box>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: '#2c3e50', mb: 2 }}>
            Preguntas Frecuentes
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 400 }}>
            Resolvemos tus dudas principales para que contrates con total seguridad.
          </Typography>
        </Box>

        {/* CONTENEDOR DE ACORDEONES */}
        <Box sx={{ mb: 6 }}>
          {faqData.map((item) => (
            <Accordion
              key={item.id}
              expanded={panelExpandido === item.id}
              onChange={handleChange(item.id)}
              sx={{
                mb: 2,
                borderRadius: '12px !important',
                // Borde sutil solo cuando está cerrado
                border: panelExpandido === item.id ? '1px solid transparent' : '1px solid #e2e8f0',
                '&:before': { display: 'none' }, 
                transition: 'all 0.3s ease',
                overflow: 'hidden', // Evita que el color de fondo rompa las esquinas redondeadas
                boxShadow: panelExpandido === item.id
                ? '0 10px 30px rgba(0, 0, 0, 0.08)'
                : 'none',
              }}
            >
              {/* LA PREGUNTA (Botón) */}
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: panelExpandido === item.id ? '#3498db' : '#94a3b8' }} />}
                sx={{ 
                  p: 3,
                  // Fondo azul ultra suave cuando el acordeón está activo
                  borderRadius: panelExpandido === item.id
                  ? '12px 12px 0 0'
                  : '12px',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Icono descriptivo al lado del título */}
                  <Box 
                    sx={{ 
                      mr: 2, 
                      display: 'flex', 
                      color: panelExpandido === item.id ? '#3498db' : '#94a3b8',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {item.icono}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600, 
                      color: panelExpandido === item.id ? '#3498db' : '#1e293b',
                      fontSize: '1.1rem'
                    }}
                  >
                    {item.pregunta}
                  </Typography>
                </Box>
              </AccordionSummary>
              
              {/* LA RESPUESTA (Contenido) */}
              <AccordionDetails sx={{ px: { xs: 3, sm: 6 }, pb: 4, pt: 2 }}>
                <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                  {item.respuesta}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* SECCIÓN DE CIERRE (CTA DE SOPORTE) */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            p: 5, 
            backgroundColor: '#f8f9fa', 
            borderRadius: 4, 
            border: '1px dashed #cbd5e1' 
          }}
        >
          <Typography variant="h5" sx={{ color: '#1e293b', mb: 1, fontWeight: 700 }}>
            ¿Aún tienes dudas?
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
            Nuestro equipo de soporte técnico y ventas está listo para ayudarte en tiempo real.
          </Typography>
          <Button 
            variant="outlined" 
            size="large" 
            startIcon={<ChatIcon />} 
            sx={{ 
              borderWidth: 2, 
              borderColor: '#3498db', 
              color: '#3498db', 
              fontWeight: 'bold', 
              px: 4,
              py: 1.5,
              borderRadius: 2, 
              '&:hover': { 
                borderWidth: 2, 
                borderColor: '#2980b9',
                backgroundColor: '#f0f7ff' 
              } 
            }}
          >
            Chatea con nosotros
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default Faq;