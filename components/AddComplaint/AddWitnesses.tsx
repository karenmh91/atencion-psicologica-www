'use client'

import { Denuncia, IPropsFormDenuncia, IServidorPublico  } from "@/models/interfaces";
  
import { useEffect, useState } from "react"; 
import { BiTrash} from 'react-icons/bi'
import { Toaster, toast } from 'sonner'; 
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material' 
import { addTestigo, deleteComplaintTestigo, getAllTestigos } from "@/services/complaint.service";
import storeDenuncia from "@/store/store";

let nextId = 0;
export default function AddWitnesses({
  handleChange,
  denuncia 
}: IPropsFormDenuncia) {

  const MaterialTable = require("material-table").default;
  const defaultMaterialTheme = createTheme();
  const [selectedRow, setSelectedRow] = useState(null); 
  const [tableLayout] = useState("auto");  
  const [index, setIndex] = useState(0)
  const [nombre, setnombre] = useState("")
  const [descripcion, setdescripcion] = useState("")
  const [array,setArray] = useState<IServidorPublico[]>([])
  const updateStore = storeDenuncia((state: any) => state.setDenunciaStore)
  const updateDataTable = storeDenuncia((state: any) => state.denuncia.testigos)

  useEffect(() => {
    if(denuncia.testigos)
      setArray([...denuncia.testigos])
  }, [])

  useEffect(() => {    
    if(denuncia.id != 0){
      getAllTestigosFunction(denuncia.id);
    } 
  }, [denuncia.id]); 

  async function onSubmit  (event)  {   
    event.preventDefault();
    if(nombre === "" || descripcion === ""){
      toast.error('Por favor, complete todos los campos obligatorios.')
    }else{
      if(denuncia.id==0){
        //Se setea el nuevo index
        let newIndex=index+1;
        setIndex(newIndex);
  
        //Creacion del nuevo objeto de servidores publicos
        let newObject: IServidorPublico={
          index: newIndex,
          nombre:nombre,
          descripcion:descripcion
        }
        
        let aux = [...array, newObject]
  
        setArray(aux)
  
        updateStore({
          ...denuncia,
          ['testigos']:aux
        })
    
    }else{
      let newATestigo={
        index: 5,
        nombre:nombre,
        descripcion:descripcion,
        id_denuncia:denuncia.id
      } 
      await addTestigo(newATestigo)
        .then(response => {  
          console.log(response)
          if(response.status==200){
              toast(response.message);
              getAllTestigosFunction(denuncia.id);
          }
  
        })
        .catch(error=> console.log(error))
    }
  }

    setnombre("")
    setdescripcion("")
  } 

  async function getAllTestigosFunction(id:number) {
    await getAllTestigos(id)
    .then(response => {  
      updateStore({
        ...denuncia,
        testigos: response.response,
      });
     })
    .catch(error=> console.log(error))  
  } 

  const handleRemoveField = (index) => { 
    const updatedArray = array.filter(
      (servidor) => servidor.index !== index
    );
 
    setArray(updatedArray)
    
    updateStore({
      ...denuncia,
      testigos: updatedArray,
    });
  };

  const handleChangeServidoresPublicos=(event)=>{
    let name= event.target.name; 
    let value= event.target.value; 
    
    if(name=="nombre"){
      setnombre(value)
    }

    if(name=="descripcion"){ 
      setdescripcion(value)
    }
  }

  async function removeTestigo(row:any) {
    
    await deleteComplaintTestigo(row.id)
    .then(response =>{   
        toast.success("Testigo eliminado correctamente"); 
      }).catch(err=>{ 
          toast.error("Error al eliminar Testigo"); 
      })   
  }

  const columnsTable=[
    {title:'Nombre', field:'nombre'},  
    {title:'Descripción', field:'descripcion'}
  ]

  return (
  
    <div>        
        <div> 
          <div className="md:flex md:flex-row md:gap-4 rounded-md border-2 py-4 px-2 mb-4">
            <label className="relative inline-flex items-center cursor-pointer my-4">
                <input type="checkbox" name="tiene_testigos" value={denuncia.tiene_testigos} onChange={handleChange} className="sr-only peer"   />
                <div
                  className={`w-11 h-6
                  rounded-full 
                    ${!!denuncia.tiene_testigos ? "bg-black" : "bg-gray-200"} 
                    ${!!denuncia.tiene_testigos ? "after:translate-x-full" : "after:translate-x-0"}
                    peer-checked:after:border-white
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:content-[''] after:absolute after:top-[14px] sm:after:top-[2px] after:left-[2px] 
                    after:h-5 after:w-5 after:transition-all
                  `}
                >
                </div>
                <span className="ml-3 font-medium text-gray-900"><strong>¿Alguien presenció los hechos?</strong></span>
              </label>
          </div>
 
            {
              !!denuncia.tiene_testigos &&
              <div className='md:flex md:flex-row md:gap-4 rounded-md border-2 '>   
              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
                <label htmlFor="name" className='text-sm'>
                  <strong>Nombre del testigo</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center'>
                  <input type="text" name="nombre" value={nombre} onChange={handleChangeServidoresPublicos}   className='bg-transparent w-full' />
                </div>

              </section> 
 
              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
              <label htmlFor="name" className='text-sm'>
                  <strong>Descripción física</strong>
                </label>
              <div className='bg-stone-100 rounded-md flex items-center'>
                  <input type="text" name="descripcion" value={descripcion} onChange={handleChangeServidoresPublicos}  className='bg-transparent w-full' />
              </div>
              </section>

              <section className='flex flex-col my-8 mx-12 mb-3   justify-center items-center'>  
                <button
                  className='shadow-md rounded-3xl bg-black text-white p-3  text-center  w-full ' 
                  onClick={onSubmit} > 
                <p className="text-center text-white">AGREGAR</p>
                </button>
              </section>
              </div> 
            } 

          <div>        
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          </div>
          
          {
          !!denuncia.tiene_testigos &&
            <div className="mb-20" style={{ maxWidth: "100%",margin: "0px auto" ,overflowX: "auto",overflowY: "auto" }}>
              <ThemeProvider theme={defaultMaterialTheme}>
              <CssBaseline /> 
              <Box m={1}>
              <MaterialTable   
                  onRowClick={(evt, selectedRow) =>
                  setSelectedRow(selectedRow.tableData.id)
                  }
                  title=""
                  data={updateDataTable}
                  columns={columnsTable}
                  localization={{
                  pagination: {
                      labelDisplayedRows: '{from}-{to} de {count}',
                      labelRowsPerPage:'Registros por página',
                      labelRowsSelect:'Registros'
                  }, 
                  header: {
                      actions: 'Acciones'
                  },
                  body: {
                      emptyDataSourceMessage: 'No hay registros para mostrar',
                      filterRow: {
                          filterTooltip: 'Filtrar'
                      }
                  }
                  }}
                  actions={[ 
                      rowData =>  ( {
                              icon: () => <BiTrash/>,
                              tooltip:'Eliminar', 
                              onClick: (event, rowData)=>{    
                                if(denuncia.id>0){
                                  removeTestigo(rowData)
                                }else{
                                  handleRemoveField(rowData.index) 
                                } 
                              } 
                          }), 
                  ]}
                  options={{
                      search:true,
                      paging:true,
                      filtering:false,
                      actionsColumnIndex:-1, 
                      pageSizeOptions:[5],
                      pageSize:5,
                      tableLayout: tableLayout,
                      padding: "dense",
                      rowStyle: rowData => ({ 
                      backgroundColor:
                          selectedRow === rowData.tableData.id ? "#EEE" : "#FFF"
                      }), 
                  }}

              />
              </Box>
              </ThemeProvider> 
            </div>
          }
        </div>
    </div>
  )
}