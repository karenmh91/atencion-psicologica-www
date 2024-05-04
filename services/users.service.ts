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

export const getAllUser = () => {
  return axios.get(URL + 'users',{params:{'active':true}})
  .then(response => response.data)
  .then(data => data);
}


export const setUSer = (form: any) => { 
  return axios.post(URL + 'signup', form)
    .then((res) => res.data.response) 
}

export const editUser = (form: any) => {
  return axios.put(URL + 'users/update', form)
    .then((res) => res.data.response) 
}

export const deleteUser= (id: number) => {
  return axios.delete(URL + `users/delete`,{params:{'id':id}})
    .then((res) => res) 
}  