'use client'

import { IPropsFormDenuncia, IServidorPublico  } from "@/models/interfaces";
  
import { useEffect, useState } from "react"; 
import { BiTrash} from 'react-icons/bi'
import { Toaster, toast } from 'sonner'; 
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material' 
import { addFuncionario, deleteComplaintFuncionario, getAllFuncionarios } from "@/services/complaint.service";
import storeDenuncia from "@/store/store";

export default function AddReported({
  handleChange,
  denuncia 
}: IPropsFormDenuncia) {
  
  const MaterialTable = require("material-table").default;
  const defaultMaterialTheme = createTheme();
  const [selectedRow, setSelectedRow] = useState(null); 
  const [tableLayout] = useState('auto');
  const [index, setIndex] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [array, setArray] = useState<IServidorPublico[]>([])
  const updateStore = storeDenuncia((state: any) => state.setDenunciaStore)

  useEffect(() => {
    if(denuncia.servidores_publicos_denuncias)
      setArray([...denuncia.servidores_publicos_denuncias])
  }, [])

  useEffect(() => {   
    if(denuncia.id !== 0){   
      getAllFuncionariosFunction(denuncia.id);
    } 
  }, [denuncia.id]); 

 async function onSubmit  (event)  {   
    event.preventDefault();
    if(nombre === "" || descripcion === ""){
      toast.error('Por favor, complete todos los campos obligatorios.')
    }
    else{
      if(denuncia.id==0){
        //Se setea el nuevo index
        let newIndex=index+1;
        setIndex(newIndex);
    
        // Creación del nuevo array de servidores públicos
         const newObject: IServidorPublico = {
          index: newIndex,
          nombre: nombre,
          descripcion: descripcion,
        };
    
        let aux = [...array, newObject]
    
        setArray(aux)
    
        updateStore({
          ...denuncia,
          ['servidores_publicos_denuncias']:aux
        })
     
      }else{
          let newATestigo={
            index: 5,
            nombre:nombre,
            descripcion:descripcion,
            id_denuncia:denuncia.id
          } 
          await addFuncionario(newATestigo)
            .then(response => {   
              if(response.status==200){
                  toast(response.message);
                  getAllFuncionariosFunction(denuncia.id);
              }
      
            })
            .catch(error=> console.log(error))
        }
    }

    setNombre("")
    setDescripcion("")
  } 
  
  async function getAllFuncionariosFunction(id:number) {
    try {
      const response = await getAllFuncionarios(id); 
      updateStore({
        ...denuncia,
        servidores_publicos_denuncias: response.response,
      }); 
    } catch (error) {
      console.log(error);
    }  
  } 

  const handleRemoveField = (index) => { 
    const updatedArray = array.filter(
      (servidor) => servidor.index !== index
    );
 
    setArray(updatedArray)
    
    updateStore({
      ...denuncia,
      servidores_publicos_denuncias: updatedArray,
    });
  };

  async function removeDenunciado(row:any) {
    
    await deleteComplaintFuncionario(row.id)
    .then(response =>{   
        toast.success("Funcionario eliminado correctamente"); 
      }).catch(err=>{ 
          toast.error("Error al eliminar funcionario"); 
      })   
  }

  const handleChangeServidoresPublicos=(event)=>{
    let name= event.target.name; 
    let value= event.target.value; 
    
    if(name === "nombre"){
      setNombre(value)
    }

    if(name === "descripcion"){ 
      setDescripcion(value)
    }
  }

  const columnsTable=[
    {title:'Nombre', field:'nombre'},  
    {title:'Descripción', field:'descripcion'}
  ]

  return (
  
    <div>
        <div className='md:flex md:flex-row md:gap-5'> 
          <section className='flex flex-col gap-2 mt-3 mb-3 w-full'>
              <label htmlFor="descripcion" className='text-sm'>
                <strong>Narra como sucedieron los hechos:* </strong>
              </label>
              <div className='bg-stone-100 rounded-md flex items-center p-1 pr-3 w-full '>
                <textarea  name="descripcion"  className='bg-transparent w-full mb-10'rows={5} value={denuncia.descripcion}  onChange={handleChange}></textarea>    
              </div>
              <div>  Número máximo de caracteres 10,0000      </div>
          </section> 
        </div>
  
       
        <div> 
           <div className="py-10"><strong>Agrega a la (s) persona(s) que deseas denunciar: </strong></div>
            <div className='md:flex md:flex-row md:gap-4 rounded-md border-2 '>   
              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
                <label htmlFor="name" className='text-sm'>
                  <strong>Nombre o cargo del servidor público*</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center'>
                  <input type="text" name="nombre" value={nombre} onChange={handleChangeServidoresPublicos}   className='bg-transparent w-full' />
                </div>

              </section> 
 
              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
              <label htmlFor="name" className='text-sm'>
                  <strong>Descripción física*</strong>
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

          <div>        
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          </div>
          
          <div className="py-10" style={{ maxWidth: "100%",margin: "0px auto" ,overflowX: "auto",overflowY: "auto" }}>
          <ThemeProvider theme={defaultMaterialTheme}>
              <CssBaseline /> 
              <Box m={1}>
              <MaterialTable   
                  onRowClick={(evt, selectedRow) =>
                  setSelectedRow(selectedRow.tableData.id)
                  }
                  title=""
                  data={storeDenuncia((state: any) => state.denuncia.servidores_publicos_denuncias)}
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
                                  removeDenunciado(rowData)
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
        </div>
    </div>
  )
}