import 'dotenv/config';
export const config = {
    sqlPassword: process.env.SQL_PASSWORD,
    sqlDatabase: "appt_booking",
    port: 8000
};
