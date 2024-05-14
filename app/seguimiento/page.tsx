"use client";

import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function PageSeguimiento({ searchParams }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const [data, setData] = useState<any[]>([]);
  const [denunciante, setDenunciante] = useState("");
  const [hora_denuncia, sethora_denuncia] = useState("");
  const [fecha_denuncia, setfecha_denuncia] = useState("");
  const [hasStatus, setHasStatus] = useState(false);

  const MaterialTable = require("material-table").default;
  const defaultMaterialTheme = createTheme();
  const columnsTable = [
    { title: "Estado", field: "estados.nombre" },
    { title: "Asignado a", field: "asignado_a" },
    { title: "Titulo", field: "titulo" },
    { title: "Descripción", field: "descripcion" },
  ];

  const handleClick = () => {};

  const handleSetData = () => {};

  const handleReturn = () => {
    setData([]);
    setInputValue("");
    router.push(`/seguimiento`);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="flex flex-col m-12">
      {data.length == 0 && (
        <div className="text-center font-semibold text-xl">
          Ingrese el número de folio de su denuncia{" "}
          <div className="flex items-center justify-center mt-2">
            <FormControl sx={{ m: 2 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Búsqueda por folio
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type="text"
                size="small"
                sx={{ borderRadius: "30px", padding: "1" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClick}
                      onMouseDown={handleMouseDown}
                      edge="end"
                    >
                      <IoSearch />
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={
                  <InputAdornment position="start">SDI-</InputAdornment>
                }
                label="Buscar"
                value={inputValue}
                onChange={handleChange}
              />
            </FormControl>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div>
          <button onClick={handleReturn} className="hover:underline">
            {"< "}Volver
          </button>
          <div className="text-center font-semibold text-xl mb-6">
            Visualización de seguimiento de denuncias
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex-col gap-2 mt-3 mb-3 w-full md:flex md:flex-row md:gap-4">
          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="fecha" className="text-sm">
              <strong>Fecha de los hechos</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center pr-3">
              <input
                type="text"
                name="fecha"
                value={fecha_denuncia}
                className="bg-transparent w-full"
                placeholder="01/01/2023"
                disabled={true}
              />
            </div>
          </section>

          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="date" className="text-sm">
              <strong>Hora de los hechos</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center p-1 pr-3">
              <input
                type="text"
                name="hora"
                value={hora_denuncia}
                className="bg-transparent w-full"
                placeholder="00:00"
                disabled={true}
              />
            </div>
          </section>

          <section className="flex flex-col gap-2 mt-3 mb-3 w-full">
            <label htmlFor="name" className="text-sm">
              <strong>Nombre del denunciante</strong>
            </label>
            <div className="bg-stone-100 rounded-md flex items-center p-1 pr-3">
              <input
                type="text"
                name="name"
                value={denunciante}
                className="bg-transparent w-full"
                disabled={true}
              />
            </div>
          </section>
        </div>
      )}
      {data.length > 0 && hasStatus && (
        <div className="mt-6">
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              title="Estatus"
              data={data}
              columns={columnsTable}
              localization={{
                body: {
                  emptyDataSourceMessage: "No hay registros para mostrar",
                },
              }}
              options={{
                search: false,
                paging: false,
                filtering: false,
                rowStyle: {
                  height: "20px",
                },
              }}
            />
          </ThemeProvider>
        </div>
      )}
      {data.length > 0 && !hasStatus && (
        <div className="text-center font-semibold text-xl  my-20">
          Denuncia en proceso ...
        </div>
      )}
    </section>
  );
}
