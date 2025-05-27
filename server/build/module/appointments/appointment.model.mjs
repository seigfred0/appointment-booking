import { mongoDatabase, sqlDatabase } from "../../db/db.mjs";
import { v4 as uuidv4 } from 'uuid';
export class AppointmentServiceMongo {
    collectionName = "my_clinic";
    async create(appointment) {
        try {
            const db = await mongoDatabase(this.collectionName);
            const now = new Date();
            const appointmentWithTime = {
                ...appointment,
                id: uuidv4(),
                createdAt: now,
                updatedAt: now
            };
            const result = await db.updateOne({
                id: "appointments"
            }, {
                $push: { appointments: appointmentWithTime }
            });
            return {
                status: 'Success',
                message: 'Appointment has been booked',
                result
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAll() {
        try {
            const db = await mongoDatabase(this.collectionName);
            // const result = db.find({ id: "appointments" }).toArray(); // this returns whole doc
            const result = await db.findOne({ id: "appointments" }, { projection: { _id: 0, appointments: 1 } });
            return {
                status: 'Success',
                message: 'Retrieved all appointment appointments',
                result
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getById(appointmentId) {
        try {
            const db = await mongoDatabase(this.collectionName);
            const result = await db.findOne({
                id: "appointments",
                appointments: { $elemMatch: { id: appointmentId } }
            }, {
                projection: {
                    _id: 0,
                    appointments: { $elemMatch: { id: appointmentId } }
                }
            });
            return {
                status: 'Success',
                message: 'Retrieved an appointment',
                result
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async update(appointmentId, updateData) {
        try {
            const db = await mongoDatabase(this.collectionName);
            const updateFields = {};
            for (const key in updateData) {
                if (updateData[key] !== undefined) {
                    updateFields[`appointments.$.${key}`] = updateData[key];
                }
            }
            const result = await db.updateOne({
                id: "appointments",
                "appointments.id": appointmentId
            }, {
                // $set: {
                //     "appointments.$.phone": updateData.phone,  
                //     "appointments.$.name": updateData.name
                // }
                $set: updateFields
            });
            console.log('update fields', result);
            return {
                status: 'success',
                message: 'Appointment Updated'
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async delete(appointmendId) {
        try {
            const db = await mongoDatabase(this.collectionName); // why does <AppointmentDocument> fixes $pull error
            const result = await db.updateOne({ id: "appointments" }, { $pull: { appointments: { id: appointmendId } } });
            if (result.modifiedCount === 0) {
                return {
                    status: 'fail',
                    message: 'Appointment does not exist!'
                };
            }
            return {
                status: 'success',
                message: 'Appointment Deleted'
            };
        }
        catch (error) {
            throw error;
        }
    }
}
export class AppointmentServiceSQL {
    async create(appointment) {
        try {
            const db = await sqlDatabase();
            const now = new Date();
            const appointmentWithTime = {
                ...appointment,
                createdAt: now,
                updatedAt: now
            };
            const result = await db.query('INSERT INTO appointments (name, phone, email, doctor, service, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                appointmentWithTime.name,
                appointmentWithTime.phone,
                appointmentWithTime.email,
                appointmentWithTime.doctor,
                appointmentWithTime.service, // implement when it's a json object... a single value for now
                appointmentWithTime.status,
                appointmentWithTime.createdAt,
                appointmentWithTime.updatedAt
            ]);
            return {
                status: 'Success',
                message: 'Appointment has been booked',
                result: result[0]
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getAll() {
        try {
            const db = await sqlDatabase();
            const result = await db.query('SELECT * FROM appointments');
            return {
                status: 'Success',
                message: 'Retrieved all appointments',
                result: result[0]
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getById(appointmentId) {
        try {
            const db = await sqlDatabase();
            const result = await db.query('SELECT * FROM appointments WHERE id = ?', [appointmentId]);
            return {
                status: 'Success',
                message: 'Retrieved an appointment',
                result: result[0]
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async update(appointmentId, updateData) {
        try {
            const db = await sqlDatabase();
            const updateFields = {};
            for (const key in updateData) {
                if (updateData[key] !== undefined) {
                    updateFields[key] = updateData[key];
                }
            }
            const result = await db.query('UPDATE appointments SET ? WHERE id = ?', [updateFields, appointmentId]);
            return {
                status: 'success',
                message: 'Appointment Updated'
            };
        }
        catch (error) {
            console.error(error);
            throw error; // error back to caller
        }
    }
    async delete(appointmendId) {
        try {
            const db = await sqlDatabase();
            const result = await db.query('DELETE FROM appointments WHERE id = ?', [appointmendId]);
            return {
                status: 'success',
                message: 'Appointment Deleted'
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
