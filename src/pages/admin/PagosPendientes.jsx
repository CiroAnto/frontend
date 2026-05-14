import { useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { Payment as PaymentIcon, Warning as WarningIcon } from '@mui/icons-material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import BarraBusqueda from '@/components/ui/BarraBusqueda';

// 1. SIMULAMOS LA BASE DE DATOS DE PAGOS PENDIENTES
const pagosData = [
  { id: 2, idCliente: 2, nombre: 'María Martinez', mes: 'Abril 2026', monto: 450.00, fechaLimite: '05/04/2026', estado: 'vencido' },
  { id: 3, idCliente: 3, nombre: 'Fernando Lopez', mes: 'Mayo 2026', monto: 450.00, fechaLimite: '05/05/2026', estado: 'proximo' },
  { id: 4, idCliente: 4, nombre: 'Juan Pérez', mes: 'Mayo 2026', monto: 600.00, fechaLimite: '05/05/2026', estado: 'pendiente' },
];

const PagosPendientes = () => {
  // 2. Estado para la barra de búsqueda local
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // 3. Filtrado en tiempo real
  const pagosFiltrados = pagosData.filter((pago) => {
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      pago.nombre.toLowerCase().includes(busqueda) || 
      pago.idCliente.toString().includes(busqueda) ||
      pago.mes.toLowerCase().includes(busqueda)
    );
  });

  // Función auxiliar para determinar el color de la etiqueta de estado
  const getEstadoChip = (estado) => {
    switch (estado) {
      case 'vencido':
        return <Chip icon={<WarningIcon />} label="Vencido" color="error" size="small" sx={{ fontWeight: 'bold' }} />;
      case 'proximo':
        return <Chip label="Próximo a vencer" color="warning" size="small" sx={{ fontWeight: 'bold' }} />;
      default:
        return <Chip label="Pendiente" color="default" size="small" />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      
      {/* NAVBAR REUTILIZADO */}
      <AdminNavbar />

      <Container maxWidth="lg">
        
        {/* CABECERA */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Control de Pagos
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
            Facturas pendientes de cobro
          </Typography>
        </Box>

        {/* BARRA DE BÚSQUEDA UNIVERSAL */}
        <BarraBusqueda 
          valor={terminoBusqueda} 
          alCambiar={(e) => setTerminoBusqueda(e.target.value)} 
          placeholder="Buscar por nombre de cliente, ID o mes (Ej. Mayo)..." 
        />

        {/* TABLA DE MATERIAL-UI */}
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de pagos pendientes">
            
            <TableHead sx={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID Cliente</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mes a Cobrar</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Monto</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha Límite</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
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
                    <TableCell>{pago.fechaLimite}</TableCell>
                    
                    {/* Renderizamos el Chip de estado dinámicamente */}
                    <TableCell>
                      {getEstadoChip(pago.estado)}
                    </TableCell>
                    
                    <TableCell align="center">
                      <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<PaymentIcon />}
                        sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, textTransform: 'none' }}
                      >
                        Registrar Pago
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5, color: '#7f8c8d' }}>
                    No se encontraron pagos pendientes que coincidan con "{terminoBusqueda}".
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </TableContainer>

      </Container>
    </Box>
  );
};

export default PagosPendientes;