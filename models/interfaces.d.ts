export interface AuthUser {
  email: string
  password: string
}
 


export interface Secretaria {
  id: number;
  nombre: string;
  activo: boolean;  
}

export interface Dependencia {
  id: number;
  id_secretaria: number;
  nombre: string;  
}

export interface Departamento {
  id: number;
  nombre: string;
  activo: boolean;  
  id_secretaria: number;
}

export interface Estado {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;  
}

export interface Sanction {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;  
}

export interface User {
  id: number;
  name: string;
  last_name_1: string;
  last_name_2: string;
  email: string;
  password: string;
  admin: number;
  active: number | boolean;
  id_user_created_by: number;
  id_user_edited_by: number;
  created_at: Date;
  updated_at: Date;
}

export interface Denuncia {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  celular: string;
  direccion: string ;
  categoria: string;
  fecha: string;
  hora: string;
  edad: string;
  donde_ocurrio: string;
  descripcion: string;
  anonimo: number;
  tipo_denunciante: string;
  sexo: string;
  fecha_nacimiento: string;
  email: string;
  id_secretaria: number;
  id_departamento: number;
  active: boolean;  
  honor_justicia: boolean;  
  creado_por_honor_justicia:boolean;
  tipo_sistema: string;  
  servidores_publicos_denuncias:any; 
  testigos:any; 
  adjuntos:any;
  honor_justicia: boolean,
  tiene_testigos:number,
}


export interface Document {
  id: number;
  id_audience: number;
  document_path: string;
  document_name: string;
  description: string;
  editable: number | boolean;
  active: number | boolean;
  id_user_created_by: number;
  id_user_edited_by: number;
  created_at: Date;
  updated_at: Date;
} 

export interface IPropsFormSanction{
  handleChange: (e) => void,
  sanction: Sanction, 
}

export interface IPropsFormDenuncia{
  handleChange: (e) => void,
  denuncia: Denuncia,
  setForm:any
}

export interface IPropsFormDenunciaValidacion{
  handleChange: (e) => void,
  denuncia: Denuncia,
  setForm:any,
  error:boolean,
}

export interface IPropsFormExpediente{
  handleChange: (e) => void,
  expediente: Expediente,
  setForm:any
}

export interface IDialog {
  title: string
  message: string
  open: boolean
  close: () => void
  action: () => void
}

export interface IDialogForm {
  title: string
  data: Denuncia
  open: boolean
  close: () => void
  action: () => void
}

export interface IPropsFormDocument {
  handleChange: (e) => void,
  docuent: Document
}
 
 

 
export interface IPropsFormUser {
  handleChange: (e) => void,
  user: User
}

export interface IPropsFormState {
  handleChange: (e) => void,
  state: Estado
}

export interface IPropsFormSecretary{
  handleChange: (e) => void,
  secretary: Secretaria
}

export interface IPropsFormDependecy{
  handleChange: (e) => void,
  dependecy: Dependencia, 
}

export interface IServidorPublico {
  index: number;
  nombre: string;
  descripcion: string;
}

export interface IDocumento {
  index: number;
  nombre: string;
  descripcion: string;
  file: File;
}

 

 