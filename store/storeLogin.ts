'use client' 
import { create } from 'zustand'

const initial_name=""; 

const storeLogin = create((set) => ({
  user_name: initial_name, 
  setLoginStore: (data: String) => set({ user_name: data }) ,
  removeLoginStore: () => set({ user_name: initial_name })
  })
)

export default storeLogin