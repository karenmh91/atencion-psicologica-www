import axios from "axios";
import { URL } from "./enviroments.d";

if (typeof localStorage !== 'undefined') {
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')
}

axios.interceptors.response.use(
  response => response,
  error => { 
    if (error.code === "ERR_NETWORK" || error.response.status == 401) {
      if (typeof window !== 'undefined') {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }    
      }
    } 
    return Promise.reject(error);
  }
);

export const getAllSecretaries = () => {
  return axios.get(URL + 'secretaria', { params: { 'active': true } })
    .then(response => response.data)
    .catch(error => {
      console.error("Error in getAllSecretaries:", error);
      throw error;
    });
}

export const setSecretary = (form: any) => {
  return axios.post(URL + 'secretaria', form)
    .then(res => res.data.response)
    .catch(error => {
      console.error("Error in setSecretary:", error);
      throw error;
    });
}

export const editSecretary = (form: any) => {
  return axios.put(URL + 'secretaria', form)
    .then(res => res.data.response)
    .catch(error => {
      console.error("Error in editSecretary:", error);
      throw error;
    });
}

export const deleteSecretary = (id: number) => {
  return axios.delete(URL + `secretaria`, { params: { 'id': id } })
    .then(res => res)
    .catch(error => {
      console.error("Error in deleteSecretary:", error);
      throw error;
    });
}
