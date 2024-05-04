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

export const getAllFractions = () => {
  return axios.get(URL + 'fractions',{params:{'active':true}})
    .then(response => response.data)
    .then(data => data);
}

export const setFraction= (form: any) => { 
  return axios.post(URL + 'fractions', form)
    .then((res) => { res.data.response }) 
}

export const editFraction= (form: any) => {
  return axios.put(URL + 'fractions/update', form)
    .then((res) => res.data.response) 
}


export const deleteFraction= (id: number) => {
  return axios.delete(URL + `fractions/delete`,{params:{'id':id}})
    .then((res) => res) 
}  
