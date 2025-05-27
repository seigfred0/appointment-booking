import { ServicesModel } from "./services.model.mjs";
const serviceModel = new ServicesModel();
export const createService = async (serviceData) => {
    try {
        const model = await serviceModel.create(serviceData);
        const response = {
            status: model.status,
            message: model.message,
            info: model.info
        };
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getServices = async () => {
    try {
        const model = await serviceModel.getServices();
        const response = {
            status: model.status,
            message: model.message,
            payload: model.payload
        };
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getService = async (serviceId) => {
    try {
        const model = await serviceModel.getService(serviceId);
        const response = {
            status: model.status,
            message: model.message,
            payload: model.payload
        };
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const updateService = async (serviceId, updateData) => {
    try {
        const model = await serviceModel.update(serviceId, updateData);
        const response = {
            status: model.status,
            message: model.message,
            info: model.info
        };
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const deleteService = async (serviceId) => {
    try {
        const model = await serviceModel.deleteService(serviceId);
        const response = {
            status: model.status,
            message: model.message,
            payload: model.payload
        };
        return response;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
