import { Departamento, IPropsFormDenuncia, Secretaria } from '@/models/interfaces' 
import { useEffect, useState } from "react"; 
import { getAllSecretaries } from "@/services/secretaries.service";
import { getAllDepartamentosByIdSecretaria } from "@/services/departments.service";
import storeDenuncia from '@/store/store';
import { turnarComplaint } from '@/services/complaint.service';
import { Toaster, toast } from 'sonner';

 
export default function AddKeyData({ handleChange, denuncia, setForm }: IPropsFormDenuncia) {
  const [secretarias, setSecretarias] = useState<Secretaria[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [turn, setTurn] = useState(false);
  const updateStore = storeDenuncia((state: any) => state.setDenunciaStore)
  const updateDepartamentos = storeDenuncia((state:any) => state.setAllDepartamentoStore)
  const updateSecretaria = storeDenuncia((state:any) => state.setSecretariaStore)


  let editable=false; 

  useEffect(() => {

    async function getData() {
      try {
        const dataSecretarias = await getAllSecretaries();
          setSecretarias(dataSecretarias);
          setTurn(denuncia.honor_justicia); 
      } catch (error) {
        toast.error("No es posible obtener datos, favor de intentarlo mas tarde");
      }
    }
    
    
  getData()

  }, []);

  async function turnar(id:number, valor:any){
    await turnarComplaint(id,valor).then(response =>{ 
      if(response === undefined){
          toast.error("No es posible desasignar denuncia");
      }else{ 
        updateStore({
          ...denuncia,
          ['honor_justicia']:valor
        })
        setTurn(valor);
        toast.success("Denuncia actualizada correctamente");
      }
    } );
  }
  

  const changeDerpartamento = async e => {   
    handleChange(e) 

    const name = e.target.name;
    let value: any = e.target.value? e.target.value:"";   
 
    populateDepartamentos(value);
     
    const secretariaSelected = secretarias.find(s => s.id === parseInt(value))
    updateSecretaria(secretariaSelected) 
 }

 const populateDepartamentos=async (id_secretaria:number)=>{ 
  const dataDepartamentos = await getAllDepartamentosByIdSecretaria( id_secretaria)   
  let newid_denuncia=dataDepartamentos[0].id;

  updateStore({
    ...denuncia,
    ['id_departamento']:newid_denuncia,
    ['id_secretaria']:id_secretaria
  }) 

  setDepartamentos(dataDepartamentos)
  updateDepartamentos(dataDepartamentos)     
  }

  function setTurnado(valor:any){
 
    if(denuncia.id>0){
 
      turnar(denuncia.id, valor)
    }else{ 
      updateStore({
        ...denuncia,
        ['honor_justicia']:valor
      })
      setTurn(valor);

    }
  }


  return (
    <div className=''>
 

        <div className='md:flex md:flex-row md:gap-4 w-full'>
          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="fecha" className="text-sm">
              <strong>Fecha de los hechos*</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center pr-3" >
                
              <input
                type="date"
                name="fecha"
                onChange={handleChange}
                value={denuncia.fecha}
                className="bg-transparent w-full"
                placeholder="01/01/2023" 
                disabled={editable}
              />
            </div>
          </section> 
          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="date" className="text-sm">
              <strong>Hora de los hechos*</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center p-1 pr-3">
              <input
                type="time"
                name="hora"
                value={denuncia.hora}
                onChange={handleChange}
                className="bg-transparent w-full"
                placeholder="00:00"
                disabled={editable}
              />
            </div>
          </section>
        </div>

        <div className='md:flex md:flex-row md:gap-4 w-full'>
          <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
            <label htmlFor="donde_ocurrio" className='text-sm'>
              <strong>En donde sucedieron los hechos?*</strong>
            </label>
            <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3'>
              <input className="bg-transparent w-full" type="text" name="donde_ocurrio"  value={denuncia.donde_ocurrio} onChange={handleChange} disabled={editable}/>
            </div>
          </section> 
        </div>

    

        <div className='md:flex md:flex-row md:gap-5'>
          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="id_secretaria" className="text-sm">
              <strong>Secretaría en donde ocurrieron los hechos</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center p-1 pr-3">
              <select className="bg-transparent w-full m-1" name="id_secretaria" onChange={changeDerpartamento} value={denuncia.id_secretaria} disabled={editable}>          
                {secretarias.map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.nombre  }
                  </option>
                ))}            
              </select>
            </div>   
          </section>
          </div>
          
        <div className='md:flex md:flex-row md:gap-4 w-full'>
          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="id_departamento" className="text-sm">
              <strong>Área en donde ocurrieron los hechos</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center p-1 pr-3">
              <select className="bg-transparent w-full m-1" name="id_departamento" onChange={handleChange} value={denuncia.id_departamento} disabled={editable}>
                {departamentos.length>0?departamentos.map((value) => (
                  <option value={value.id} key={value.id}>
                    {value.nombre  }
                  </option>
                )):<option value={1} key={1}> Sin especificar </option>}
               </select>
            </div>   
          </section>   

        </div> 
    </div>
  )
}