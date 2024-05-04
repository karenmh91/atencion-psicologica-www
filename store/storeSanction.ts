'use client'
import { Sanction } from '@/models/interfaces'
import create from 'zustand'
// create store
import { persist } from 'zustand/middleware'

const INITIAL_FORM: Sanction = {
    id: 0, 
    nombre: "",  
    descripcion: "", 
    activo: true 
}

const storeSanction = create()(
  persist(
    (set) => ({
        sanction: INITIAL_FORM,
        setSanctionStore: (data: Sanction) => set({ sanction: data }),
        removeSanctionStore: () => set({ sanction: INITIAL_FORM })
    }),
    {
      name: "sanctionStore"
    }
  )
)

export default storeSanction