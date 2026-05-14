import clienteAxios from '../api/axios';

const obtenerLocalidad = () => {
    return localStorage.getItem('localidad_activa') || 'centro'; // Devuelve 'centro' si no hay localidad almacenada
}

// OBTENER TODOS LOS CLIENTES
export const obtenerClientes = async () => {
    try {
        const localidad = obtenerLocalidad();
        console.log("Obteniendo clientes para localidad:", localidad);
        const respuesta = await clienteAxios.get(`/getAll/${localidad}/clients`);
        return respuesta.data.data; // Retornamos el array que viene dentro del 'data' de tu backend
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
};

// REGISTRAR CLIENTE
export const crearCliente = async (datosCliente) => {
    try {
        const localidad = obtenerLocalidad();
        const respuesta = await clienteAxios.post(`/insert/${localidad}/clients`, datosCliente);
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al crear cliente:", error);
        throw error;
    }
};

// ELIMINAR CLIENTE
export const eliminarCliente = async (clienteId) => {
    try {
        const localidad = obtenerLocalidad();
        const respuesta = await clienteAxios.delete(`/delete/${localidad}/clients/${clienteId}`);
        return respuesta.data.success;
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
        throw error;
    }
};

export const obtenerCliente = async (clienteId) => {
    try {
        const localidad = obtenerLocalidad();
        const respuesta = await clienteAxios.get(`/getOne/${localidad}/clients?name=${clienteId}`);
        
        // El backend devuelve un array de sugerencias, tomamos el primero si existe
        if (respuesta.data.data && respuesta.data.data.length > 0) {
            return respuesta.data.data[0];
        }
        throw new Error("Cliente no encontrado");
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        throw error;
    }
};

// ACTUALIZAR CLIENTE
export const actualizarCliente = async (clienteId, datosActualizados) => {
    try {
        const localidad = obtenerLocalidad();
        // Llama a: http://localhost:3000/update/{localidad}/clients/{nombre}
        const respuesta = await clienteAxios.put(`/update/${localidad}/clients/${clienteId}`, datosActualizados);
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al actualizar cliente:", error);
        throw error;
    }
};