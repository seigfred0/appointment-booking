import { sqlDatabase } from "../../db/db.mjs";
export class ServicesModel {
    async create(service) {
        try {
            const db = await sqlDatabase();
            const [dbResult] = await db.execute('INSERT INTO services (type, price) VALUES (?,?)', [service.type, service.price]);
            return {
                status: "Success",
                message: "Created new service",
                info: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getServices() {
        try {
            const db = await sqlDatabase();
            const [dbResult] = await db.execute('SELECT * FROM appt_booking.services');
            return {
                status: "Success",
                message: "Retrieved all Services",
                payload: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getService(serviceId) {
        try {
            const db = await sqlDatabase();
            const [dbResult] = await db.execute('SELECT * FROM services WHERE id = ?', [serviceId]);
            return {
                status: "Success",
                message: "Retrieved one service",
                payload: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteService(serviceId) {
        try {
            const db = await sqlDatabase();
            const dbResult = await db.execute('DELETE FROM services WHERE id = ?', [serviceId]);
            return {
                status: "Success",
                message: "Deleted one service",
                payload: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async update(serviceId, updateData) {
        try {
            const db = await sqlDatabase();
            const updateFields = {};
            for (const key in updateData) {
                if (updateData[key] !== undefined) {
                    updateFields[key] = updateData[key];
                }
            }
            const [dbResult] = await db.query('UPDATE services SET ? WHERE id = ?', [updateFields, serviceId]);
            return {
                status: "Success",
                message: "Updated one record",
                info: dbResult
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
