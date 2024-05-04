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

export const getAllDenuncias = () => {
  return axios.get(URL +'denuncia',{params:{'active':true}})
    .then((res) => res.data)
    .catch(error => error)
}

export const getAllDenunciasHonorYJusticia = () => {
  return axios.get(URL +'denuncia',{params:{'active':true,"honor_justicia":true}})
    .then((res) => res.data)
    .catch(error => error)
}

export const setComplaint = (form: any) => {
  
   
  return axios.post(URL + 'denuncia', form)
    .then((res) =>  res.data.response ) 
}

export const editComplaint = (form: any) => {
  return axios.put(URL + 'denuncia', form)
    .then((res) => res.data.response) 
}

export const getAllTestigos= (id_denuncia: number) => {
  return axios.get(URL +'denuncia/testigo',{params:{'id_denuncia':id_denuncia}})
    .then((res) => res.data)
    .catch(error => error)
}

export const getAllFuncionarios= (id_denuncia: number) => {
  return axios.get(URL +'denuncia/funcionario',{params:{'id_denuncia':id_denuncia}})
    .then((res) => res.data)
    .catch(error => error)
}

export const addTestigo= (form: any) => {
  return axios.put(URL + 'denuncia/testigo', form)
    .then((res) => res.data) 
}
 
export const addFuncionario= (form: any) => {
  return axios.put(URL + 'denuncia/funcionario', form)
    .then((res) => res.data) 
}

export const getStatistics= (year:number) => {
  return axios.get(URL + 'statistics',{params:{'year':year}})
    .then((res) => res.data.response)
    .catch(error => error)
} 

export const getStatisticsMonthly= (year:number) => {
  return axios.get(URL + 'statistics/monthly',{params:{'year':year}})
    .then((res) => res.data.response)
    .catch(error => error)
} 

export const deleteComplaint = (id: number) => {
  return axios.delete(URL + `denuncia`,{params:{'id':id}})
    .then((res) => res)
    .catch(error => error)
}  

 

export const download=(id:number, documentType:string)=>{
  return axios({
    url:URL + 'download',
    responseType:'blob',
    method: 'GET',
    params:{'id':id, 'document_type':documentType}
  }) 
}

export const getDenuncia= (form: any) => {
  return axios.post(URL +'denuncia/findbyid',form)
    .then((res) => res.data)
    .catch(error => error)
}

export const deleteComplaintFuncionario = (id: number) => {
  return axios.delete(URL + `denuncia/funcionario`,{params:{'id':id}})
    .then((res) => res)
    .catch(error => error)
}  

export const deleteComplaintTestigo = (id: number) => {
  return axios.delete(URL + `denuncia/testigo`,{params:{'id':id}})
    .then((res) => res)
    .catch(error => error)
} 

export const turnarComplaint = (id: number,honor_justicia:any) => {
  let form = {'id':id, 'honor_justicia':honor_justicia}
  return axios.put(URL + 'denuncia/turnar', form)
    .then((res) => res) 
}

export const sendEmail= (id_denuncia: any, correo:any) => {
  var params = new URLSearchParams();
  params.append("id", id_denuncia);
  params.append("email", correo);
  return axios.post(URL +'email',params)
    .then((res) => res.data)
    .catch(error => error)
}


 