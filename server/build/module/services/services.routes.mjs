import { Router } from "express";
import { createService, deleteService, getService, getServices, updateService } from "./services.controller.mjs";
const serviceRoutes = Router();
serviceRoutes.get('/', async (req, res, next) => {
    try {
        const response = await getServices();
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
serviceRoutes.get('/:serviceId', async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const response = await getService(serviceId);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
serviceRoutes.post('/', async (req, res, next) => {
    try {
        const serviceData = req.body;
        const response = await createService(serviceData);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
serviceRoutes.patch('/:serviceId', async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const updateData = req.body;
        const response = await updateService(serviceId, updateData);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
serviceRoutes.delete('/:serviceId', async (req, res, next) => {
    try {
        const { serviceId } = req.params;
        const response = await deleteService(serviceId);
        res.send(response);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
export default serviceRoutes;
