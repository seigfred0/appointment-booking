
import express from 'express';
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from './patient.controller.mjs';


const patientRouter = express.Router();

patientRouter.post('/', async (req, res) => {
    try {
        const patientData = req.body;
        const response = await createPatient(patientData);
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

patientRouter.get('/:patientId', async (req,res) => {
    try {
        const {patientId} = req.params;
        const response = await getPatient(patientId);
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

patientRouter.get('/', async (req, res) => {
    try {
        const response = await getPatients();
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

patientRouter.patch('/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientData = req.body;
        const response = await updatePatient(patientId, patientData);
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

patientRouter.delete('/:patientId', async (req, res) => {
    try {
        const {patientId} = req.params;
        const response = await deletePatient(patientId);
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})



export default patientRouter;