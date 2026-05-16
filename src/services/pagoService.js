import clienteAxios from '../api/axios';

// Función para registrar un pago nuevo
export const registrarPago = async (datosPago) => {
    try {
        const respuesta = await clienteAxios.post('/payments/register', datosPago);
        return respuesta.data;
    } catch (error) {
        console.error("Error al registrar el pago:", error);
        throw error;
    }
};

// Función para obtener historial (la usaremos en PagosCompletados)
export const obtenerHistorialPagos = async (clienteId) => {
    try {
        const respuesta = await clienteAxios.get(`/payments/${clienteId}`);
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al obtener historial:", error);
        throw error;
    }
};

//obtener todos los pagos de un mes especifico
export const obtenerPagosPorMes = async (mes) => {
    try {
        const respuesta = await clienteAxios.get(`/payments/month/${mes}`);
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al obtener pagos por mes:", error);
        throw error;
    }
};

export const obtenerTodosPagos = async () => {
    try {
        const respuesta = await clienteAxios.get('/payments/all/history');
        return respuesta.data.data;
    } catch (error) {
        console.error("Error al obtener todos los pagos:", error);
        throw error;
    }
}