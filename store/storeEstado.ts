'use client'
import { Estado } from '@/models/interfaces'
import create from 'zustand'
// create store
import { persist } from 'zustand/middleware'

const INITIAL_FORM: Estado = {
    id: 0, 
    nombre: "",  
    descripcion: "", 
    activo: true 
}

const storeEstado = create()(
  persist(
    (set) => ({
        estado: INITIAL_FORM,
        setEstadoStore: (data: Estado) => set({ estado: data }),
        removeEstadoStore: () => set({ estado: INITIAL_FORM })
    }),
    {
      name: "estadoStore"
    }
  )
)

export default storeEstado