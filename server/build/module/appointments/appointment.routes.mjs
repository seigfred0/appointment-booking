import { Router } from "express";
import { bookAppointment, deleteAppointment, getAppointment, getAppointments, updateAppointment } from "./appointment.controller.mjs";
const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const response = await getAppointments();
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
router.get('/:appointmentId', async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const response = await getAppointment(appointmentId);
        res.send(response);
        // const error = new Error("Something went wrong")
        // console.log(error.stack,'console error')
        // throw error
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const appointmentData = req.body;
        const response = await bookAppointment(appointmentData);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
router.patch('/:appointmentId', async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const updateData = req.body;
        const response = await updateAppointment(appointmentId, updateData);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
router.delete('/:appointmentId', async (req, res, next) => {
    try {
        const { appointmentId } = req.params;
        const response = await deleteAppointment(appointmentId);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
export default router;
