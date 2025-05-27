import { ErrorResponse, Response } from "../../../types/Response.mjs";
import { DoctorScheduleType } from "../../../types/Types.mjs";
import { getErrorCode, getErrorMessage } from "../../../utils/errorHelper.mjs";
import { DoctorScheduleModel } from "./doctorSchedule.model.mjs";
import { v4 as uuidv4 } from 'uuid';




const doctorScheduleModel = new DoctorScheduleModel();

export const createDoctorSchedule = async (doctorId: string, scheduleData: DoctorScheduleType) => {
    try {
        const id = uuidv4();
        const dataToSave = { ...scheduleData, id}

        const model = await doctorScheduleModel.create(doctorId, dataToSave);
        const response: Response<DoctorScheduleType> = {
            status: model.status,
            message: model.message,
            info: model.info
        }
        return response
    } catch (error: any) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Creating One Doctor"
        }
        throw errorResponse
    }
}

export const getDoctorSchedule = async (doctorId: string, scheduleId: string): Promise<Response<DoctorScheduleType>> => {    
    try {
        const model = await doctorScheduleModel.getOne(doctorId, scheduleId);
        const response: Response<DoctorScheduleType> = {
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
            errorSource: "Getting One Doctor Schedule"
        }
        throw errorResponse
    }
}

export const getDoctorSchedules = async (doctorId: string): Promise<Response<DoctorScheduleType>> => {
    try {
        const model = await doctorScheduleModel.getAll(doctorId);
        const response: Response<DoctorScheduleType> = {
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
            errorSource: "Getting All Doctor Schedules"
        }
        throw errorResponse
    }
}

export const updateDoctorSchedule = async (scheduleId: string, scheduleData: DoctorScheduleType): Promise<Response<DoctorScheduleType>> => {
    try {
        const model = await doctorScheduleModel.update(scheduleId, scheduleData);
        const response: Response<DoctorScheduleType> = {
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
            errorSource: "Updating One Doctor Schedule"
        }
        throw errorResponse
    }
}

export const deleteDoctorSchedule = async (doctorId: string, scheduleId: string): Promise<Response<DoctorScheduleType>> => {
    try {
        const model = await doctorScheduleModel.delete(doctorId, scheduleId);
        const response: Response<DoctorScheduleType> = {
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
            errorSource: "Deleting One Doctor Schedule"
        }
        throw errorResponse
    }
}   