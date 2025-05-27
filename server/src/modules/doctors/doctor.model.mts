import { connectDB } from "../../db.mjs";
import { Response } from "../../types/Response.mjs";
import { DoctorType } from "../../types/Types.mjs";
import { CustomError } from "../../utils/customError.mjs";
import { queryBuilder } from "../../utils/queryHelper.mjs";


export class DoctorModel{
    async create(doctorData: DoctorType): Promise<Response<DoctorType>> {
        try {
            const db = await connectDB();
            // throw new CustomError("Testing this error message", 400)
            const result = await db.query(
                `INSERT INTO doctors(id, clinic_id, name, email, phone, specialization, status) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [
                    doctorData.id, 
                    doctorData.clinic_id, 
                    doctorData.name, 
                    doctorData.email, 
                    doctorData.phone, 
                    doctorData.specialization, 
                    doctorData.status
                ]
            )
            return {
                status: "Success",
                message: "One Doctor Added",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Response<DoctorType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `SELECT * FROM doctors`,
            )
            return {
                status: "Success",
                message: "All Doctors Retrieved",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async getOne(doctorId: string) {
        try {
            const db = await connectDB();
            const result = await db.query(
                `SELECT * FROM doctors WHERE id = $1`, [doctorId]
            )
            return {
                status: "Success",
                message: "One Doctor Retrieved",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async update(doctorId: string, doctorData: DoctorType): Promise<Response<DoctorType>> {
        try {
            const db = await connectDB();
            const {query, values} = queryBuilder('doctors', doctorId, doctorData)
            const result = await db.query(query, values);
            return {
                status: "Success",
                message: "One Doctor Updated",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(doctorId: string) {
        try {
            const db = await connectDB();
            const result = await db.query(
                `DELETE FROM doctors WHERE id = $1 RETURNING *`, [doctorId]
            )

            if (result?.rowCount === 0) {
                throw new CustomError("Doctor not found or already deleted", 404)
            }

            console.log(result)
            return {
                status: "Success",
                message: "One Doctor Deleted",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }
}