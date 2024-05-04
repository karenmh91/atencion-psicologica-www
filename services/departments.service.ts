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

export const getAllDepartamentos = () => {
  return axios.get(URL + 'departamento',{params:{'active':true}})
    .then(response => response.data)
    .then(data => data);
}

export const getAllDepartamentosByIdSecretaria = (id_secretaria:any) => {
  var params = new URLSearchParams();
  params.append("id", id_secretaria);
  return axios.post(URL + 'departamento/findbyidsecretaria',params)
    .then(response => response.data.response )
    .then(data => data);
}

export const setDepartamento= (form: any) => { 
  return axios.post(URL + 'departamento', form)
    .then((res) => { res.data.response }) 
}

export const editDepartamento= (form: any) => {
  return axios.put(URL + 'departamento', form)
    .then((res) => res.data.response) 
}


export const deleteDepartamento= (id: number) => {
  return axios.delete(URL + `departamento`,{params:{'id':id}})
    .then((res) => res) 
}  
