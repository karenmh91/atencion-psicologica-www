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

export const getAllSurveys = () => {
  return axios.get(URL + 'surveys',{params:{'active':true}})
    .then(response => response.data)
    .then(data => data);
}