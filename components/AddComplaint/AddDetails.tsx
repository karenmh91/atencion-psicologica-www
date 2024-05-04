import { IPropsFormDenunciaValidacion } from '@/models/interfaces' 
import { useEffect, useState } from "react"; 

 
export default function AddDetails({ handleChange, denuncia, setForm, error }: IPropsFormDenunciaValidacion) {
  const [audienceEdit, setAudienceEdit]=useState(false); 
  let editable=false;
 
  useEffect(() => {function setEdit(){ 
  }
 
  setEdit()

  }, []);

  return (
    <div className=''>
        <div className="py-3">Sus datos personales se encuentran protegidos en términos de lo señalado por las  leyes y demás disposiciones aplicables en materia de Transparencia y protección de datos personales.</div>

        <form className='w-full px-2'> 

        <div className='md:flex md:flex-row md:gap-4 w-full py-5'>   
            <section>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="anonimo" value={denuncia.anonimo} onChange={handleChange} className="sr-only peer"  disabled={false}/>
              <div
                className={`w-11 h-6
                rounded-full 
                  ${!!denuncia.anonimo ? "bg-black" : "bg-gray-200"} 
                  ${!!denuncia.anonimo ? "after:translate-x-full" : "after:translate-x-0"}
                  peer-checked:after:border-white
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:h-5 after:w-5 after:transition-all
                `}
              >
              </div>
              <span className="ml-3 text-md font-medium text-gray-900 ">¿La denuncia es anónima?</span>
            </label>
          </section>
          
        </div>

        <div className="py-5"><strong>Denunciante</strong></div>
        { !!denuncia.anonimo && ( 
            <div className='md:flex md:flex-row md:gap-4 w-full py-5'> 
                <section>
                Si tu denuncia es anónima puedes dejar tu teléfono o correo electrónico para contactarte en caso de requerir información adcional 
                (dejar estos datos de contacto es opcional)
                </section>
            </div>
        )}
        { !!denuncia.anonimo && (
          <div className='md:flex md:flex-row md:gap-4'>

            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
              <label htmlFor="celular" className='text-sm'>
                <strong>Teléfono</strong>
              </label>
              <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                <input type="number" name="celular" onChange={handleChange} value={denuncia.celular} className='bg-transparent w-full' disabled={editable} />
              </div>
            </section>

            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
              <label htmlFor="email" className='text-sm'>
                <strong>Email</strong>
              </label>
              <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                <input type="text" name="email" onChange={handleChange} value={denuncia.email} className='bg-transparent w-full' disabled={editable} />
              </div>
            </section>

            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'></section>
           
          </div>
        )}

        { !!denuncia.anonimo && ( 
            <div className='md:flex md:flex-row md:gap-4 w-full py-5'> 
                <section>
                Sus datos personales se encuentran protegidos en términos de lo señalado por las leyes y demás
                disposiciones aplicables en materia de Transparencia y Protección de Datos Personales.
                </section>
            </div>
        )}

        { !denuncia.anonimo && (
        <div className='md:flex md:flex-row md:gap-5'>
            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
                <label htmlFor="nombre" className='text-sm'>
                <strong>Nombre(s)</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                <input type="text" name="nombre" onChange={handleChange} value={denuncia.nombre} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>

            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
                <label htmlFor="apellido_paterno" className='text-sm'>
                <strong>Apellido Paterno</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                <input type="text" name="apellido_paterno" onChange={handleChange} value={denuncia.apellido_paterno} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>


            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
                <label htmlFor="apellido_materno" className='text-sm'>
                    <strong>Apellido Materno</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                    <input type="text" name="apellido_materno" onChange={handleChange} value={denuncia.apellido_materno} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>

        </div> 
        )}

        { !denuncia.anonimo && (
        <div className='md:flex md:flex-row md:gap-4'>
        <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
          <label htmlFor="sexo" className='text-sm'>
            <strong>Sexo</strong>
          </label>
          <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
            <select
              name="sexo"
              onChange={handleChange}
              value={denuncia.sexo}
              className='bg-transparent w-full'
              disabled={editable}
            >
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="no_binario">No binario</option>
              <option value="no_especificar">No especificar</option>
            </select>
          </div>
        </section>


            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
                <label htmlFor="fecha_nacimiento" className='text-sm'>
                <strong>Fecha de nacimiento</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                <input type="date" name="fecha_nacimiento" onChange={handleChange} value={denuncia.fecha_nacimiento} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>


            <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
                <label htmlFor="email" className='text-sm'>
                    <strong>Email*</strong>
                </label>
                <div className={`${error ? 'border-2 border-rose-500' : ''} bg-stone-100 rounded-md flex items-center p-1 pr-3`}>
                    <input type="text" name="email" onChange={handleChange} value={denuncia.email} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>
         
        </div> 
        )}

        { !denuncia.anonimo && (
        <div className="md:flex md:flex-row md:gap-4"> 
             <section className='flex flex-col gap-2 mt-3 mb-3 w-1/3'>
                <label htmlFor="celular" className='text-sm'>
                    <strong>Teléfono/celular</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
                    <input type="number" name="celular" onChange={handleChange} value={denuncia.celular} className='bg-transparent w-full' disabled={editable}/>
                </div>
            </section>
 
        </div> 
        )}

        <div className="py-10 text-center"><strong><a target="_blank" href="https://transparencia.sanpedro.gob.mx/documentosAvisosPrivacidad/%205307/_2023121_66_Aviso%20de%20privacidad%20Sistema%20Integral%20de%20Denuncias%20Final.pdf">Consulta aqui nuestro aviso de privacidad</a> </strong></div>

      </form>
    </div>
  )
}