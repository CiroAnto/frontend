import { useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { Receipt as ReceiptIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import BarraBusqueda from '@/components/ui/BarraBusqueda';
import ReciboModal from '@/components/ui/ReciboModal';

// 1. BASE DE DATOS SIMULADA DE PAGOS COMPLETADOS
const pagosRealizadosData = [
  { id: 1, idCliente: 1, nombre: 'Carlos Slim', mes: 'Octubre 2026', monto: 450.00, fechaPago: '02/10/2026', metodo: 'Efectivo' },
  { id: 2, idCliente: 5, nombre: 'Ana García', mes: 'Octubre 2026', monto: 600.00, fechaPago: '03/10/2026', metodo: 'Transferencia' },
  { id: 3, idCliente: 2, nombre: 'María Martinez', mes: 'Septiembre 2026', monto: 450.00, fechaPago: '05/09/2026', metodo: 'Tarjeta' },
];

const PagosCompletados = () => {
  // 2. Estado para la barra de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const [reciboSeleccionado, setReciboSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // 3. Filtrado en tiempo real
  const pagosFiltrados = pagosRealizadosData.filter((pago) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      pago.nombre.toLowerCase().includes(busqueda) || 
      pago.idCliente.toString().includes(busqueda) ||
      pago.mes.toLowerCase().includes(busqueda) ||
      pago.metodo.toLowerCase().includes(busqueda)
    );
  });

  // Función para darle un color distinto a cada método de pago
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
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      
      <AdminNavbar />

      <Container maxWidth="lg">
        
        {/* CABECERA */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              Historial de Pagos <CheckCircleIcon sx={{ color: '#27ae60', fontSize: 30 }} />
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
              Facturas cobradas exitosamente
            </Typography>
          </Box>
        </Box>

        {/* BARRA DE BÚSQUEDA UNIVERSAL (Reutilizada) */}
        <BarraBusqueda 
          valor={terminoBusqueda} 
          alCambiar={(e) => setTerminoBusqueda(e.target.value)} 
          placeholder="Buscar por cliente, ID, mes o método de pago..." 
        />

        {/* TABLA DE MATERIAL-UI */}
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
              {pagosFiltrados.length > 0 ? (
                pagosFiltrados.map((pago) => (
                  <TableRow 
                    key={pago.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: '#3498db' }}>
                      #{pago.idCliente}
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
                    No se encontraron recibos que coincidan con la búsqueda "{terminoBusqueda}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </TableContainer>
      </Container>
      {/*modal del recibo */}
      <ReciboModal abierto={modalAbierto} alCerrar={cerrarRecibo} recibo={reciboSeleccionado} />
    </Box>
  );
};

export default PagosCompletados;