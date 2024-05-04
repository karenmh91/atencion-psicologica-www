'use client'

import { Denuncia, IDocumento, IPropsFormDenuncia  } from "@/models/interfaces";
  
import { useEffect, useState } from "react"; 
import useStore from '@/store/store';
import { BiArrowToBottom, BiTrash} from 'react-icons/bi'
import { Toaster, toast } from 'sonner'; 
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material' 
import { addTestigo,  } from "@/services/complaint.service";
import storeDenuncia from "@/store/store";
import { getAllDocuments,downloadDocument, deleteDocument ,setFiles} from "@/services/documents.service";

let nextId = 0;
export default function AddDocuments({
  handleChange,
  denuncia
}: IPropsFormDenuncia) {
     
  let editable=false;
  const store = useStore((state: any) => state)
  const MaterialTable = require("material-table").default;
  const defaultMaterialTheme = createTheme();
  const [selectedRow, setSelectedRow] = useState(null); 
  const [tableLayout] = useState("auto");  
  const [open, setOpen] = useState(false) 
  const [index, setIndex] = useState(0)
  const [name_document, setname_document] = useState("")
  const [description_document , setdescription_document] = useState("")
  const [array,setArray] = useState((state: any) => state)
  const [file, setFile]=useState((state: any) => state);  
  const [form, setForm] = useState(store.denuncia as Denuncia);
  const [attachments, setAttachments] = useState<IDocumento[]>([]);
  const updateStore = storeDenuncia((state: any) => state.setDenunciaStore)


  useEffect(() => {   
    if(denuncia.id ==0){ 
      setArray(denuncia.adjuntos)
    }   
  }, []);

 async function onSubmit  (event)  {   
    event.preventDefault(); 
    if(name_document === "" || description_document === "" || file === null){
      toast.error('Por favor, complete todos los campos obligatorios.')
    }else{

      if(denuncia.id==0){
        //Se setea el nuevo index
        let newIndex=index+1;
        setIndex(newIndex); 
        
        //Creacion del nuevo array de servidores publicos
        let newAttachment={
            index: newIndex,
            nombre_archivo: file.name,
            nombre: name_document,
            descripcion:description_document,
            tipo: file.type,
            file:file,
            activo: true
        } 
        
        let aux = [...attachments, newAttachment] 
        setAttachments(aux)

        updateStore({
          ...denuncia,
          ['adjuntos']:aux
        })

        setname_document('')
        setdescription_document('')
      }else{ 
        if(file){   
          const formData= new FormData(); 
          formData.append("file",file);  
          formData.append("nombre",name_document);  
          formData.append("descripcion",description_document);  
          formData.append("index","1");  
          formData.append("id_denuncia",denuncia.id+''); 
     
           await setFiles(formData)
          .then(response => {   
                toast("Archivo guardado correctamente");
                getDocuments();
                setname_document("");
                setdescription_document("");
                setFile(null);  
    
          })
          .catch(error=> console.log(error))
        }else{
            toast("Favor de adjuntar archivo")
        }
         
      } 
    } 
  }

  async function getDocuments() {
    await getAllDocuments(denuncia.id)
    .then(response => {  
      updateStore({
        ...denuncia,
        adjuntos: response.data.response,
      });
     })
    .catch(error=> console.log(error))  
  } 
  
  const handleFile=(event)=>{
    let name= event.target.name; 
    let file = event.target.files?event.target.files[0]:null;
    setFile(file);

  } 

  const handleRemoveField = (index) => { 
    const newFields = [...array]; 
    let arrayUpdated=newFields.filter(servidor=>servidor.index !==index); 
    setArray(arrayUpdated);
  };

  const handleChangeName=(event)=>{
    let name= event.target.name; 
    let value= event.target.value; 
    
    if(name=="name"){
      setname_document(value)
    }

    if(name=="description"){ 
      setdescription_document(value) 
    }
 
  }

  const columnsTable=[
    {title:'Nombre archivo', field:'nombre_archivo'},  
    {title:'Nombre asignado', field:'nombre'}, 
    {title:'Descripción', field:'descripcion'},
    {title:'Tipo de archivo', field:'tipo'}
  ]

  return (
  
    <div>        

        <div className="py-3"><strong>Ingresa los elementos con los que cuentes: </strong></div>
        <div className="py-5">Favor de subir todos los archivos que posea, pueden ser de tipo video, audio e immágenes siempre y cuando no superen los 25 MB por todos los archivos que suba.  </div>
        <div>
          <form>   
            <div className='md:flex md:flex-row md:gap-4 rounded-md border-2 '>   
              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
                <label htmlFor="name" className='text-sm'>
                  <strong>Nombre del documento</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center'>
                  <input type="text" name="name" onChange={handleChangeName} value={name_document} className='bg-transparent w-full' />
                </div>

              </section>  

              <section className='flex flex-col gap-2 my-3 mx-5 lg:w-full '>
                <label htmlFor="description" className='text-sm'>
                  <strong>Descripción del documento</strong>
                </label>
                <div className='bg-stone-100 rounded-md flex items-center'>
                  <input type="text" name="description" onChange={handleChangeName} value={description_document} className='bg-transparent w-full' />
                </div>

              </section> 

              <section className='flex flex-col gap-2 mx-3 mt-8 w-2/3 cursor-pointer'>
                <div>
                  <input type="file" name="file_document" 
                  className='block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-50 file:text-gray-700
                  hover:file:bg-gray-100 cursor-pointer'
                  multiple onChange={handleFile}  disabled={editable}/>
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
          </form>

          <div>        
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          </div>
          
          <div className="py-5" style={{ maxWidth: "100%",margin: "0px auto" ,overflowX: "auto",overflowY: "auto" }}>
          <ThemeProvider theme={defaultMaterialTheme}>
              <CssBaseline /> 
              <Box m={1}>
              <MaterialTable   
                  onRowClick={(evt, selectedRow) =>
                  setSelectedRow(selectedRow.tableData.id)
                  }
                  title=""
                  data={storeDenuncia((state: any) => state.denuncia.adjuntos).filter(attachment => attachment.activo)}
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
                                //handleRemoveField(rowData.index)  
                                if(denuncia.id>0){
                                  deleteDocument(rowData.id) 
                                  .then(response =>{    
                                      toast.message("Documento eliminado correctamente")
                                      getDocuments()
                                  }).catch(err=>{
                                  }) 
                                }
                              } 
                          }), 
                      rowData => 
                          ({
                              icon: () => <BiArrowToBottom/>, iconProps: { style: { fontSize: "60px"  } },
                              tooltip: 'Descargar', 
                              onClick: (event, rowData)=>{  
                                downloadDocument(rowData.id)
                                  .then((res:any) =>{ 
                                          let nameDocument=rowData.nombre_archivo;
                                          const array = nameDocument.split('.');
                                          let extension = "";
                                          let name="";
                                          
                                          if(array.length >0){
                                              extension=rowData.tipo;
                                              name=array[0];
                                          } 

                                          const url = window.URL.createObjectURL(res.data);
                                          const link = document.createElement('a');
                                          link.href=url; 
                                         
                                          link.setAttribute( 'download',name+'.'+extension);
                                          link.click(); 
                                          window.URL.revokeObjectURL(url)
                                          link.remove(); 
                                      } 
                                  ) 
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


   