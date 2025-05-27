import express from 'express';
import { createClinic, deleteClinic, getClinic, getClinics, updateClinic } from './clinic.controller.mjs';
import { CustomError } from '../../utils/customError.mjs';

const clinicRouter = express.Router();

clinicRouter.post('/', async (req, res) => {
    try {
        const clinicInfo = req.body;
        const response = await createClinic(clinicInfo)
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

clinicRouter.get('/:clinicId', async (req, res) => {
    try {
        const { clinicId } = req.params;
        const response = await getClinic(clinicId);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

clinicRouter.get('/', async (req, res) => {
    try {
        const response = await getClinics();
        res.send(response);
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

clinicRouter.patch('/:clinicId', async (req, res) => {
    try {
        const { clinicId } = req.params;
        const clinicData = req.body;
        const response = await updateClinic(clinicId, clinicData);
        res.send(response)
    } catch (error: any) {
        const errorCode  = error?.errorCode || 500;
        res.status(errorCode).send(error);
    }
})

clinicRouter.delete('/:clinicId', async (req, res) => {
     try {
        const { clinicId } = req.params;
        const response = await deleteClinic(clinicId);
        res.send(response);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default clinicRouter;