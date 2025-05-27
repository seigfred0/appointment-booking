import { AppointmentServiceSQL } from "./appointment.model.mjs";
// const appointmentService = new AppointmentServiceMongo();
const appointmentService = new AppointmentServiceSQL();
export const bookAppointment = async (appointment) => {
    try {
        const result = await appointmentService.create(appointment);
        const response = {
            status: result.status,
            message: result.message,
            // payload: result.result,
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const getAppointments = async () => {
    try {
        const result = await appointmentService.getAll();
        const response = {
            status: result.status,
            message: result.message,
            payload: result?.result ?? {}
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const getAppointment = async (appointmendId) => {
    try {
        const result = await appointmentService.getById(appointmendId);
        const response = {
            status: result.status,
            message: result.message,
            payload: result?.result ?? {}
        };
        return response;
    }
    catch (error) {
        throw error;
    }
};
export const updateAppointment = async (appointmentId, updateData) => {
    try {
        const result = await appointmentService.update(appointmentId, updateData);
        const response = {
            status: result.status,
            message: result.message,
            // payload: result?.result ?? {}
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const deleteAppointment = async (appointmentId) => {
    try {
        const result = await appointmentService.delete(appointmentId);
        const response = {
            status: result.status,
            message: result.message
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
