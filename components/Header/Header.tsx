'use client'
import Image from "next/image";

export const Header = () => {

  return (
    <header>
    <div className=" grid grid-cols-3 items-center border-b border-gray-300 ">
      <div className="px-8 invisible md:visible">
          <p className="text-lg">
            <strong>Sistema Administrador de Atención Psicológica (SIAAP) </strong>
          </p> 
      </div>
      <div className="p-4 items-center justify-center content-center">
        <Image className="mx-auto"  src="/logo_public.svg" alt="logo" width={200}  height={200} />    
      </div>
    </div>
  </header>
   
  )
};
