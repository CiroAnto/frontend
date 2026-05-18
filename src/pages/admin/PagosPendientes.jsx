import { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, CircularProgress, Alert
} from '@mui/material';
import { Payment as PaymentIcon, Warning as WarningIcon, CheckCircle as CheckIcon } from '@mui/icons-material';

import AdminNavbar from '@/components/layout/AdminNavbar';
import BarraBusqueda from '@/components/ui/BarraBusqueda';
// IMPORTAMOS NUESTRO NUEVO MODAL DE COBRO
import RegistrarPagoModal from '@/components/ui/RegistrarPagoModal'; 

import { obtenerClientes } from '@/services/clienteService';
import { obtenerPagosPorMes } from '@/services/pagoService';

const PagosPendientes = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeExito, setMensajeExito] = useState('');

  // Estados para controlar el Modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [clienteACobrar, setClienteACobrar] = useState(null);

  const fechaActual = new Date();
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const mesActualStr = `${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
  const diaHoy = fechaActual.getDate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        //todos los clientes y todos los pagos del mes
        const [dataClientes, pagosDelMes] = await Promise.all([
          obtenerClientes(),
          obtenerPagosPorMes(mesActualStr)
        ]);

        if (Array.isArray(dataClientes)) {
          //filtro activos
          const clientesActivos = dataClientes.filter(c => c.active !== false);

          //filtro no tienen recibo
          const clientesPendientes = clientesActivos.filter(cliente => {
            //busca si el cliente ya ha pagado
            const yaPago = pagosDelMes.some(pago => pago.clienteId === cliente.clienteId);
            
            return !yaPago;
          });

          //se guarda solo los que deben
          setClientes(clientesPendientes);
        }
      } catch (error) {
        console.error('Error al cargar datos cruzados:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [mesActualStr]);

  const calcularEstado = (diaDeCorte) => {
    if (!diaDeCorte) return 'pendiente';
    if (diaHoy > diaDeCorte) return 'vencido';
    if (diaDeCorte - diaHoy <= 3) return 'proximo';
    return 'pendiente';
  };

  const getEstadoChip = (estado) => {
    switch (estado) {
      case 'vencido':
        return <Chip icon={<WarningIcon />} label="Vencido" color="error" size="small" sx={{ fontWeight: 'bold' }} />;
      case 'proximo':
        return <Chip label="Próximo a vencer" color="warning" size="small" sx={{ fontWeight: 'bold' }} />;
      default:
        return <Chip label="A tiempo" color="success" variant="outlined" size="small" />;
    }
  };

  const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.name} ${cliente.lastname}`.toLowerCase();
    const busqueda = terminoBusqueda.toLowerCase();
    return (
      nombreCompleto.includes(busqueda) || 
      (cliente.clienteId && cliente.clienteId.toLowerCase().includes(busqueda))
    );
  });

  // Función que el Modal llamará cuando termine de procesar el pago
  const manejarPagoExitoso = (clientePagado) => {
    setClientes(prev => prev.filter(c => c.clienteId !== clientePagado.clienteId));
    setMensajeExito(`Pago de ${clientePagado.name} registrado correctamente.`);
    setTimeout(() => setMensajeExito(''), 4000);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
            Control de Cobranza
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
            Ciclo actual: <strong>{mesActualStr}</strong>
          </Typography>
        </Box>

        {mensajeExito && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" sx={{ mb: 3, fontWeight: 'bold' }}>
            {mensajeExito}
          </Alert>
        )}

        <BarraBusqueda 
          valor={terminoBusqueda} 
          alCambiar={(e) => setTerminoBusqueda(e.target.value)} 
          placeholder="Buscar por nombre o Folio..." 
        />

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Folio</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Paquete</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Día de Corte</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Monto</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acción</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {cargando ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2, color: '#7f8c8d' }}>Cargando padrón de clientes...</Typography>
                  </TableCell>
                </TableRow>
              ) : clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => {
                  const estado = calcularEstado(cliente.diaDeCorte);
                  
                  return (
                    <TableRow key={cliente._id} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell sx={{ fontWeight: 'bold', color: '#3498db' }}>{cliente.clienteId || 'N/A'}</TableCell>
                      <TableCell sx={{ fontWeight: '500' }}>{cliente.name} {cliente.lastname}</TableCell>
                      <TableCell>{cliente.paquete || 'Sin asignar'}</TableCell>
                      <TableCell>Día {cliente.diaDeCorte || 5}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                        $ {cliente.montoMensual ? cliente.montoMensual.toFixed(2) : '0.00'}
                      </TableCell>
                      <TableCell>{getEstadoChip(estado)}</TableCell>
                      <TableCell align="center">
                        <Button 
                          variant="contained" 
                          size="small" 
                          startIcon={<PaymentIcon />}
                          onClick={() => {
                            setClienteACobrar(cliente);
                            setModalAbierto(true);
                          }}
                          sx={{ backgroundColor: '#27ae60', '&:hover': { backgroundColor: '#219653' }, textTransform: 'none' }}
                        >
                          Cobrar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5, color: '#7f8c8d' }}>
                    No hay clientes pendientes en este momento.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* COMPONENTE DE COBRO */}
      <RegistrarPagoModal 
        abierto={modalAbierto}
        cerrarModal={() => {
          setModalAbierto(false);
          setClienteACobrar(null);
        }}
        cliente={clienteACobrar}
        mesActualStr={mesActualStr}
        onPagoExitoso={manejarPagoExitoso}
      />
      
    </Box>
  );
};

export default PagosPendientes;