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

export const getAllSanctions = () => {
  return axios.get(URL + 'sancion',{params:{'active':true}})
    .then(response => response.data)
    .then(data => data);
}
 

export const setSanction= (form: any) => { 
  return axios.post(URL + 'sancion', form)
    .then((res) => { res.data.response }) 
}

export const editSanction= (form: any) => {
  return axios.put(URL + 'sancion', form)
    .then((res) => res.data.response) 
}


export const deleteSanction= (id: number) => {
  return axios.delete(URL + `sancion`,{params:{'id':id}})
    .then((res) => res) 
}  
