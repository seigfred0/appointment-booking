import { ErrorResponse, Response } from "../../types/Response.mjs";
import { PatientType } from "../../types/Types.mjs";
import { getErrorCode, getErrorMessage } from "../../utils/errorHelper.mjs";
import { PatientModel } from "./patient.model.mjs";
import { v4 as uuidv4 } from 'uuid';


const patientModel = new PatientModel();

export const createPatient = async (patientData: PatientType): Promise<Response<PatientType>> => {
    try {
        const id = uuidv4();
        const updated_at = new Date();
        const dataToSave = { ...patientData, id,  updated_at}

        const model = await patientModel.create(dataToSave);

        const response: Response<PatientType> = {
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
            errorSource: "Creating One Patient"
        }
        throw errorResponse
    }
}

export const getPatient = async (patientId: string): Promise<Response<PatientType>> => {
    try {
        const model = await patientModel.getOne(patientId);
        const response: Response<PatientType> = {
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
            errorSource: "Getting One Patient"
        }
        throw errorResponse
    }
}

export const getPatients = async (): Promise<Response<PatientType>> => {
    try {
        const model = await patientModel.getAll();
        const response: Response<PatientType> = {
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
            errorSource: "Getting All Patient"
        }
        throw errorResponse
    }
}

export const updatePatient = async (patientId: string, patientData: PatientType): Promise<Response<PatientType>> => {
    try {
        const model = await patientModel.update(patientId,patientData);
        const response: Response<PatientType> = {
            status: model.status,
            message: model.message,
            info: model.info,
        }
        return response
    } catch (error) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Updating One Patient"
        }
        throw errorResponse
    }
}

export const deletePatient = async (patientId: string): Promise<Response<PatientType>> => {
    try {
        const model = await patientModel.delete(patientId);
        const response: Response<PatientType> = {
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
            errorSource: "Getting One Patient"
        }
        throw errorResponse
    }
}