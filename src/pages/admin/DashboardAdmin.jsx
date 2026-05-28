import { useState, useEffect, useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, CircularProgress, Avatar } from "@mui/material";
import { People as PeopleIcon, AttachMoney as MoneyIcon, Warning as WarningIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { obtenerClientes } from '@/services/clienteService';
import { obtenerTodosPagos } from '@/services/pagoService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

const DashboardAdmin = () => {
  const [cargando, setCargando] = useState(true);
  const chartRef = useRef(null);
  
  const [metricas, setMetricas] = useState({
    activos: 0,
    ingresosMes: 0,
    vencidos: 0,
    nuevosClientes: 0
  });

  const [datosGrafica, setDatosGrafica] = useState({ labels: [], datasets: [] });
  const [datosDoughnut, setDatosDoughnut] = useState({ labels: [], datasets: [] });

  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaHoyStr = new Date().toLocaleDateString('es-MX', opcionesFecha);

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
          
          gridLabels(ultimos6MesesLabels, mesCorto);
          
          const ingresosDelMesI = pagos
            .filter(p => p.mesCorrespondiente === mesStrBD)
            .reduce((suma, p) => suma + (p.montoPagado || 0), 0);
            
          ultimos6MesesData.push(ingresosDelMesI);
        }

        let gradient = 'rgba(52, 152, 219, 0.1)';
        if (chartRef.current) {
          const ctx = chartRef.current.ctx;
          gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(52, 152, 219, 0.4)');
          gradient.addColorStop(1, 'rgba(52, 152, 219, 0.0)');
        }

        setDatosGrafica({
          labels: ultimos6MesesLabels,
          datasets: [{
            label: 'Ingresos Mensuales (MXN)',
            data: ultimos6MesesData,
            borderColor: '#3498db',
            backgroundColor: gradient,
            fill: true,
            tension: 0.45,
            pointBackgroundColor: '#2980b9',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        });

        function gridLabels(arr, val) { arr.push(val); }

        const clientesAlDia = clientesActivos.length - contVencidos;
        setDatosDoughnut({
          labels: ['Al corriente', 'Vencidos'],
          datasets: [{
            data: [clientesAlDia, contVencidos],
            backgroundColor: ['#2ecc71', '#e74c3c'],
            borderWidth: 0,
            weight: 1
          }]
        });

      } catch (error) {
        console.error("Error al calcular métricas del dashboard:", error);
      } finally {
        setCargando(false);
      }
    };

    calcularMetricas();
  }, [cargando]);

  const opcionesGrafica = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true, grid: { borderDash: [6, 6], color: '#eaeded' }, ticks: { color: '#7f8c8d' } },
      x: { grid: { display: false }, ticks: { color: '#7f8c8d' } }
    }
  };

  const opcionesDoughnut = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { position: 'bottom', labels: { boxWidth: 12, font: { weight: 'bold' } } },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw} clientes`
        }
      }
    },
    cutout: '75%',
  };

  const metricasData = [
    { titulo: 'Clientes Activos', valor: metricas.activos, detalle: 'En total', color: '#3498db', bgTenue: 'rgba(52, 152, 219, 0.12)', icono: <PeopleIcon sx={{ color: '#3498db' }} /> },
    { titulo: 'Ingresos del Mes', valor: `$${metricas.ingresosMes.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, detalle: 'MXN cobrados', color: '#2ecc71', bgTenue: 'rgba(46, 204, 113, 0.12)', icono: <MoneyIcon sx={{ color: '#2ecc71' }} /> },
    { titulo: 'Pagos Vencidos', valor: metricas.vencidos, detalle: `${metricas.vencidos} requieren corte`, color: '#e74c3c', bgTenue: 'rgba(231, 76, 60, 0.12)', icono: <WarningIcon sx={{ color: '#e74c3c' }} />, esAlerta: true },
    { titulo: 'Nuevos Clientes', valor: metricas.nuevosClientes, detalle: 'Registrados este mes', color: '#9b59b6', bgTenue: 'rgba(155, 89, 182, 0.12)', icono: <PersonAddIcon sx={{ color: '#9b59b6' }} /> }
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        pb: 5,
      }}
    >
      <AdminNavbar />

      <Container maxWidth="lg">
        {/* Cabecera */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: 4,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ color: "#2c3e50", fontWeight: "bold", mb: 1 }}
            >
              Panel de Control
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#7f8c8d" }}>
              Métricas generales de la empresa
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "#95a5a6",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {fechaHoyStr}
          </Typography>
        </Box>

        {cargando ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 2, color: "#7f8c8d" }}>
              Analizando datos de la empresa...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  xl: "repeat(4, 1fr)",
                },
                gap: 3,
                mb: 4,
              }}
            >
              {metricasData.map((metrica, index) => (
                <Box key={index}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.06)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", fontWeight: "600" }}
                        >
                          {metrica.titulo}
                        </Typography>
                        <Avatar
                          sx={{
                            bgcolor: metrica.bgTenue,
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                          }}
                        >
                          {metrica.icono}
                        </Avatar>
                      </Box>

                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: "#2c3e50", mb: 0.5 }}
                      >
                        {metrica.valor}
                      </Typography>

                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          color: metrica.esAlerta
                            ? "#e74c3c"
                            : "text.secondary",
                          fontWeight: metrica.esAlerta ? "bold" : "normal",
                        }}
                      >
                        {metrica.detalle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* SECCIÓN ANALÍTICA */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "2fr 1fr",
                },
                gap: 4,
                alignItems: "stretch",
              }}
            >
              {/* GRÁFICA DE LÍNEAS */}
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  p: 1.5,
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2c3e50",
                      fontWeight: "bold",
                      mb: 3,
                    }}
                  >
                    Evolución de Ingresos Mensuales
                  </Typography>

                  <Box sx={{ height: 320, width: "100%" }}>
                    <Line
                      ref={chartRef}
                      data={datosGrafica}
                      options={opcionesGrafica}
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* GRÁFICA DONA */}
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                  p: 1.5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#2c3e50",
                      fontWeight: "bold",
                      mb: 3,
                      textAlign: "center",
                    }}
                  >
                    Estado de Clientes
                  </Typography>

                  <Box
                    sx={{
                      height: 220,
                      position: "relative",
                    }}
                  >
                    <Doughnut data={datosDoughnut} options={opcionesDoughnut} />

                    {/* TEXTO CENTRAL */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="#2c3e50"
                      >
                        {metricas.activos}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontWeight: "bold",
                          letterSpacing: 1,
                        }}
                      >
                        CLIENTES
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default DashboardAdmin;