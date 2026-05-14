import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  //verifica si la sesión está activa
  const estaAutenticado = localStorage.getItem('sesionActiva') === 'true';

  if (!estaAutenticado) {
    //si no esta autenticado, redirige al login
    return <Navigate to="/login" replace />;
  }

  //si todo bien, lo pasa
  return children;
};

export default RutaProtegida;