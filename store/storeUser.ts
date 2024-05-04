'use client'
import { User } from '@/models/interfaces'
import create from 'zustand'
// create store
import { persist } from 'zustand/middleware'

const INITIAL_FORM: User = {
    id: 0,
    name: "",
    active: true,
    created_at: new Date,
    updated_at: new Date,
    id_user_created_by: 0,
    id_user_edited_by: 0,
    last_name_1: '',
    last_name_2: '',
    email: '',
    password:'',
    admin: 0
}

const storeUser = create()(
  persist(
    (set) => ({
        user: INITIAL_FORM,
        setUserStore: (data: User) => set({ user: data }),
        removeUserStore: () => set({ user: INITIAL_FORM })
    }),
    {
      name: "userStore"
    }
  )
)

export default storeUser