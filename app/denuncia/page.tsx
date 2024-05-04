'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { Denuncia } from '@/models/interfaces';
import { setComplaint, editComplaint, sendEmail } from '@/services/complaint.service';
import { useRouter } from 'next/navigation';
import storeDenuncia from '@/store/store';
import { Toaster, toast } from 'sonner'; 
import AddKeyData from '@/components/AddComplaint/AddKeyData';
import AddReported from '@/components/AddComplaint/AddReported';
import AddWitnesses from '@/components/AddComplaint/AddWitnesses';
import AddDocuments from '@/components/AddComplaint/AddDocuments';
import AddDetails from '@/components/AddComplaint/AddDetails';
 
import { setFiles } from '@/services/documents.service';
import { DialogForm } from '@/components/DialogForm';


import ReCAPTCHA from "react-google-recaptcha";

export default function Page() {

  const router = useRouter();
  const store = storeDenuncia((state: any) => state.denuncia)
  const updateStore = storeDenuncia((state: any) => state.setDenunciaStore)
  const cleanStore = storeDenuncia((state: any) => state.removeDenunciaStore)

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(store as Denuncia);
  const [title, setTitle] = useState("");
  const [emailError, setEmailError] = useState(false) 
  const [open, setOpen] = useState(false)
  const [finish, setFinish] = useState(false)
  const [id_denuncia, setid_denuncia] = useState(0);
  const [passCaptcha, setPassCaptcha] = useState(false)
  const [isChecked, setIsChecked] = useState(false);

  const captcha = useRef(null)

  const steps = [
    { title: 'Proporciona los datos del lugar de los hechos' },
    { title: 'Describe brevemente lo sucedido' },
    { title: 'Testigos (opcional)' }, 
    { title: 'Adjunta evidencia (opcional)' },
    { title: 'Envía tu denuncia (puede ser anónima)' }, 
  ];
  
  useEffect(() => {
      form.id ==0 ?setTitle("Nueva denuncia"):setTitle("Editar registro de denuncia"); 
      setForm(store);
  
      if (typeof window !== 'undefined') {
        // Check if the window object is available (prevents server-side rendering issues)
        const storedData = localStorage.getItem('tipo'); 
        
        if (storedData !== null) {
          // Check if storedData is not null or undefined
          const parsedData = parseInt(storedData, 10); // Parse the string to an integer
      
          if (!isNaN(parsedData)) {
            // Check if the parsedData is a valid number
            
            if (parsedData === 2) { 
              updateStore({
                ...form,
                ['creado_por_honor_justicia']: false,
              });
            } else {
              updateStore({
                ...form,
                ['creado_por_honor_justicia']: false,
              });
            }
          } else {
            // Handle the case where parsing fails
            console.error('Error parsing storedData to an integer.');
          }
        }
      }
    }, [])
  

  // Utiliza useEffect para suscribirte a cambios en store y actualizar setForm
  useEffect(() => {
    setForm(store); 
 
  }, [store]);

  const [titleFontSize, setTitleFontSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth <= 767 ? 10 : 16;
      setTitleFontSize(newSize);
    };

    // Agregar un listener para el evento de cambio de tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    // Llamar a handleResize al cargar el componente para establecer el tamaño inicial
    handleResize();

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => { 
    const name = e.target.name
    let value: any = e.target.value? e.target.value:"";

    if (name === 'anonimo') {
      value = Number(value) === 1 ? 0 : 1
    }
    if (name === 'tiene_testigos') {
      value = Number(value) === 1 ? 0 : 1
    }
    
    if (name === 'celular') {
      // Validar que el valor no contenga la letra 'e'
      if (value.includes('e')) {
        let aux = value
        // Si contiene 'e', eliminar la 'e'
        value = aux.replace(/e/g, '');
      }
    
      // Validar que el valor tenga solo 10 dígitos
      const soloDigitos = value.replace(/\D/g, ''); // Elimina todo excepto los dígitos
      value = soloDigitos.substring(0, 10); // Tomar solo los primeros 10 dígitos
    }
    

      // Validar el formato del correo electrónico
    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(value)) {
        // El correo electrónico no cumple con el formato deseado
        setEmailError(true)
      }else{
        setEmailError(false)
      }
    }
    
    setForm(prev => ({
      ...prev,
      [name]:value
    }))

    updateStore({
      ...form,
      [name]:value
    })
 
  }

  function getSectionComponent() {
    switch (activeStep) {
      case 0: return <AddKeyData handleChange={handleChange} denuncia={form} setForm={setForm}/>
      case 1: return <AddReported handleChange={handleChange} denuncia={form} setForm={setForm} />
      case 2: return <AddWitnesses handleChange={handleChange} denuncia={form} setForm={setForm} />
      case 3: return <AddDocuments handleChange={handleChange} denuncia={form} setForm={setForm} />  
      case 4: return <AddDetails handleChange={handleChange} denuncia={form} setForm={setForm} error={emailError} /> 

      default: return 0;
    }
  }

  async function onSubmbit() {   
  
     
      const { fecha, hora, donde_ocurrio, descripcion } = store;
      if (!fecha || !hora || !donde_ocurrio || !descripcion) {
        toast.error('Favor de colocar los datos obligatorios');
        return;
      }
      const servidores = store.servidores_publicos_denuncias;
      if (!servidores || servidores.length === 0) {
        toast.error('Favor de agregar al menos un servidor público a denunciar');
        return;
      }
      
      if(form.anonimo === 0 && form.email === ""){
        toast.error('Favor de colocar un email para completar la denuncia.')
      }else if(form.anonimo === 0 && emailError === true){
        toast.error('Correo electrónico no válido');
      }else{ 
        //Set new denuncia
        await setComplaint(form)
        .then(response =>{     
                  
          let id_denuncia=response.id;
          setid_denuncia(id_denuncia)
          Object.keys(form).forEach((key) => {
            if (key === 'adjuntos') { 
              const formData = new FormData();
              // Handle the 'adjuntos' array separately
              form.adjuntos.forEach((adjunto: any, index: number) => {
                // Assuming each 'adjunto' has a 'file' property
                formData.append(`file`, adjunto.file);
                formData.append(`descripcion`, adjunto.descripcion);
                formData.append(`nombre`, adjunto.nombre);
                formData.append(`id_denuncia`, id_denuncia);
                formData.append(`index`, "1");
              });
              uploadDocument(formData);
            } 
          }); 
          let email=form.email;

          sendEmailDenuncia(id_denuncia,email) 

          setFinish(true)

          cleanStore()
        }).catch(err=>{ 
            toast.error("Error al guardar denuncia"); 
        }) 
    }

  }

  async function sendEmailDenuncia(id:any, email:any) { 
    await  sendEmail(id,email).then(response =>{   })
  }

  async function uploadDocument(formData:any){
 
    await setFiles(formData)
    .then(response => {   
          toast("Archivo guardado correctamente"); 

    })
    .catch(error=> console.log(error))
  }

  const handleNextStep = () => { 
    if (activeStep === 0) {
      // Verifica los campos en el step 0
      const { fecha, hora, donde_ocurrio, descripcion } = store;
      if (!fecha || !hora || !donde_ocurrio ) {
        toast.error('Favor de colocar los datos obligatorios');
        return;
      }
    } else if (activeStep === 1) {
      // Verifica los campos en el step 1
      const servidores = store.servidores_publicos_denuncias;
      if (!servidores || servidores.length === 0) {
        toast.error('Favor de agregar al menos un servidor público a denunciar');
        return;
      }
    }
  
    // Si pasa las validaciones, pasa al siguiente step
    setActiveStep(activeStep + 1);
  };
  
  const onChange = (value) => {
   // if(captcha.current.getValue())
     setPassCaptcha(true)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Cambia el estado al valor opuesto
  };

  const formatNumber = (number, length) => {
    return String(number).padStart(length, '0');
  };

  const handleLastStep = () => {
    if(isChecked){
      setOpen(true)
    }else{
      toast.error('Favor de aceptar los términos y condiciones');
      setOpen(false)
    }

  }

  const handleDisplayForm = () => {
    if(finish){
      return <div className='w-full flex flex-col items-center mt-4'>
        <div className='w-1/2 flex flex-col items-center text-center'>
        <h1 className='font-bold text-xl my-6'>Gracias por enviar tu denuncia</h1>
        <p className='leading-6'>Recuerda que puedes dar seguimiento del caso con el folio que te mostramos a continuación, mismo que fue enviado a tu correo de contacto.</p>
        <button onClick={() => router.push(`/seguimiento?id=${id_denuncia}`)} className='shadow-md rounded-3xl bg-black text-white p-3 flex items-center justify-center md:m-10 mt-5  px-12 w-full md:w-1/2'>
          Folio de seguimiento: #SDI-{formatNumber(id_denuncia, 6)}
        </button>
         <div className='my-8'>Para dudas o comentarios comunicate con la Lic. xxx, Coordinadora de xxx n Tel. xxx Correo: <p className='text-[#37BCF8]'>xxx@sanpedro.gob.mx</p></div>
        </div>
      </div>
    } else{
      return <div className='mb-28 px-4 sm:px-44'>
      <Toaster position="top-center"  richColors closeButton />
      <div className=" ">
        <h1 className='text-xl pt-7'>
          <strong>
           {title}
          </strong>
        </h1>
      </div>

      <div>
        <div className=' flex w-full justify-start'>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            activeColor='black'
            defaultColor='#9CA3AF'
            completeColor='#9CA3AF'
            titleFontSize={titleFontSize}
          /> 
        </div>
      </div>
      <div className="mx-10 lg:mx-38">   
        <div className='mt-6'>
          {getSectionComponent()}
          <div>
            {
              activeStep === steps.length -1 &&
              <label>
                <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange} 
                className='ml-24 mb-10'
                />
                &nbsp;&nbsp;Declaro bajo protesta de decir verdad, que he leído y acepto los Términos y Condiciones y el Aviso de Privacidad de Municipio de San Pedro Garza García.
              </label>
            }
            {
              activeStep === steps.length -1 && !passCaptcha &&
              <ReCAPTCHA
                 ref={captcha}
                 sitekey="6LefMhgpAAAAAGhafQqB6ircUYgMXw_TorkJzi-V"
                 onChange={onChange}
               />
            }
          </div>
          <div className='md:flex md:flex-row justify-center '> 
            {(activeStep !== 0)
              &&
              <button
                onClick={() => setActiveStep(activeStep - 1)}
                className='shadow-md rounded-3xl border border-black bg-white p-3 flex items-center justify-center md:m-10 mt-5 px-12 w-full md:w-2/6'
              >
                <BiChevronLeft />
                ANTERIOR
              </button>
            }
            {activeStep !== steps.length - 1
              ?
              <button
                onClick={() => handleNextStep()}
                className='shadow-md rounded-3xl bg-black text-white p-3 flex items-center justify-center md:m-10 mt-5  px-10 md:w-2/6' 
              >
                SIGUIENTE
                <BiChevronRight />
              </button> :
                <button
                  className={`${!passCaptcha ? 'bg-gray-300' : 'bg-black'} shadow-md rounded-3xl text-white p-3 flex items-center justify-center  md:m-10 mt-5 px-10 md:w-2/6`}
                  onClick={()=> handleLastStep()}
                  disabled={!passCaptcha}
                >
                  ENVIAR
                </button> 
            }
          </div>
        </div>
      </div>
      <DialogForm 
        title="Confirmar acción" 
        data={form}
        open={open} 
        close={() => setOpen(false)}
        action={onSubmbit}
      />
    </div>
    }
  }

  return (
    handleDisplayForm()
  )
}
