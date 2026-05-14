import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { People as PeopleIcon, AttachMoney as MoneyIcon, Warning as WarningIcon, Build as BuildIcon } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import AdminNavbar from '@/components/layout/AdminNavbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const dataGrafica = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Ingresos Mensuales (MXN)',
      data: [32000, 35000, 38500, 41000, 43200, 45300],
      borderColor: '#3498db',
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const opcionesGrafica = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'top' } },
};

//arreglo de datos para cards
const metricasData = [
  { titulo: 'Clientes Activos', valor: '1,245', detalle: '+12 esta semana', color: '#3498db', icono: <PeopleIcon sx={{ color: '#3498db' }} />, detalleColor: '#27ae60' },
  { titulo: 'Ingresos del Mes', valor: '$ 45,300', detalle: 'MXN cobrados', color: '#27ae60', icono: <MoneyIcon sx={{ color: '#27ae60' }} />, detalleColor: 'text.secondary' },
  { titulo: 'Pagos Vencidos', valor: '18', detalle: 'Requieren corte', color: '#e74c3c', icono: <WarningIcon sx={{ color: '#e74c3c' }} />, detalleColor: '#e74c3c' },
  { titulo: 'Instalaciones', valor: '4', detalle: 'Agendadas para hoy', color: '#9b59b6', icono: <BuildIcon sx={{ color: '#9b59b6' }} />, detalleColor: 'text.secondary' }
];

const DashboardAdmin = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh', pb: 5 }}>
      
      <AdminNavbar />

      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 1 }}>
          Panel de Control
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#7f8c8d', mb: 4 }}>
          Métricas generales de la empresa
        </Typography>

        {/*cards*/}
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

        {/*grafica*/}
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 10px rgba(0,0,0,0.05)', p: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold', mb: 3 }}>
              Crecimiento de Ingresos Mensuales
            </Typography>
            <Box sx={{ height: 350, width: '100%' }}>
              <Line data={dataGrafica} options={opcionesGrafica} />
            </Box>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

export default DashboardAdmin;