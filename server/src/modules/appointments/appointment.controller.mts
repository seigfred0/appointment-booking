import { ErrorResponse, Response } from "../../types/Response.mjs";
import { AppointmentType } from "../../types/Types.mjs";
import { getErrorCode, getErrorMessage } from "../../utils/errorHelper.mjs";
import { DoctorSlotsModel } from "../doctors/doctors-slots/doctorSlots.model.mjs";
import { AppointmentModel } from "./appointment.model.mjs";
import { v4 as uuidv4 } from 'uuid';



const appointmentModel = new AppointmentModel();

export const createAppointment = async (appointmentData: AppointmentType): Promise<Response<AppointmentType>> => {
    try {
        const id = uuidv4();
        // const updated_at = new Date();
        const withId: any = { ...appointmentData, id }; // spreading
        const { slot_id, ...dataToSave } = withId;

        // must also mark the doctor slot as false (booked)....
        const doctorSlotModel = new DoctorSlotsModel();
        await doctorSlotModel.updateBooking(true, slot_id, dataToSave['clinic_id']);
        const model = await appointmentModel.create(dataToSave);

        const response: Response<AppointmentType> = {
            status: model.status,
            message: model.message,
            info: model.info
        }
        return response
    } catch (error: unknown) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Creating One Appointment"
        }
        throw errorResponse
    }
}

export const getAppointment = async (appointmentId: string): Promise<Response<AppointmentType>> => {
    try {
        const model = await appointmentModel.getOne(appointmentId);
        const response: Response<AppointmentType> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Getting One Appointment"
        }
        throw errorResponse
    }
}

export const getAppointments = async (): Promise<Response<AppointmentType[]>> => {
    try {
        const model = await appointmentModel.getAll();
        const response: Response<AppointmentType[]> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Getting All Appointments"
        }
        throw errorResponse
    }
}

export const updateAppointment = async (appointmentId: string, appointmentData: AppointmentType): Promise<Response<AppointmentType>> => {
    try {
        const model = await appointmentModel.update(appointmentId, appointmentData);
        const response: Response<AppointmentType> = {
            status: model.status,
            message: model.message,
            info: model.info
        }
        return response
    } catch (error) {   
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Updating One Appointment"
        }
        throw errorResponse
    }  
}

export const deleteAppointment = async (appointmentId: string): Promise<Response<AppointmentType>> => { 
    try {
        const model = await appointmentModel.delete(appointmentId);
        const response: Response<AppointmentType> = {
            status: model.status,
            message: model.message,
            info: model.info
        }
        return response
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Deleting One Appointment"
        }
        throw errorResponse
    }
}