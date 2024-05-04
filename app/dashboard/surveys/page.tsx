'use client'

import { User } from '@/models/interfaces';
import { getAllSurveys} from '@/services/survey.service';
import storeUser from '@/store/storeUser'; 
import { useEffect, useState } from 'react'; 
import { Toaster, toast } from 'sonner';
import { ThemeProvider, createTheme } from '@mui/material'

export default function Page() { 
  const [data, setData] = useState<User[]>([]) 
  const MaterialTable = require("material-table").default;
  const defaultMaterialTheme = createTheme();

  const store = storeUser((state: any) => state)
  useEffect(() => {
    async function getData() {
      const response = await getAllSurveys(); 
      setData(response)
    }

    getData()
  }, []) 

  const columnsTable=[
    {title:'Identificador', field:'id'},
    {title:'Nombre', field:'name'},
    {title:'¿Desea iniciar encuesta?', field:'start_survey'}, 
    {title:'Tiempo de trámite', field:'attention_time'} ,
    {title:'Calificación de atención', field:'attention_rating'} ,
    {title:'Datos anónimos', field:'anonymous_data'} ,
    {title:'Comentarios', field:'comments'} ,
    {title:'Año', field:'year'} ,
  ]

  return (
    <div className="bg-white rounded-lg m-4 flex flex-col gap-4 w-full">
    <Toaster position="top-center"  richColors closeButton />
    <div className="text-center font-semibold text-xl">Visualización de respuestas de encuestras de satisfacción</div>
 
       <div>
       <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
          title=""
          data={data}
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
          options={{
              search:true,
              paging:true,
              filtering:false,
              actionsColumnIndex:-1,addRowPosition:"fist",
              pageSizeOptions:[5],
              pageSize:5,  
              rowStyle: {
                height: "20px"
              }
          }}

          />
         </ThemeProvider> 
       </div> 
    </div>
  )
}