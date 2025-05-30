
export interface ClinicType {
    id: string,
    name: string,
    address: string
}

export interface DoctorType {
    id: string,
    clinic_id: string,
    name: string,
    email: string,
    phone: string,
    specialization: string,
    status: string,
}

export interface PatientType {
    id: string,
    clinic_id: string,
    name: string,
    email: string,
    phone: string,
}

export interface AppointmentType {
    id: string,
    doctor_id: string, //FK
    patient_id: string,  //FK
    clinic_id: string,  //FK        
    start_time: Date,
    end_time: Date,
    status: string,
    created_at: Date,
}

export interface DoctorScheduleType {
    id: string,
    doctor_id: string, //FK
    clinic_id: string, //FK
    day_of_week: number, // 1-7 for Sunday-Saturday
    start_time: string, 
    end_time: string, 
    is_available: boolean,
}

