import { connectDB } from "../../db.mjs";
import { Response } from "../../types/Response.mjs";
import { ClinicType } from "../../types/Types.mjs";
import { queryBuilder } from "../../utils/queryHelper.mjs";

export class ClinicModel {
    async create(id: string, name: string, addresss: string): Promise<Response<{}>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                'INSERT INTO clinics(id, name, address) VALUES ($1,$2,$3) RETURNING *',
                [id,name,addresss]
            )
            return {
                status: "Success",
                message: "New Clinic Created",
                info: {command: result['command'], rows: result['rows']},
            };
        } catch (error) {
            throw error;
            // this swallows the error by catching it and returning an 'error' object, re-throw
            // return {
            //     status: "Error",
            //     message: "Failed to create clinic",
            //     error: error ,
            //     hello: 'hi'
            // };
        }
    }

    async getOne(clinicId: string): Promise<Response<ClinicType[]>> {
        try {
            const db = await connectDB();
            const result = await db.query('SELECT * FROM clinics WHERE id = $1', [clinicId]);
            return {
                status: "Success",
                message: "One Clinic Retrieved",
                info: result.command,
                payload: result.rows
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Response<ClinicType[]>> {
        try {
            const db = await connectDB();
            const result = await db.query('SELECT * FROM clinics');
            return {
                status: "Success",
                message: "All Clinics Retrieved",
                info: result.command,
                payload: result.rows
            }
        } catch (error) {
            throw error;
        }
    }

    async update(clinicId: string, data: ClinicType): Promise<Response<{}>> {
        try {
            const db = await connectDB();

            const updateQuery = queryBuilder('clinics',clinicId, data);

            const result = await db.query(updateQuery.query, updateQuery.values);
            return {
                status: "Success",
                message: "One Clinic Updated",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(clinicId: string): Promise<Response<{}>> {
        try {
            const db = await connectDB();
            const result = await db.query('DELETE FROM clinics WHERE id = $1 RETURNING *', [clinicId]);
            return {
                status: "Success",
                message: "One Clinic Deleted",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }
}