import axios from "axios";
import { URL } from "./enviroments.d";
 
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

export const getAllEstados = () => {
  return axios.get(URL + 'estado',{params:{'active':true}})
    .then(response => response.data)
    .then(data => data);
} 
 

export const setEstado= (form: any) => { 
  return axios.post(URL + 'estado', form)
    .then((res) => { res.data.response }) 
}

export const editEstado= (form: any) => {
  return axios.put(URL + 'estado', form)
    .then((res) => res.data.response) 
} 

export const deleteEstado= (id: number) => {
  return axios.delete(URL + `estado`,{params:{'id':id}})
    .then((res) => res) 
}  
