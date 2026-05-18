import { useState, useEffect } from 'react';
import { Box, Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { People as PeopleIcon, AttachMoney as MoneyIcon, Warning as WarningIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { obtenerClientes } from '@/services/clienteService';
import { obtenerTodosPagos } from '@/services/pagoService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardAdmin = () => {
  const [cargando, setCargando] = useState(true);
  
  const [metricas, setMetricas] = useState({
    activos: 0,
    ingresosMes: 0,
    vencidos: 0,
    nuevosClientes: 0
  });

  const [datosGrafica, setDatosGrafica] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const calcularMetricas = async () => {
      try {
        const [clientes, pagos] = await Promise.all([
          obtenerClientes(),
          obtenerTodosPagos()
        ]);

        const fechaActual = new Date();
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const mesActualStr = `${meses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
        const diaHoy = fechaActual.getDate();
        const mesActualNum = fechaActual.getMonth();
        const anioActualNum = fechaActual.getFullYear();
        const clientesActivos = clientes.filter(c => c.active !== false);
        const pagosEsteMes = pagos.filter(p => p.mesCorrespondiente === mesActualStr);
        
        const ingresos = pagosEsteMes.reduce((suma, pago) => suma + (pago.montoPagado || 0), 0);

        let contVencidos = 0;
        clientesActivos.forEach(cliente => {
          const yaPago = pagosEsteMes.some(p => p.clienteId === cliente.clienteId);
          if (!yaPago && cliente.diaDeCorte && diaHoy > cliente.diaDeCorte) {
            contVencidos++;
          }
        });

        const nuevos = clientesActivos.filter(c => {
          if(!c.createdAt) return false;
          const fechaCreacion = new Date(c.createdAt);
          return fechaCreacion.getMonth() === mesActualNum && fechaCreacion.getFullYear() === anioActualNum;
        }).length;

        setMetricas({
          activos: clientesActivos.length,
          ingresosMes: ingresos,
          vencidos: contVencidos,
          nuevosClientes: nuevos
        });

        const ultimos6MesesLabels = [];
        const ultimos6MesesData = [];

        for (let i = 5; i >= 0; i--) {
          const d = new Date(anioActualNum, mesActualNum - i, 1);
          const mesStrBD = `${meses[d.getMonth()]} ${d.getFullYear()}`;
          const mesCorto = meses[d.getMonth()].substring(0, 3); 
          
          ultimos6MesesLabels.push(mesCorto);
          const ingresosDelMesI = pagos
            .filter(p => p.mesCorrespondiente === mesStrBD)
            .reduce((suma, p) => suma + (p.montoPagado || 0), 0);
            
          ultimos6MesesData.push(ingresosDelMesI);
        }

        setDatosGrafica({
          labels: ultimos6MesesLabels,
          datasets: [{
            label: 'Ingresos Mensuales (MXN)',
            data: ultimos6MesesData,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            fill: true,
            tension: 0.4,
          }]
        });

      } catch (error) {
        console.error("Error al calcular métricas del dashboard:", error);
      } finally {
        setCargando(false);
      }
    };

    calcularMetricas();
  }, []);

  const opcionesGrafica = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
  };

  // array dinamico para tarjetas
  const metricasData = [
    { titulo: 'Clientes Activos', valor: metricas.activos, detalle: 'En total', color: '#3498db', icono: <PeopleIcon sx={{ color: '#3498db' }} />, detalleColor: 'text.secondary' },
    { titulo: 'Ingresos del Mes', valor: `$ ${metricas.ingresosMes.toFixed(2)}`, detalle: 'MXN cobrados', color: '#27ae60', icono: <MoneyIcon sx={{ color: '#27ae60' }} />, detalleColor: 'text.secondary' },
    { titulo: 'Pagos Vencidos', valor: metricas.vencidos, detalle: 'Requieren corte', color: '#e74c3c', icono: <WarningIcon sx={{ color: '#e74c3c' }} />, detalleColor: '#e74c3c' },
    { titulo: 'Nuevos Clientes', valor: metricas.nuevosClientes, detalle: 'Registrados este mes', color: '#9b59b6', icono: <PersonAddIcon sx={{ color: '#9b59b6' }} />, detalleColor: 'text.secondary' }
  ];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      <AdminNavbar />

      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1, mt: 4 }}>
          Panel de Control
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7f8c8d', mb: 4 }}>
          Métricas generales de la empresa
        </Typography>

        {cargando ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column' }}>
             <CircularProgress />
             <Typography sx={{ mt: 2, color: '#7f8c8d' }}>Analizando datos de la empresa...</Typography>
          </Box>
        ) : (
          <>
            {/* tarjetas */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {metricasData.map((metrica, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ borderRadius: 3, borderLeft: `5px solid ${metrica.color}`, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography color="text.secondary" fontWeight="bold">{metrica.titulo}</Typography>
                        {metrica.icono}
                      </Box>
                      <Typography variant="h4" component="div" fontWeight="bold">{metrica.valor}</Typography>
                      <Typography variant="body2" sx={{ color: metrica.detalleColor, mt: 1, fontWeight: metrica.detalleColor !== 'text.secondary' ? 'bold' : 'normal' }}>
                        {metrica.detalle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* GRÁFICA */}
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 3 }}>
                  Crecimiento de Ingresos Mensuales
                </Typography>
                <Box sx={{ height: 350, width: '100%' }}>
                  <Line data={datosGrafica} options={opcionesGrafica} />
                </Box>
              </CardContent>
            </Card>
          </>
        )}

      </Container>
    </Box>
  );
};

export default DashboardAdmin;