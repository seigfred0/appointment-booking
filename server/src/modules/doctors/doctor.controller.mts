import { v4 as uuidv4 } from 'uuid';
import { ErrorResponse, Response } from "../../types/Response.mjs";
import { DoctorType } from "../../types/Types.mjs";
import { DoctorModel } from "./doctor.model.mjs";
import { getErrorCode, getErrorMessage } from '../../utils/errorHelper.mjs';

const doctorModel = new DoctorModel();

export const createDoctor = async (doctorData: DoctorType): Promise<Response<DoctorType>> => {
    try {
        const id = uuidv4();
        const dataToSave = { ...doctorData, id}
        const model = await doctorModel.create(dataToSave);
        const response: Response<DoctorType> = {
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
            errorSource: "Creating One Doctor"
        }
        throw errorResponse
    }
}

export const getDoctors = async (): Promise<Response<DoctorType>> => {
    try {
        const model = await doctorModel.getAll();
        const response: Response<DoctorType> = {
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
            errorSource: "Getting All Doctor"
        }
        throw errorResponse
    }
}

export const getDoctor = async (doctorId: string): Promise<Response<DoctorType>> => {
    try {
        const model = await doctorModel.getOne(doctorId);
        const response: Response<DoctorType> = {
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
            errorSource: "Getting All Doctor"
        }
        throw errorResponse
    }
}

export const updateDoctor = async (doctorId: string, doctorData: DoctorType): Promise<Response<DoctorType>> => {
    try {
        const model = await doctorModel.update(doctorId, doctorData);
        const response: Response<DoctorType> = {
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
            errorSource: "Updating One Doctor"
        }
        throw errorResponse
    }
}

export const deleteDoctor = async (doctorId: string): Promise<Response<DoctorType>> => {
    try {
        const model = await doctorModel.delete(doctorId);
        const response: Response<DoctorType> = {
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
            errorSource: "Getting All Doctor"
        }
        throw errorResponse
    }
}