'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
  
function NavBar() {
  const router = usePathname()

  return (
    <div className="border-b border-gray-200 px-4 sm:px-44">
      <div className='w-full mx-auto px-0 sm:px-4 block'>
        <div className='py-2'>
          <ul className='m-0 p-0 gap-3 py-2'> 
            <li className='inline-block pl-[15px] pr-[13px] cursor:pointer'>
              <Link className={router == "/" ? "text-[#000]" : "text-[#999999] hover:text-[#000]"} href="/">Inicio</Link>
            </li>
            <li className='inline-block pl-[15px] pr-[13px] cursor:pointer'>
              <Link className={router == "/denuncia" ? "text-[#000]" : "text-[#999999] hover:text-[#000]"} href="/denuncia">Iniciar denuncia</Link>
            </li>
            <li className='inline-block pl-[15px] pr-[13px] cursor:pointer'>
              <Link className={router == "/seguimiento" ? "text-[#000]" : "text-[#999999] hover:text-[#000]"} href="/seguimiento">Seguimiento</Link>
            </li>
          </ul>
        </div>  
      </div>
    </div>
  );
};

export default NavBar;
