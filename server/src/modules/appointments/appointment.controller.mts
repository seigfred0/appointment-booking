import { ErrorResponse, Response } from "../../types/Response.mjs";
import { AppointmentType } from "../../types/Types.mjs";
import { getErrorCode, getErrorMessage } from "../../utils/errorHelper.mjs";
import { DoctorSlotsModel } from "../doctors/doctors-slots/doctorSlots.model.mjs";
import { PatientModel } from "../patients/patient.model.mjs";
import { AppointmentModel } from "./appointment.model.mjs";
import { v4 as uuidv4 } from 'uuid';


const appointmentModel = new AppointmentModel();

export const createAppointment = async (appointmentData: AppointmentType): Promise<Response<AppointmentType>> => {
    // 1. Save Patient into Patient Table
    // 2. Mark "Booked" in doctor_slots table
    // 3. Create appointment
    /*
        {
            "doctor_id": "4d58e6c0-661c-4d7f-b6ad-9b018625e3c9", // come with the slots
            "slot_id": "749b4f5a-68a9-4e1c-856d-b7ff271c1239",
            "clinic_id": "33a4a840-2951-44fe-a2a1-ee0cf741f138",
            "patient": {
                "name": "seigfred",
                "email": "seigfred@gmail.com",
                "phone": "0959538091",
                "clinic_id": "33a4a840-2951-44fe-a2a1-ee0cf741f138"
            },
            "start_time": "2025-05-28 09:30:00+08",
            "end_time": "2025-05-28 10:00:00+08",
            "status": "pending",
            "id": "ec3eff28-d4a2-4ec2-b605-685c04fb3795"
        }
    */
    try {
        // PROBLEM - it creates a patient even in error....
        /*
            Current implementation is "brute force" needs to be optimized.
        */
        const id = uuidv4();
        const withUid: any = { ...appointmentData, id }; // spreading - to add

        withUid.patient['clinic_id'] = withUid['clinic_id'];
        withUid.patient['id'] = uuidv4();

        const { slot_id, patient, ...appointment } = withUid; // destructuring - to subtract

        const patientModel = new PatientModel();
        const patientId = patient;
        await patientModel.create(patient);

        // must also mark the doctor slot as false (booked)....
        const doctorSlotModel = new DoctorSlotsModel();
        await doctorSlotModel.updateBooking(true, slot_id, appointment['clinic_id']);

        // console.log(patient)
        const newAppointment = { ...appointment, patient_id: patientId.id };
        const model = await appointmentModel.create(newAppointment);

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