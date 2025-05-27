import { connectDB } from "../../../db.mjs";
import { Response } from "../../../types/Response.mjs";
import { DoctorScheduleType } from "../../../types/Types.mjs";
import { queryBuilder } from "../../../utils/queryHelper.mjs";


export class DoctorScheduleModel {
    async create(doctorId: string, doctorData: DoctorScheduleType): Promise<Response<DoctorScheduleType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `INSERT INTO doctors_schedule(id, doctor_id, clinic_id, day_of_week, start_time, end_time, is_available) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [
                    doctorData.id,
                    doctorId,
                    doctorData.clinic_id,
                    doctorData.day_of_week,
                    doctorData.start_time,
                    doctorData.end_time,
                    doctorData.is_available
                ]
            );
            return {
                status: "Success",
                message: "Doctor Schedule Added",
                info: { command: result['command'], rows: result['rows'] },
            };
        } catch (error) {
            throw error;
        }
    }

    async getAll(doctorId: string): Promise<Response<DoctorScheduleType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `SELECT * FROM doctors_schedule WHERE doctor_id = $1`,
                [doctorId]
            );
            return {
                status: "Success",
                message: "All Doctor Schedules Retrieved",
                info: { command: result['command'], rows: result['rows'] },
            };
        } catch (error) {
            throw error;
        }
    }
    
    async getOne(doctorId: string, scheduleId: string): Promise<Response<DoctorScheduleType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `SELECT * FROM doctors_schedule WHERE doctors_id = $1 AND id = $2`,
                [doctorId, scheduleId]
            );
            return {
                status: "Success",
                message: "One Doctor Schedule Retrieved",
                info: result['command'],
                payload: result['rows']
            };
        } catch (error) {
            throw error;
        }
    }   

    async update(scheduleId: string, scheduleData: DoctorScheduleType): Promise<Response<DoctorScheduleType>> {
        try {
            const db = await connectDB();
            const { query, values } = queryBuilder('doctors_schedule', scheduleId, scheduleData);
            const result = await db.query(query, values);
            return {
                status: "Success",
                message: "Doctor Schedule Updated",
                info: { command: result['command'], rows: result['rows'] },
            };
        } catch (error) {
            throw error;
        }
    }

    async delete(doctorId: string, scheduleId: string): Promise<Response<DoctorScheduleType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                'DELETE FROM doctors_schedule WHERE id = $1 AND doctors_id = $2 RETURNING *',
                [scheduleId, doctorId]
            );
            return {
                status: "Success",
                message: "Doctor Schedule Deleted",
                info: { command: result['command'], rows: result['rows'] },
            };
        } catch (error) {
            throw error;
        }
    }

}