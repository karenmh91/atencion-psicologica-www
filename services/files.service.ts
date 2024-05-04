import { URL } from "./enviroments.d";
import axios from "axios"; 

if (typeof localStorage !== 'undefined') {
  axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')
}

axios.interceptors.response.use(
  response => response,
  error => { 
    if(error.code ==="ERR_NETWORK" || error.response.status == 401){
      if (typeof window !== 'undefined') {
        if (typeof localStorage !== 'undefined') {
          localStorage.clear();
        }    
      }
    } 
});

export const getAllSeguimiento= (id: number) => {
  return axios.get(URL +'expediente/seguimiento',{params:{'id':id}})
    .then((res) => res.data.response)
    .catch(error => error)
}

export const setSeguimiento = (form: any) => {
  return axios.post(URL + 'expediente/seguimiento', form)
    .then((res) => res.data)
}

export const getAllExpedientes= () => {
  return axios.get(URL +'expediente',{params:{'active':true}})
    .then((res) => res.data)
    .catch(error => error)
}

export const setExpediente = (form: any) => {
  return axios.post(URL + 'expediente', form)
    .then((res) => res.data.response)
}

export const setExpedienteEstado = (form: any) => {
  return axios.put(URL + 'expediente/estado', form)
    .then((res) => res.data.response)
}

export const editExpediente = (form: any) => {
  return axios.put(URL + 'expediente', form)
    .then((res) => res.data.response) 
}  

export const deleteExpediente = (id: number) => {
  return axios.delete(URL + `expediente`,{params:{'id':id}})
    .then((res) => res)
    .catch(error => error)
}  

export const addFuncionarioExpediente= (form: any) => {
  return axios.put(URL + 'expediente/funcionario', form)
    .then((res) => res.data) 
}
 
export const getAllDenunciados= (id_denuncia: number) => {
  return axios.get(URL +'expediente/funcionario',{params:{'id_expediente':id_denuncia}})
    .then((res) => res.data)
    .catch(error => error)
}

export const deleteDenunciado = (id: number) => {
  return axios.delete(URL + `expediente/funcionario`,{params:{'id':id}})
    .then((res) => res)
    .catch(error => error)
}  

 