import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/public/Login';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import AdminClientes from './pages/admin/AdminClientes';
import NuevoCliente from './pages/admin/NuevoCliente';
import PagosCompletados from './pages/admin/PagadosCompletados';
import AdminAjustes from './pages/admin/AdminAjustes';
import RutaProtegida from './auth/RutaProtegida';
import PagosPendientes from './pages/admin/PagosPendientes';
import PortalCliente from './pages/cliente/PortalCliente';
import EditarCliente from './pages/admin/EditarCliente';
import Inicio from './pages/public/Inicio';

function App() {
  if(!localStorage.getItem('localidad_activa')) {
    localStorage.setItem('localidad_activa', 'centro');
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        
        {/*rutas admin*/}
        <Route path="/admin" element={
          <RutaProtegida rolRequerido="admin"><DashboardAdmin /></RutaProtegida>
        } />
        <Route path='/admin/clientes' element={
          <RutaProtegida rolRequerido="admin"><AdminClientes /> </RutaProtegida>
        } />
        <Route path="/admin/clientes/nuevo" element={
          <RutaProtegida rolRequerido="admin"><NuevoCliente /></RutaProtegida>
        } />
        <Route path="/admin/editar-cliente/:id" element={
          <RutaProtegida rolRequerido="admin"><EditarCliente /></RutaProtegida>
        } />
        <Route path="/admin/pagos-pendientes" element={
          <RutaProtegida rolRequerido="admin"><PagosPendientes /></RutaProtegida>
        } />
        <Route path='/admin/pagados' element={
          <RutaProtegida rolRequerido="admin"><PagosCompletados/> </RutaProtegida>
        }/>
        <Route path="/admin/ajustes" element={
          <RutaProtegida rolRequerido="admin"><AdminAjustes /></RutaProtegida>
        } />

        {/*rutas cliente */}
        <Route path="/cliente" element={
          <RutaProtegida rolRequerido="client"><PortalCliente /> </RutaProtegida>
        } />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;