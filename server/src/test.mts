import express from 'express';
import { connectDB } from './db.mjs';
import { v4 as uuidv4 } from 'uuid';
import format from 'pg-format';
import { createTimeSlots, extractProperties } from './utils/timeSlotsHelper.mjs';
import { group } from 'console';

const testingRouter = express.Router();

testingRouter.get('/', async (req, res) => {
    try {
        // create slots
        // id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked, appointment_id

        const doctors = ["7af5ed12-c484-49a6-bda6-a7428edbc7ca", "4d58e6c0-661c-4d7f-b6ad-9b018625e3c9"]

        const db = await connectDB();
        const firstQuery = await db.query(
                `SELECT * FROM doctors_schedule WHERE clinic_id = $1`,
                ["33a4a840-2951-44fe-a2a1-ee0cf741f138"]
        );

        const rows = firstQuery.rows

        const convertedData: any = extractProperties(rows, ['doctor_id', 'day_of_week', 'clinic_id', 'start_time', 'end_time']);

        console.log('convertedData', convertedData);

        const allSlots = [];

        for (const doctor of convertedData) {
            const slots = await createTimeSlots(
                doctor.doctorId,
                doctor.slots['clinic_id'], // clinic id
                "2025-05-27",
                "09:00:00+08:00",
                "17:00:00+08:00",
                false,
                null,
                7,
                [1,2,3,4]
            )
            // console.log('SLOTS', slots)
            allSlots.push(...slots);
        }
        // for (const doctor of convertedData) {
        //     for (const slot of doctor.slots) {
        //         const slots = await createTimeSlots(
        //             doctor.doctorId,
        //             slot.clinic_id,
        //             "2025-05-27",
        //             "2025-05-27T09:00:00+08:00",
        //             "2025-05-27T015:00:00+08:00",
        //             false,
        //             null,
        //             7,
        //             [slot['day_of_week']] // 👈 put this in an array
        //         );

        //         allSlots.push(...slots);
               

        //     }
        
        // }
        console.log(allSlots)

        const query = format(
            `INSERT INTO doctor_slots (id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked, appointment_id) 
             VALUES %L`,
            allSlots
        );

        const result = await db.query(query);


        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

/*
const createSlots = async (
    doctor_id  : any, 
    clinic_id  : any, 
    slot_date  : any, 
    start_time  : any, 
    end_time  : any, 
    is_booked  : any, 
    appointment_id = null,
    amountDays: number
) => {
    // function generates the slots for a specific doctor base on the amount of Days and if it is within doctors schedule.

    const doctorSchedule = [1, 2, 3, 4, 5]; 
    const baseDate = new Date(slot_date);
    const slots = [];

    for (let i = 0; i < amountDays; i++) {
        // We don't want to modify baseDate directly because it's reused each day in the loop.
        const currentDate = new Date(baseDate);
        currentDate.setDate(currentDate.getDate() + i);

        const dayOfWeek = currentDate.getDay();

        if (doctorSchedule.includes(dayOfWeek)) {
            console.log('Generating slots for', currentDate.toDateString(), 'Day:', dayOfWeek);

            const currentSlotTime = new Date(currentDate);
            const [startHour, startMin] = new Date(start_time).toTimeString().split(':');
            const [endHour, endMin] = new Date(end_time).toTimeString().split(':');

            currentSlotTime.setHours(Number(startHour), Number(startMin), 0, 0);
            const endSlotTime = new Date(currentDate);
            endSlotTime.setHours(Number(endHour), Number(endMin), 0, 0);

            while (currentSlotTime < endSlotTime) {
                const slotStart = new Date(currentSlotTime);
                const slotEnd = new Date(currentSlotTime.getTime() + 30 * 60000);

                slots.push([
                    uuidv4(),
                    doctor_id,
                    clinic_id,
                    currentDate.toISOString().slice(0, 10), 
                    slotStart,
                    slotEnd,
                    is_booked,
                    null
                ]);
                currentSlotTime.setTime(slotEnd.getTime());
            }       
        }
    }
    return slots;
}
*/

 // MANUAL
    // console.log('slots length', slots);
    // const placeholders = slots.map((_, i) => `(
    // $${i * 8 + 1}, $${i * 8 + 2}, $${i * 8 + 3}, $${i * 8 + 4}, $${i * 8 + 5}, $${i * 8 + 6}, $${i * 8 + 7}, $${i * 8 + 8})`);


export default testingRouter;

//  const result = await db.query(
//             `INSERT INTO slots (id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked, appointment_id) 
//              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
//             [
//                 uid,
//                 doctor_id,
//                 clinic_id,
//                 slot_date,
//                 i,
//                 new Date(new Date(i).getTime() + 30 * 60000).toTimeString().split(' ')[0],
//                 is_booked,
//                 appointment_id
//             ]
//         );
//         console.log(result.rows[0]);

/*
function generatePlaceholders(rowCount, columnCount) {
  return [...Array(rowCount)]
    .map((_, i) =>
      `(${[...Array(columnCount)]
        .map((_, j) => `$${i * columnCount + j + 1}`)
        .join(', ')})`
    )
    .join(', ');
}

const placeholders = generatePlaceholders(slots.length, 8);
const flatValues = slots.flat();

const result = await db.query(
  `INSERT INTO doctor_slots 
   (id, doctor_id, clinic_id, slot_date, start_time, end_time, is_booked, appointment_id) 
   VALUES ${placeholders} RETURNING *`,
  flatValues
);

*/