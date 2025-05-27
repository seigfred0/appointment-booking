import express from 'express';
import { createDoctor, getDoctors } from './doctors.controller.mjs';
const doctorRoutes = express.Router();
doctorRoutes.get('/', async (req, res, next) => {
    try {
        const response = await getDoctors();
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
doctorRoutes.post('/', async (req, res, next) => {
    try {
        const doctorsData = req.body;
        const response = await createDoctor(doctorsData);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
export default doctorRoutes;
