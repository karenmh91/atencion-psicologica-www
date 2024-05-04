'use client'
import { Secretaria } from '@/models/interfaces'
import create from 'zustand'
// create store
import { persist } from 'zustand/middleware'

const INITIAL_FORM: Secretaria = {
    id: 0, 
    nombre: "",   
    activo: true 
}

const storeSecretary = create()(
  persist(
    (set) => ({
        secretary: INITIAL_FORM,
        setSecretaryStore: (data: Secretaria) => set({ secretary: data }),
        removeSecretaryStore: () => set({ secretary: INITIAL_FORM })
    }),
    {
      name: "secretaryStore"
    }
  )
)

export default storeSecretary