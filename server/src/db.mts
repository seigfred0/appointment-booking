import 'dotenv/config';
import { Pool, } from 'pg'
// import { config } from "../config/config.mjs";


let db: Pool;

export const connectDB = async () => {
    try {
        if (!db) {
            const pool = new Pool({
                host: 'localhost',
                user: 'postgres',
                password: process.env.DB_PASSWORD,  
                database: process.env.DB, 
                max: 20,
                idleTimeoutMillis: 30000,
                connectionTimeoutMillis: 2000,
            })
            db = pool;
        }
        return db;
    } catch (error) {
        console.error('Error connecting to SQL or creating table:', error);
        throw error
    }
}

// async function addSomething() {
//     const uid = "650e3400-e29b-41d4-a716-446655440002";
//     const name = 'seiggyfred';
//     const address = 'malaybalay';

//     const result = await pool.query(
//         'INSERT INTO clinics (id, name, address) VALUES ($1, $2, $3) RETURNING *',
//         [uid, name, address]
//     );    
//     console.log(result.rows[0])
// }


/*
without rows[] / just .rows
[
  {
    id: '350e8400-e29b-41d4-a716-446655440002',
    name: 'seiggyfred',
    address: 'malaybalay'
  }
]
  */



