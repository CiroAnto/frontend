import { useState } from 'react';
import { Box, Container, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';

// Importamos los componentes modulares
import NavbarCliente from '@/components/layout/NavbarCliente';
import TarjetasResumen from '@/pages/cliente/TarjetasResumen';
import ModalFalla from '@/pages/cliente/ModalFalla';

const historialPagosData = [
  { id: 1, mes: 'Abril 2026', fecha: '02/04/2026', monto: 499.00, metodo: 'Tarjeta Crédito' },
  { id: 2, mes: 'Marzo 2026', fecha: '04/03/2026', monto: 499.00, metodo: 'Transferencia' },
];

const PortalCliente = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alerta, setAlerta] = useState({ abierta: false, mensaje: '', tipo: 'success' });

  const manejarEnvioReporte = () => {
    setModalAbierto(false);
    setAlerta({ abierta: true, mensaje: 'Tu reporte ha sido enviado. Un técnico te contactará pronto.', tipo: 'success' });
  };

  const handlePagar = () => {
    setAlerta({ abierta: true, mensaje: 'Redirigiendo a la pasarela de pago seguro...', tipo: 'info' });
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      
      <NavbarCliente />

      <Container maxWidth="lg">
        
        {/* Cabecera */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            Resumen de tu cuenta
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f8c8d', mt: 1 }}>
            Número de suscriptor: <Box component="span" sx={{ color: '#3498db', fontWeight: 'bold' }}>IT-992834</Box>
          </Typography>
        </Box>

        {/* Tarjetas Superiores */}
        <TarjetasResumen 
          onAbrirSoporte={() => setModalAbierto(true)} 
          onPagar={handlePagar} 
        />

        {/* Tabla Historial (La dejamos aquí porque es pequeña y específica) */}
        <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 3 }}>
          Historial de Pagos
        </Typography>
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Mes</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Fecha de Pago</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Monto</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Método</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Comprobante</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historialPagosData.map((pago) => (
                <TableRow key={pago.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell fontWeight="bold">{pago.mes}</TableCell>
                  <TableCell>{pago.fecha}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#27ae60' }}>${pago.monto.toFixed(2)}</TableCell>
                  <TableCell>{pago.metodo}</TableCell>
                  <TableCell align="center">
                    <Button variant="text" startIcon={<PdfIcon />} sx={{ color: '#e74c3c', textTransform: 'none', fontWeight: 'bold' }}>
                      Descargar PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>

      {/* Componentes Flotantes */}
      <ModalFalla 
        abierto={modalAbierto} 
        alCerrar={() => setModalAbierto(false)} 
        onReporteEnviado={manejarEnvioReporte} 
      />

      <Snackbar open={alerta.abierta} autoHideDuration={5000} onClose={() => setAlerta({ ...alerta, abierta: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setAlerta({ ...alerta, abierta: false })} severity={alerta.tipo} sx={{ width: '100%', fontWeight: 'bold' }}>
          {alerta.mensaje}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default PortalCliente;