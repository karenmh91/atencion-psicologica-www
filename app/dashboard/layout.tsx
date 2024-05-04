'use client'
 import { getToken } from '@/services/auth.service';
import axios from 'axios';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (typeof localStorage !== 'undefined') {
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token');
  }
  return (
    <div>
      <header className='items-center border-b border-gray-300 py-4 px-4'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        <div className='flex justify-between items-center '>
         <p className='text-sm text-gray-400'>Portal de denuncias</p> 
       </div>
      </header>
      <div className='flex h-[calc(100vh-135px)]'> 
        {children}
      </div>
    </div>
  )
}
