import { MongoClient } from "mongodb";
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { config } from "../config/config.mjs";
// const url = "mongodb://localhost:27017/"; (IPv6)
const url = process.env.MONGODB_URI ?? "";
const mongoClient = new MongoClient(url);
let db;
let sqlDb;
/*
Current Collection/s:
- my_clinic
*/
export const mongoDatabase = async (collection) => {
    try {
        if (!db) {
            await mongoClient.connect();
            db = mongoClient.db("Appointment_Booking");
            console.log("Connected to DB");
        }
        return db.collection(collection);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const sqlDatabase = async () => {
    try {
        if (!db) {
            const pool = mysql.createPool({
                host: "localhost",
                user: "root",
                password: config.sqlPassword,
                database: config.sqlDatabase
            });
            sqlDb = pool;
        }
        return sqlDb;
        // const dbQuery = await pool.query('CREATE TABLE IF NOT EXISTS users (name VARCHAR(20), lname VARCHAR(20));');
        // console.log('Table created or already exists.', dbQuery);
    }
    catch (error) {
        console.error('Error connecting to SQL or creating table:', error);
        throw error;
    }
};
