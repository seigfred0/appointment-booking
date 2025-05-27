import { connectDB } from "../../db.mjs";
import { Response } from "../../types/Response.mjs";
import { PatientType } from "../../types/Types.mjs";
import { queryBuilder } from "../../utils/queryHelper.mjs";


export class PatientModel {
    async create(patientData: PatientType): Promise<Response<PatientType>> {
        try {
            const db = await connectDB();
            
            const result = await db.query(
                `INSERT INTO patients(id, clinic_id, name, email, phone, status, updated_at) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [
                    patientData.id, 
                    patientData.clinic_id, 
                    patientData.name, 
                    patientData.email, 
                    patientData.phone, 
                    patientData.status,
                    patientData.updated_at, 
                ]
            )
            return {
                status: "Success",
                message: "One Patient Added",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async getOne(patientId: string): Promise<Response<PatientType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `SELECT * FROM patients WHERE id = $1`, [patientId]
            )
            return {
                status: "Success",
                message: "One Patient Retrieved",
                info: result['command'],
                payload: result.rows
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<Response<PatientType>> {
        try {
            const db = await connectDB();
            const result = await db.query('SELECT * FROM patients');
            return {
                status: "Success",
                message: "All Patient Retrieved",
                info: result['command'],
                payload: result.rows
            }
        } catch (error) {
            throw error
        }
    }

    async update(patientId: string, patientData: PatientType): Promise<Response<PatientType>> {
        try {
            const db = await connectDB();
            const {query, values} = queryBuilder('patients', patientId, patientData)
            const result = await db.query(query, values);
            return {
                status: "Success",
                message: "One Patient Updated",
                info: {command: result['command'], rows: result['rows']},
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(patientId: string): Promise<Response<PatientType>> {
        try {
            const db = await connectDB();
            const result = await db.query(
                `DELETE FROM patients WHERE id = $1 RETURNING *`, [patientId]
            )
            return {
                status: "Success",
                message: "One Patient Deleted",
                info: result['command'],
                payload: result.rows
            }
        } catch (error) {
            throw error;
        }
    }
}