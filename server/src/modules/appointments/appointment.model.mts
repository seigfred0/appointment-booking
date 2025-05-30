import { connectDB } from "../../db.mjs";
import { Response } from "../../types/Response.mjs";
import { AppointmentType } from "../../types/Types.mjs";


export class AppointmentModel {

    async create(appointmentData: AppointmentType) {
        try {
            const db = await connectDB();
            
            const result = await db.query(
                `INSERT INTO appointments(id, doctor_id, patient_id, clinic_id, start_time, end_time, status) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [
                    appointmentData.id, 
                    appointmentData.doctor_id, 
                    appointmentData.patient_id, 
                    appointmentData.clinic_id, 
                    appointmentData.start_time,
                    appointmentData.end_time,
                    appointmentData.status
                ]
            )
            return {
                status: "Success",
                message: "One Appointment Added",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async getOne(appointmentId: string): Promise<Response<AppointmentType>> {
        try {
            const db = await connectDB();
            const result = await db.query('SELECT * FROM appointments WHERE id = $1', [appointmentId]);
            return {
                status: "Success",
                message: "One Appointment Retrieved",
                info: result['command'],
                payload: result['rows']
            }
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            const db = await connectDB();
            const result = await db.query('SELECT * FROM appointments');
            return {
                status: "Success",
                message: "All Appointments Retrieved",
                info: {count: result.rowCount, command: result['command']},
                payload: result['rows']
            }
        } catch (error) {
            throw error;
        }
    }

    async update(appointmentId: string, appointmentData: AppointmentType): Promise<Response<AppointmentType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `UPDATE appointments SET doctor_id = $1, patient_id = $2, clinic_id = $3, start_time = $4, end_time = $5, status = $6 
                 WHERE id = $7 RETURNING *`,
                [
                    appointmentData.doctor_id,
                    appointmentData.patient_id,
                    appointmentData.clinic_id,
                    appointmentData.start_time,
                    appointmentData.end_time,
                    appointmentData.status,
                    appointmentId
                ]
            );
            return {
                status: "Success",
                message: "One Appointment Updated",
                info: {command: result['command'], rows: result.rows}
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(appointmentId: string): Promise<Response<AppointmentType>> {
        try {
            const db = await connectDB();
            const result = await db.query('DELETE FROM appointments WHERE id = $1', [appointmentId]);
            return {
                status: "Success",
                message: "One Appointment Deleted",
                info: {command: result['command'], rowCount: result.rowCount}
            }
        } catch (error) {
            throw error;
        }
    }
}

/*
{
  "doctor_id": "66af3b2a-79b1-4aaf-9eac-5e9a0cb38066", = doctor who strange
  "patient_id": "17f73300-4a03-4cea-b696-2f55abde8b91", = dr sarah
  "clinic_id": "33a4a840-2951-44fe-a2a1-ee0cf741f138", = firt clinic
  "start_time": "2025-05-23T09:00:00Z",
  "end_time": "2025-05-23T09:30:00Z",
  "status": "confirmed",
  "created_at": "2025-05-20T14:25:00Z"
}
*/