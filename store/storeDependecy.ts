'use client'
import { Dependencia } from '@/models/interfaces'
import { create } from 'zustand'

const INITIAL_FORM: Dependencia = {
  id: 0, 
  id_secretaria:0,
  nombre: ''
}

//dependenciaStore
const storeDependecy= create((set) => ({
  dependecy: INITIAL_FORM,
    setDependenciaStore: (data: Dependencia) => set({ dependecy: data }),
    removeDependenciaStore: () => set({ dependecy: INITIAL_FORM })
  })
)

export default storeDependecy