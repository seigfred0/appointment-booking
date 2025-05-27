import { DoctorsModel } from "./doctors.model.mjs";
const doctorsModel = new DoctorsModel();
export const createDoctor = async (data) => {
    try {
        const model = await doctorsModel.create(data);
        const response = {
            status: model.status,
            message: model.message,
            payload: model.payload
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const getDoctors = async () => {
    try {
        const model = await doctorsModel.getAll();
        const response = {
            status: model.status,
            message: model.message,
            payload: model.payload
        };
        return response;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
