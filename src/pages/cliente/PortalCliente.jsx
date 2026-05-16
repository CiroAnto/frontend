import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Snackbar, Alert, CircularProgress 
} from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import NavbarCliente from '@/components/layout/NavbarCliente';
import TarjetasResumen from '@/pages/cliente/TarjetasResumen';
import ModalFalla from '@/pages/cliente/ModalFalla';

import { obtenerClientes } from '@/services/clienteService';
import { obtenerTodosPagos } from '@/services/pagoService';

const PortalCliente = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alerta, setAlerta] = useState({ abierta: false, mensaje: '', tipo: 'success' });
  
  const [cliente, setCliente] = useState(null);
  const [historialPagos, setHistorialPagos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMiPortal = async () => {
      try {
        const folioCliente = localStorage.getItem('username');

        if (!folioCliente) {
          throw new Error("No se pudo identificar el folio del usuario en la sesión.");
        }

        const [todosLosClientes, todosLosPagos] = await Promise.all([
          obtenerClientes(),
          obtenerTodosPagos()
        ]);

        const miPerfil = todosLosClientes.find(c => c.clienteId === folioCliente);
        
        if (miPerfil) {
          setCliente(miPerfil);
          //buscar pagos
          const misPagos = todosLosPagos.filter(p => p.clienteId === miPerfil.clienteId);
          setHistorialPagos(misPagos);
        } else {
           throw new Error("No encontramos tu contrato de internet.");
        }

      } catch (error) {
        console.error("Error al cargar portal del cliente:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarMiPortal();
  }, []);
  const manejarEnvioReporte = () => {
    setModalAbierto(false);
    setAlerta({ abierta: true, mensaje: 'Tu reporte ha sido enviado. Un técnico te contactará pronto.', tipo: 'success' });
  };

  const handlePagar = () => {
    setAlerta({ abierta: true, mensaje: 'Redirigiendo a la pasarela de pago seguro...', tipo: 'info' });
  };

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', backgroundColor: '#f4f6f8' }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">Cargando tu portal de servicios...</Typography>
      </Box>
    );
  }
  if (!cliente) {
    return (
      <Box sx={{ p: 5, textAlign: 'center' }}>
        <Alert severity="error">No se encontró la información de tu contrato. Contacta a soporte.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <NavbarCliente />

      <Container maxWidth="lg">
        
        {/* cabecera */}
        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
            ¡Hola, {cliente.name}!
          </Typography>
          <Typography variant="h6" sx={{ color: '#7f8c8d', mt: 1 }}>
            Número de Folio: <Box component="span" sx={{ color: '#3498db', fontWeight: 'bold' }}>{cliente.clienteId}</Box>
          </Typography>
        </Box>

        {/* resumen */}
        <TarjetasResumen 
          cliente={cliente}
          onAbrirSoporte={() => setModalAbierto(true)} 
          onPagar={handlePagar} 
        />

        {/* historial*/}
        <Typography variant="h5" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 3, mt: 5 }}>
          Tu Historial de Pagos
        </Typography>
        
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Mes Correspondiente</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha de Pago</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Monto</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Método</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Comprobante</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historialPagos.length > 0 ? (
                historialPagos.map((pago) => (
                  <TableRow key={pago._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f9f9f9' } }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>{pago.mesCorrespondiente}</TableCell>
                    <TableCell>{new Date(pago.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#27ae60' }}>${pago.montoPagado.toFixed(2)}</TableCell>
                    <TableCell>{pago.metodoPago}</TableCell>
                    <TableCell align="center">
                      <Button variant="text" startIcon={<PdfIcon />} sx={{ color: '#e74c3c', textTransform: 'none', fontWeight: 'bold' }}>
                        Descargar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Aún no tienes pagos registrados en tu historial.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>

      {/* componentes */}
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