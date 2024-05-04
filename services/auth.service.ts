import { AuthUser } from "@/models/interfaces"
import axios from "axios";
import { URL } from "./enviroments.d";


export const loginAuth = async (user: AuthUser) => {
  try {
    const response = await axios.post(URL + 'login', user)
    if (!response.data || !response.data.access_token) return new Error('No se pudo iniciar sesión')
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('admin', response.data.admin)
      localStorage.setItem('username', response.data.name)
      localStorage.setItem('admin', response.data.admin)
      localStorage.setItem('tipo', response.data.tipo)
    }
    return response.data
  } catch (error) { 
    return error
  }
}

export function getToken() {
  if (typeof localStorage !== 'undefined') {
    const access_token = window.localStorage.getItem("access_token")
    return access_token
  }
}

export function getUsername() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("username") ?? ''
  }
}
export function getAdminUser() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("admin");
  }
}

export function getTipo() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem("tipo");
  }
}