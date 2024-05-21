export interface AuthUser {
    email: string;
    password: string;
}

export interface CreateRequest {
    name: string;
    nomina_number: string;
    email: string;
    phone: string;
    motive_appointment: string;
    date_request: string;
    hour_request: string;
    origin_system: number;
    id_request_status: number;
    id_user_created_by: number;
}
