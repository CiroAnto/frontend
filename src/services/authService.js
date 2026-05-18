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
        console.error("Error en el login:", error.response?.data || error.message);
        throw error;
    }
};

export const logoutAdmin = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('sesionActiva');
    window.location.href = '/login';
};

export const actualizarPerfil = async (username, datosActualizados) => {
    try {
        const respuesta = await clienteAxios.put(`/auth/userUpdate/${username}`, datosActualizados);
        return respuesta.data;
    } catch (error) {
        console.error("Error al actualizar el perfil:", error.response?.data || error.message);
        throw error.response?.data?.message || "Ocurrió un error al actualizar los datos";
    }
}

export const obtenerPerfil = async (username) => {
    try {
        const respuesta = await clienteAxios.get(`/auth/user/${username}`);
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al obtener el perfil:", error.response?.data || error.message);
        throw error;
    }
}