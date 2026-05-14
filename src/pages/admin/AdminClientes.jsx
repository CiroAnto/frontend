import { Link } from 'react-router-dom';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, CircularProgress,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
 } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { useState, useEffect } from 'react';
import BarraBusqueda from '@/components/ui/BarraBusqueda';
import { obtenerClientes, eliminarCliente } from '@/services/clienteService';

const AdminClientes = () => {
    const [busqueda, setBusqueda] = useState('');
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteAEliminar, setClienteAEliminar] = useState(null);
    const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await obtenerClientes();
        
        // ¡EL CHISMOSO! Esto nos dirá qué está llegando realmente
        console.log("Datos recibidos del backend:", data); 

        // Verificamos que sea un array válido antes de guardarlo
        if (Array.isArray(data)) {
            setClientes(data);
        } else {
            console.warn("El backend no devolvió un Array. Devolvió:", data);
            setClientes([]);
        }

      } catch (error) {
        console.error('Error al cargar los clientes:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  //funciones para modal
  // Funciones para manejar el Modal
    const abrirModal = (cliente) => {
        setClienteAEliminar(cliente);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setClienteAEliminar(null);
    };

    //funcion para eliminar cliente
    const confirmarEliminacion = async () => {
        if (!clienteAEliminar) return;
        setBorrando(true);
        try {
          await eliminarCliente(clienteAEliminar.clienteId);
          setClientes(prev => prev.filter(c => c.clienteId !== clienteAEliminar.clienteId));
          cerrarModal();
        } catch (error) {
          console.error("Error al eliminar cliente:", error);
        } finally {
          setBorrando(false);
        }
    }

    // Filtrar clientes (BLINDADO contra registros incompletos)
    const clientesFiltrados = clientes.filter(cliente => {
        // Usamos valores por defecto ('') por si un cliente viejo no tiene estos campos
        const nombre = cliente?.name || '';
        const apellido = cliente?.lastname || '';
        const folio = cliente?.clienteId || '';

        const nombreCompleto = `${nombre} ${apellido}`.toLowerCase();
        const busca = busqueda.toLowerCase();

        return nombreCompleto.includes(busca) || folio.toLowerCase().includes(busca);
    });

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
              Administración de clientes
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#7f8c8d' }}>
              Registros y control de clientes
            </Typography>
          </Box>
          <Button component={Link} to="/admin/clientes/nuevo" variant="contained" sx={{ backgroundColor: '#3498db', fontWeight: 'bold' }}>
            + Nuevo Cliente
          </Button>
        </Box>

        <BarraBusqueda 
          valor={busqueda} 
          alCambiar={(e) => setBusqueda(e.target.value)} 
          placeholder="Buscar por nombre, apellido o Folio..." 
        />

        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: '#2c3e50' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>FOLIO</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Apellido</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Referencias</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Teléfono</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {cargando ? (
                <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                        <CircularProgress />
                        <Typography sx={{ mt: 2, color: '#7f8c8d' }}>Conectando con el servidor...</Typography>
                    </TableCell>
                </TableRow>
              ) : clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <TableRow 
                    key={cliente._id}
                    sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                  >
                    <TableCell sx={{ fontWeight: 'bold', color: '#3498db' }}>
                      {cliente.clienteId || 'N/A'} 
                    </TableCell>
                    <TableCell>{cliente.name}</TableCell>
                    <TableCell>{cliente.lastname}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cliente.reference}
                    </TableCell>
                    <TableCell>{cliente.phone}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={cliente.active ? 'Activo' : 'Suspendido'} 
                        color={cliente.active ? 'success' : 'error'} 
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    {/* acciones */}
                    <TableCell align="center">
                      <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<EditIcon />}
                        component={Link} 
                        to={`/admin/editar-cliente/${cliente.clienteId}`} 
                        sx={{ borderColor: '#3498db', color: '#3498db' }}
                      >
                        Editar
                      </Button>
                      <Button variant='outlined' color='error' size='small' startIcon={<DeleteIcon />} onClick={() => abrirModal(cliente)}>
                        Eliminar
                      </Button>

                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 5, color: '#7f8c8d' }}>
                    {busqueda ? `No hay coincidencias para "${busqueda}"` : "No hay clientes registrados en esta localidad."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={modalAbierto}
        onClose={borrando ? undefined : cerrarModal}
      >
        <DialogTitle sx={{ fontWeight: 'bold', color: '#e74c3c' }}>
          ¿Eliminar cliente?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás a punto de borrar a <strong>{clienteAEliminar?.name} {clienteAEliminar?.lastname}</strong> (Folio: {clienteAEliminar?.clienteId}).<br/><br/>
            Esta acción no se puede deshacer y eliminará permanentemente su registro de la base de datos.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={cerrarModal} color="inherit" disabled={borrando}>
            Cancelar
          </Button>
          <Button 
            onClick={confirmarEliminacion} 
            variant="contained" 
            color="error" 
            autoFocus
            disabled={borrando}
            startIcon={borrando ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
          >
            {borrando ? 'Borrando...' : 'Sí, eliminar'}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default AdminClientes;