import { ErrorResponse, Response } from "../../../types/Response.mjs";
import { getErrorCode, getErrorMessage } from "../../../utils/errorHelper.mjs";
import { DoctorSlotsModel } from "./doctorSlots.model.mjs"

const doctorSlotsModel = new DoctorSlotsModel();

export const createSlots = async (clinicId: string, days: number) => {
    try {
        const model = await doctorSlotsModel.create(clinicId, days);
        const response: Response<any> = {
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
            errorSource: "Creating Doctor Slots"
        }
        throw errorResponse
    }
}

export const getSlots = async (clinicId: string): Promise<Response<{}>> => {
    try {
        const model = await doctorSlotsModel.getAll(clinicId);
        const response: Response<any> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload   
        }
        return response
    } catch (error: unknown) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Creating Doctor Slots"
        }
        throw errorResponse
    }
}

export const updateSlotBooking = async (isBooked: boolean = true, slotId: string, clinicId: string) => {
    try {
        const model = await doctorSlotsModel.updateBooking(isBooked, slotId, clinicId);
        const response: Response<any> = {
            status: model.status,
            message: model.message,
            info: model.info,
            payload: model.payload   
        }
        return response
    } catch (error: unknown) {
        const errorResponse: ErrorResponse = {
            status: 'Error',
            errorCode: getErrorCode(error),
            errorMessage: getErrorMessage(error),
            errorSource: "Creating Doctor Slots"
        }
        throw errorResponse
    }
}