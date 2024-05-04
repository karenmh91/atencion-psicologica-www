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

export const getAllDocuments = (id_denuncia:number) => {
  return axios.get(URL + 'denuncia/documentos',{params:{'id_denuncia':id_denuncia}})
    .then((res) => res)
    .catch(error => error)
}

export const getAllDocumentsById = (id_audience:number) => {
  return axios.post(URL + 'documents/findbyid',{'id':id_audience})
    .then((res) => res.data.response)
    .catch(error => error)
}

export const downloadDocument= (id: number) => { 
    return axios({
      url:URL + 'denuncia/download',
      responseType:'blob',
      method: 'GET',
      params:{'id':id}
    }) 
}  

  

export const deleteDocument= (id: number) => {
  return axios.delete(URL + `denuncia/documento`,{params:{'id':id}})
    .then((res) => res) 
}  

export const setFiles = (form: any) => { 
  return axios.post(URL + 'denuncia/adjunto', form)
    .then((res) => res.data.response) 
}