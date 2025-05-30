import { connectDB } from "../../../db.mjs";
import { Response } from "../../../types/Response.mjs";
import { createTimeSlots, extractProperties } from "../../../utils/timeSlotsHelper.mjs";
import format from 'pg-format';

export class DoctorSlotsModel {
    async create(clinic_id: string, days: number): Promise<Response<{}>> {
        try {
            /*
            1. Get doctors schedule
            2. Convert it into a format to be then used in createTimeSlot
            3. Create Time Slots

                Structure for convertedData:
                doctorId: ""
                clinicId: ""
                start_time: 
                end_time:
                day_of_week: [1,2,3,4,5]
            */
            const db = await connectDB();
            const getDoctorsSchedule = await db.query(
                `SELECT * FROM doctors_schedule WHERE clinic_id = $1`, [clinic_id]
            )

            // console.log(getDoctorsSchedule.rows)z
            /*
            start_time: '09:00:00+08',
            end_time: '17:00:00+08',
            */
            const convertedData = extractProperties(
                getDoctorsSchedule.rows, 
                ['doctor_id', 'day_of_week', 'clinic_id', 'start_time', 'end_time']
            )

            const allSlots = [];

            for (const doctor of convertedData) {
                const slots = await createTimeSlots(
                    doctor['doctorId'], 
                    doctor['clinic_id'], 
                    "2025-05-28", 
                    doctor['start_time'], 
                    doctor['end_time'], 
                    false, 
                    null, 
                    days, // how many days to generate
                    doctor['day_of_week']
                )
                allSlots.push(...slots)
            }

            const query = format(
                `INSERT INTO doctor_slots (id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked,appointment_id) 
                VALUES %L`,
                allSlots
            );

            const result = await db.query(query);

            return {
                status: "Success",
                message: "Doctors Slots Created",
                info: { command: result['command'], rowCount: result['rowCount'] },
            };
        } catch (error) {
            throw error
        }

    }

    async getAll(clinicId: string): Promise<Response<{}>> {
        try {
            const db = await connectDB();
            const result = await db.query(`SELECT * FROM doctor_slots WHERE clinic_id = $1`, [clinicId]);

            // console.log(result)
            return {
                status: "Success",
                message: "All Doctor Slots Retrieved",
                info: {command: result['command'], count: result['rowCount'] } ,
                payload: result.rows
            };
        } catch (error) {
            throw error
        }
    }

    async getByDoctor() {}

    async updateBooking(isBooked: boolean, slotId: string, clinicId: string ) {
        try {
            const db = await connectDB();
            const result = await db.query(`UPDATE doctor_slots SET is_booked = $1 WHERE id = $2 AND clinic_id = $3`,
                [isBooked, slotId, clinicId]
            )
            return {
                status: "Success",
                message: "Doctor Slot is Updated",
                info: {command: result['command'], count: result['rowCount'] } ,
                payload: result.rows
            };
        } catch (error) {
            throw error
        }
    }

    async delete() {}
}