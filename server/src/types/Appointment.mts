enum BookingStatus {
    PENDING = "pending",
    PAID = "paid",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled"
}

interface Service {
    type: string;
    price: number;
}

export interface Appointment {
    id: string;
    name: string;
    phone: string;
    email: string;
    doctor?: string;
    service: Service[];
    status: BookingStatus;
    createdAt: Date; 
    updatedAt: Date;
}

// DB SCHEMA
export interface AppointmentDocument {
    id: string;
    appointments: Appointment[];
}
