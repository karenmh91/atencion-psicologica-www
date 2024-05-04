import './globals.css'
import { AuthGuard } from '@/app/Guard/auth.guard'
import { Footer } from '@/components/Footer/Footer'

import { Header } from '@/components/Header/Header'
import NavBar from '@/components/Nav'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema Administrador de Atención Psicológica',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header/>
        <NavBar/>
        <AuthGuard>
          {children}
        </AuthGuard> 
        <Footer/>
      </body>
    </html>
  )
}
