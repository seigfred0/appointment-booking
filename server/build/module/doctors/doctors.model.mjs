import { sqlDatabase } from "../../db/db.mjs";
export class DoctorsModel {
    async create(data) {
        try {
            const db = await sqlDatabase();
            const colums = Object.keys(data);
            const nowDate = new Date();
            const dataWithDate = {
                ...data,
                created_at: nowDate,
                updated_at: nowDate
            };
            const values = Object.values(dataWithDate);
            const placeholders = colums.map(() => '?').join(', ');
            const [dbResult] = await db.execute(`INSERT INTO doctors (${colums.join(', ')}) VALUES (${placeholders})`, values);
            return {
                status: 'Success',
                message: 'Appointment has been booked',
                payload: dbResult
            };
        }
        catch (error) {
            console.error(error, "Model Error");
            throw error;
        }
    }
    async getAll() {
        try {
            const db = await sqlDatabase();
            const [dbResult] = await db.execute('SELECT * FROM appt_booking.doctors');
            return {
                status: "Success",
                message: "Retrieved all Doctor's",
                payload: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
/*
doctor = {
id,
name,
specialization,
phone,
email,
profile_url,
is_active,
created_at,
updated_at
}
*/ 
