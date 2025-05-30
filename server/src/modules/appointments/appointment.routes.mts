import express from 'express';
import { createAppointment, deleteAppointment, getAppointment, getAppointments, updateAppointment } from './appointment.controller.mjs';

const appointmentRouter = express.Router();

appointmentRouter.post('/', async (req, res) => {
    try {
        const appointmentData = req.body;
        // console.log(appointmentData);
        const response = await createAppointment(appointmentData);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

appointmentRouter.get('/:appointmentId', async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const response = await getAppointment(appointmentId);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

appointmentRouter.get('/', async (req, res) => {
    try {
        const response = await getAppointments();
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

appointmentRouter.patch('/:appointmentId', async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const appointmentData = req.body;
        const response = await updateAppointment(appointmentId, appointmentData);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})


appointmentRouter.delete('/:appointmentId', async (req, res) => {
    try {
        const {appointmentId} = req.params;
        const response = await deleteAppointment(appointmentId);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})



export default appointmentRouter;