import { CreateRequest, Request, RequestResponse } from '@/models/interfaces';
import { URL } from './enviroments.d';
import axios from 'axios';
import useAlertsStore from '@/store/storeAlerts';

if (typeof localStorage !== 'undefined') {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('access_token');
}

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ERR_NETWORK' || error.response?.status === 401) {
            // Si hay un error de red o el código de respuesta es 401 (No autorizado)

            // Limpiar el localStorage si está definido
            if (
                typeof window !== 'undefined' &&
                typeof localStorage !== 'undefined'
            ) {
                localStorage.clear();
            }
        }

        // Propaga el error para que otras partes de la aplicación lo manejen si es necesario
        return Promise.reject(error);
    }
);

export const getRequestStatuses = () =>
    axios
        .get(`${URL}requestStatus`, { params: { active: true } })
        .then((response) => response.data)
        .then((data) => data);

export const getAllRequests = () =>
    axios
        .get(`${URL}requests`, { params: { active: true } })
        .then((reponse) => reponse.data)
        .then((data) => data);

export const createRequest = (request: CreateRequest) =>
    axios
        .post(`${URL}requests`, {
            name: request.name,
            nomina_number: request.nomina_number,
            email: request.email,
            phone: request.phone,
            motive_appointment: request.motive_appointment,
            date_request: request.date_request,
            hour_request: request.hour_request,
            origin_system: request.origin_system,
            id_request_status: request.id_request_status,
            id_user_created_by: request.id_user_created_by,
        })
        .then((response) => response.data)
        .then((data: RequestResponse<Request>) => data)
        .catch((err): RequestResponse<null> => {
            let resError: RequestResponse<null> = {
                status: err.response.status,
                message:
                    'Error en la conexión o de autorización. Revisarlo con el equipo de soporte técnico.',
                response: null,
            };

            return resError;
        });

export const updateRequestStatus = (idRequest: number, idStatus: number) =>
    axios
        .put<{ status: number; response: string }>(
            `${URL}requests/updateStatus`,
            {
                id: idRequest,
                status: idStatus,
            }
        )
        .then((response) => response.data)
        .then((data) => data);
