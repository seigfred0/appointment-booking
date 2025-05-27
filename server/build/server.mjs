import express from 'express';
import { config } from './config/config.mjs';
import appointmentRoutes from './module/appointments/appointment.routes.mjs';
import serviceRoutes from './module/services/services.routes.mjs';
import doctorRoutes from './module/doctors/doctors.route.mjs';
import { DoctorsModel } from './module/doctors/doctors.model.mjs';
const app = express();
app.use(express.json());
app.use("/api/appointment", appointmentRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/doctors", doctorRoutes);
app.get('/test', async (req, res) => {
    try {
        const data = req.body;
        const doctorModel = new DoctorsModel();
        const response = await doctorModel.getAll();
        res.send(response);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(config.port, () => {
    console.log('server running');
});
