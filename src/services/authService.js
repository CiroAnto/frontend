import clienteAxios from '../api/axios';

export const loginAdmin = async (credenciales) => {
    try {
        const respuesta = await clienteAxios.post('auth/login', credenciales);
        console.log("✅ FRONTEND: Respuesta recibida", respuesta.data);
        
        const datosUsuario = respuesta.data.data;

        localStorage.setItem('auth_token', datosUsuario.token);
        localStorage.setItem('admin_token', datosUsuario.token);
        
        return datosUsuario;
        
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