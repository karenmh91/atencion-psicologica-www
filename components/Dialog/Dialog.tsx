import { IDialog } from "@/models/interfaces";
import { Dialog } from '@headlessui/react'

export const ConfirmDialog = ({ open, title, message, close, action }: IDialog) => {
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
          <Dialog.Description> 
              {message} 
          </Dialog.Description>
          <section className="w-full flex justify-center gap-3 my-3">
            <button className="shadow-md rounded-3xl border border-black bg-white flex  items-center p-2 px-7"  onClick={close}>Cancelar</button>
            <button className="shadow-md rounded-3xl bg-black text-white flex  items-center  p-2 px-7" onClick={action}>Confirmar</button>
          </section>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
};
