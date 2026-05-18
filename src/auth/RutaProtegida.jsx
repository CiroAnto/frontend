import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RutaProtegida = ({ children, rolRequerido }) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let rolDelUsuario = null;

  try {
    const decodificado = jwtDecode(token);
    rolDelUsuario = decodificado.role || decodificado.user?.role;
  } catch (error) {
    console.error("Token inválido o expirado:", error); 
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (rolRequerido && rolDelUsuario !== rolRequerido) {
    return <Navigate to={rolDelUsuario === 'admin' ? '/admin' : '/cliente'} replace />;
  }

  return children;
};

export default RutaProtegida;