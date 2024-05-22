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

export interface Request {
    id: number;
    name: string;
    nomina_number: string;
    email: string;
    phone: string;
    motive_appointment: string | null;
    date_request: Date;
    hour_request: string;
    origin_system: number;
    id_request_status: number;
    active: boolean;
    id_user_created_by: number | null;
    created_at: string;
    id_user_edited_by: number | null;
    updated_at: string;
    resquest_status: RequestStatus | null;
    appointments: any;
}

export interface RequestResponse<T> {
    status: number;
    message: string | null;
    response: T;
}

export interface RequestStatus {
    id: number;
    description: string;
    active: boolean;
    id_user_created_by: number | null;
    id_user_edited_by: number | null;
    created_at: string;
    updated_at: string;
}
