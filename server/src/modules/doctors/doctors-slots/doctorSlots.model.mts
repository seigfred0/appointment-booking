import { connectDB } from "../../../db.mjs";
import { createTimeSlots, extractProperties } from "../../../utils/timeSlotsHelper.mjs";
import format from 'pg-format';

export class DoctorSlotsModel {
    async create(clinic_id: string) {
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
            const getDoctorsSchedule = await db.query(`SELECT * FROM doctors_schedule WHERE clinic_id = $1`, [clinic_id])

            // console.log(getDoctorsSchedule.rows)
            /*
            start_time: '09:00:00+08',
            end_time: '17:00:00+08',
            */
            const convertedData = extractProperties(getDoctorsSchedule.rows, ['doctor_id', 'day_of_week', 'clinic_id', 'start_time', 'end_time'])

            const allSlots = [];

            for (const doctor of convertedData) {
                // console.log(doctor, 'doc')
                const slots = await createTimeSlots(doctor['doctorId'], doctor['clinic_id'], "2025-05-28", doctor['start_time'], doctor['end_time'], false, null, 3, doctor['day_of_week'])
                allSlots.push(...slots)
            }

            const query = format(
                `INSERT INTO doctor_slots (id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked,appointment_id) 
                VALUES %L`,
                allSlots
            );

            const result = await db.query(query);
            return result
        } catch (error) {
            throw error
        }

    }

    async getAll() {}
    async getByDoctor() {}
    async update() {}
    async delete() {}
}