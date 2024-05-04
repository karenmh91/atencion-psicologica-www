import { IDialogForm } from "@/models/interfaces";
import storeDenuncia from "@/store/store";
import { Dialog } from '@headlessui/react'

export const DialogForm = ({ open, title, data, close, action }: IDialogForm) => {
  
  const updateDepartamentos = storeDenuncia((state:any) => state.departamentos)
  const secretariaSelected = storeDenuncia((state:any) => state.secretaria)
  
  const handleFilterDepartamento = (id) => {
    let dept;
    dept = updateDepartamentos?.find(d => d.id === parseInt(id))
    return dept?.nombre
  }

    return (
    <Dialog
      open={open} 
      onClose={() => {}}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4 flex flex-col gap-3">
          <Dialog.Title>
            <h1>
              <strong>{title}</strong>
            </h1>
          </Dialog.Title>
          <Dialog.Description className='flex flex-col gap-3'>
            ¿Desea enviar la denuncia?
              
          </Dialog.Description>
          <section className="w-full flex justify-center gap-3 my-3">
            <button className="shadow-md rounded-3xl border border-black bg-white flex  items-center p-2 px-7"  onClick={close}>No</button>
            <button className="shadow-md rounded-3xl bg-black text-white flex  items-center  p-2 px-7" onClick={action}>Si</button>
          </section>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
};
