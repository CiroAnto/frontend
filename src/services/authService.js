// frontend/src/services/authService.js
import clienteAxios from '../api/axios';

export const loginAdmin = async (credenciales) => {
    try {
        // Hacemos la petición POST a la ruta /login de tu backend
        const respuesta = await clienteAxios.post('auth/login', credenciales);
        console.log("✅ FRONTEND: Respuesta recibida", respuesta.data);
        // Extraemos el token y el usuario que nos responde Node.js
        const { token, usuario } = respuesta.data.data;

        // Guardamos el token en el navegador para mantener la sesión abierta
        localStorage.setItem('admin_token', token);
        
        return usuario;
    } catch (error) {
        console.error("Error en el login:", error);
        throw error;
    }
};

export const logoutAdmin = () => {
    // Para cuando hagamos el botón de "Cerrar sesión" en tu panel
    localStorage.removeItem('admin_token');
    localStorage.removeItem('sesionActiva');
    window.location.href = '/login';
};