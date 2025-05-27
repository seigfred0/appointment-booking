import { ClinicModel } from "./clinic.model.mjs";
import { ErrorResponse, Response } from "../../types/Response.mjs";
import { getErrorCode, getErrorMessage } from "../../utils/errorHelper.mjs";
import { ClinicType } from "../../types/Types.mjs";
import { v4 as uuidv4 } from 'uuid';

const clinicModel = new ClinicModel();


export const createClinic = async (clinicInfo: ClinicType): Promise<Response<ClinicType>> => {
    try {
        const { name, address } = clinicInfo;
        const model = await clinicModel.create(uuidv4(), name, address);
        const response: Response<ClinicType> = {
            status: model.status,
            message: model.message,
            info: model.info
        }
        return response;
    } catch (error: unknown) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorMessage: getErrorMessage(error),
            errorSource: "Create Clinic"
        }
        throw errorResponse
    }
}

export const getClinic = async (clinicId: string): Promise<Response<ClinicType>> => {
    try {
        const model = await clinicModel.getOne(clinicId);
        const response: Response<ClinicType> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response;
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorMessage: getErrorMessage(error),
            errorSource: "Retrieving One Clinic"
        }
        throw errorResponse
    }
}

export const getClinics = async (): Promise<Response<ClinicType>> => {
    try {
        const model = await clinicModel.getAll();
        const response: Response<ClinicType> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response;
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorMessage: getErrorMessage(error),
            errorSource: "Retrieving All Clinic"
        }
        throw errorResponse
    }
}


export const updateClinic = async (clinicId: string, data: ClinicType): Promise<Response<ClinicType>> => {
     try {
        const model = await clinicModel.update(clinicId, data);
        const response: Response<ClinicType> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response;
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Deleting One Clinic"
        }
        throw errorResponse
    }
}

export const deleteClinic = async (clinicId: string): Promise<Response<ClinicType>> => {
    try {
        const model = await clinicModel.delete(clinicId);
        const response: Response<ClinicType> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload
        }
        return response;
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorMessage: getErrorMessage(error),
            errorSource: "Deleting One Clinic"
        }
        throw errorResponse
    }
}