import express from 'express';
import { ClinicModel } from './modules/clinics/clinic.model.mjs';
import { ErrorResponse } from './types/Response.mjs';
import { getErrorMessage } from './utils/errorHelper.mjs';
import clinicRouter from './modules/clinics/clinic.routes.mjs';
import doctorRouter from './modules/doctors/doctor.routes.mjs';
import patientRouter from './modules/patients/patient.routes.mjs';
import appointmentRouter from './modules/appointments/appointment.routes.mjs';
import testingRouter from './test.mjs';

const app = express();
app.use(express.json());

app.use('/api/v1/test', testingRouter)

app.use('/api/v1/clinics', clinicRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/patients', patientRouter);

app.use('/api/v1/appointments', appointmentRouter);



// app.get('/test', async (req, res) => {
//     try {
//         const clinicModel = new ClinicModel();
//         const response = await clinicModel.create('e0ab224b-bbb9-4822-96d1-4137a0eac53c', 'sample clinic', 'somewhere');
//         console.log(response)
//         res.send(response);
//     } catch (error: unknown) {
//         const errorResponse: ErrorResponse = {
//             status: 'Error',
//             errorMessage: getErrorMessage(error),
//             errorSource: "Clinic Model Create"

//         }
//         res.status(500).send(errorResponse);
//     }
// })

app.listen(5000, () => {
    console.log('server running');
})