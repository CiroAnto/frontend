import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, CircularProgress 
} from '@mui/material';
import { Receipt as ReceiptIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

import AdminNavbar from '@/components/layout/AdminNavbar';
import BarraBusqueda from '@/components/ui/BarraBusqueda';
import ReciboModal from '@/components/ui/ReciboModal';

// Importamos los servicios para traer la información real
import { obtenerClientes } from '@/services/clienteService';
import { obtenerTodosPagos } from '@/services/pagoService';

const PagosCompletados = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [pagosRealizados, setPagosRealizados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        // 1. Descargamos ambas listas al mismo tiempo para ahorrar tiempo
        const [dataPagos, dataClientes] = await Promise.all([
          obtenerTodosPagos(),
          obtenerClientes()
        ]);

        if (Array.isArray(dataPagos)) {
          // 2. Cruzamos la información: Le pegamos el nombre del cliente al recibo
          const historialFormateado = dataPagos.map(pago => {
            const clienteAsociado = Array.isArray(dataClientes) 
              ? dataClientes.find(c => c.clienteId === pago.clienteId) 
              : null;

            return {
              id: pago._id, // El ID de Mongo para la "key" de React
              folio: pago._id.toString().slice(-6).toUpperCase(), // Un folio corto inventado para el ticket
              idCliente: pago.clienteId,
              // Si el cliente fue borrado, ponemos "Desconocido"
              nombre: clienteAsociado ? `${clienteAsociado.name} ${clienteAsociado.lastname}` : 'Cliente Borrado',
              mes: pago.mesCorrespondiente,
              monto: pago.montoPagado,
              // Convertimos la fecha de Mongo (createdAt) a un formato legible (DD/MM/YYYY)
              fechaPago: new Date(pago.createdAt).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' }),
              metodo: pago.metodoPago || 'Efectivo'
            };
          });

          setPagosRealizados(historialFormateado);
        }
      } catch (error) {
        console.error('Error al cargar el historial de pagos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarHistorial();
  }, []);

  // Filtrado en tiempo real
  const pagosFiltrados = pagosRealizados.filter((pago) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      pago.nombre.toLowerCase().includes(busqueda) || 
      pago.idCliente.toLowerCase().includes(busqueda) ||
      pago.mes.toLowerCase().includes(busqueda) ||
      pago.metodo.toLowerCase().includes(busqueda)
    );
  });

  const getMetodoChip = (metodo) => {
    switch (metodo) {
      case 'Efectivo':
        return <Chip label={metodo} color="success" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />;
      case 'Transferencia':
        return <Chip label={metodo} color="info" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />;
      case 'Tarjeta':
        return <Chip label={metodo} color="secondary" variant="outlined" size="small" sx={{ fontWeight: 'bold' }} />;
      default:
        return <Chip label={metodo} size="small" />;
    }
  };

  const abrirRecibo = (pago) => {
    setReciboSeleccionado(pago);
    setModalAbierto(true);
  };

  const cerrarRecibo = () => {
    setModalAbierto(false);
    setTimeout(() => setReciboSeleccionado(null), 300);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              Historial de Pagos <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 30 }} />
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
              Facturas cobradas exitosamente
            </Typography>
          </Box>
        </Box>

        <BarraBusqueda 
          valor={terminoBusqueda} 
          alCambiar={(e) => setTerminoBusqueda(e.target.value)} 
          placeholder="Buscar por cliente, ID, mes o método de pago..." 
        />

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de pagos completados">
            
            <TableHead sx={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID Cliente</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mes Cobrado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Monto</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha de Pago</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Método</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {cargando ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2, color: '#7f8c8d' }}>Cargando historial de transacciones...</Typography>
                  </TableCell>
                </TableRow>
              ) : pagosFiltrados.length > 0 ? (
                pagosFiltrados.map((pago) => (
                  <TableRow 
                    key={pago.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: '#3498db' }}>
                      {pago.idCliente}
                    </TableCell>
                    <TableCell sx={{ fontWeight: '500' }}>{pago.nombre}</TableCell>
                    <TableCell>{pago.mes}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                      $ {pago.monto.toFixed(2)} MXN
                    </TableCell>
                    <TableCell sx={{ color: '#27ae60', fontWeight: 'bold' }}>
                      {pago.fechaPago}
                    </TableCell>
                    <TableCell>
                      {getMetodoChip(pago.metodo)}
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<ReceiptIcon />}
                        sx={{ color: '#2c3e50', borderColor: '#2c3e50', '&:hover': { backgroundColor: 'rgba(44, 62, 80, 0.05)' } }}
                        onClick={() => abrirRecibo(pago)}
                      >
                        Ver Recibo
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5, color: '#7f8c8d' }}>
                    {terminoBusqueda ? `No se encontraron recibos que coincidan con "${terminoBusqueda}".` : "Aún no hay pagos registrados en el sistema."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </TableContainer>
      </Container>
      
      {/* MODAL DEL TICKET PARA IMPRIMIR */}
      <ReciboModal abierto={modalAbierto} alCerrar={cerrarRecibo} recibo={reciboSeleccionado} />
    </Box>
  );
};

export default PagosCompletados;