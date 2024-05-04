'use client'
import { Denuncia, Departamento, Secretaria } from '@/models/interfaces'
import { create } from 'zustand'

const INITIAL_FORM: Denuncia = {
  id: 0, 
  nombre: "",
  apellido_paterno: "",
  apellido_materno: "",
  celular: "",
  direccion: "" ,
  categoria: "",
  fecha: "",
  hora: "",
  donde_ocurrio: "",
  descripcion: "",
  anonimo: 0,
  tipo_denunciante: "",
  tipo_sistema: "web",
  sexo: "no_especificar",
  edad: "",
  email: "", 
  fecha_nacimiento: "",
  id_secretaria: 1,
  id_departamento: 1,
  active: true,
  honor_justicia: false,
  creado_por_honor_justicia:false,
  servidores_publicos_denuncias:[],
  testigos:[],
  adjuntos:[],
  tiene_testigos:0
}

const INITIAL_SEC: Secretaria = {
  id: 0,
  nombre: '',
  activo: true, 
}

//denunciaStore
const storeDenuncia= create((set) => ({
  denuncia: INITIAL_FORM,
  departamentos: [],
  secretaria: {},
    setDenunciaStore: (data: Denuncia) => set({ denuncia: data }),
    removeDenunciaStore: () => set({ denuncia: INITIAL_FORM }),
    setAllDepartamentoStore: (data: Departamento[]) => set({ departamentos: data }),
    setSecretariaStore: (data: any) => set({ secretaria: data })
  })
)

export default storeDenuncia