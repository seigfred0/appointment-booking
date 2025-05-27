import express from 'express';
import { createDoctor, deleteDoctor, getDoctor, getDoctors, updateDoctor } from './doctor.controller.mjs';
import { DoctorType } from '../../types/Types.mjs';
import { createDoctorSchedule, deleteDoctorSchedule, getDoctorSchedule, getDoctorSchedules, updateDoctorSchedule } from './doctors-schedule/doctorSchedule.controller.mjs';


const doctorRouter = express.Router();






// CRUD BASIC ROUTES FOR DOCTORS //////////////////////
doctorRouter.post('/', async (req, res) => {
    try {
        const doctorData = req.body;
        const response = await createDoctor(doctorData);
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.get('/', async (req, res) => {
    try {
        const response = await getDoctors();
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.get('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const response = await getDoctor(doctorId);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.patch('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const doctorData: DoctorType = req.body;
        const response = await updateDoctor(doctorId, doctorData)
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.delete('/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const response = await deleteDoctor(doctorId);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})


// //////////////// Schedule Routes ////////////////////////////

doctorRouter.post('/:doctorId/schedule', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const scheduleData = req.body;
        const response = await createDoctorSchedule(doctorId, scheduleData);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.get('/:doctorId/schedule/:scheduleId', async (req, res) => {
    try {
        const { doctorId, scheduleId } = req.params;
        const response = await getDoctorSchedule(doctorId, scheduleId)
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.get('/:doctorId/schedule', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const response = await getDoctorSchedules(doctorId)
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.patch('/:doctorId/schedule/:scheduleId', async (req, res) => {
    try {
        const { doctorId, scheduleId } = req.params;
        const scheduleData = req.body;
        const response = await updateDoctorSchedule(scheduleId, scheduleData);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

doctorRouter.delete('/:doctorId/schedule/:scheduleId', async (req, res) => {
    try {
        const { doctorId, scheduleId } = req.params;
        const response = await deleteDoctorSchedule(doctorId, scheduleId);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})





export default doctorRouter;
