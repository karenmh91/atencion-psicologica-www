'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Stepper from 'react-stepper-horizontal'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

import ReCAPTCHA from 'react-google-recaptcha'

export default function Page() {
    const router = useRouter()

    const [activeStep, setActiveStep] = useState(0)
    const [title, setTitle] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [open, setOpen] = useState(false)
    const [finish, setFinish] = useState(false)
    const [id_denuncia, setid_denuncia] = useState(0)
    const [passCaptcha, setPassCaptcha] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const captcha = useRef(null)

    const steps = [
        { title: 'Proporciona los datos del lugar de los hechos' },
        { title: 'Describe brevemente lo sucedido' },
        { title: 'Testigos (opcional)' },
        { title: 'Adjunta evidencia (opcional)' },
        { title: 'Envía tu denuncia (puede ser anónima)' },
    ]

    useEffect(() => {}, [])

    // Utiliza useEffect para suscribirte a cambios en store y actualizar setForm
    useEffect(() => {}, [])

    const [titleFontSize, setTitleFontSize] = useState(16)

    useEffect(() => {
        const handleResize = () => {
            const newSize = window.innerWidth <= 767 ? 10 : 16
            setTitleFontSize(newSize)
        }

        // Agregar un listener para el evento de cambio de tamaño de la pantalla
        window.addEventListener('resize', handleResize)

        // Llamar a handleResize al cargar el componente para establecer el tamaño inicial
        handleResize()

        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {}

    function getSectionComponent() {}

    async function onSubmbit() {}

    async function sendEmailDenuncia(id: any, email: any) {}

    async function uploadDocument(formData: any) {}

    const handleNextStep = () => {}

    const onChange = (value) => {
        // if(captcha.current.getValue())
        setPassCaptcha(true)
    }

    const handleCheckboxChange = () => {
        // Cambia el estado al valor opuesto
    }

    const formatNumber = (number, length) => {
        return String(number).padStart(length, '0')
    }

    const handleLastStep = () => {
        if (isChecked) {
            setOpen(true)
        } else {
            toast.error('Favor de aceptar los términos y condiciones')
            setOpen(false)
        }
    }

    const handleDisplayForm = () => {
        if (finish) {
            return (
                <div className="w-full flex flex-col items-center mt-4">
                    <div className="w-1/2 flex flex-col items-center text-center">
                        <h1 className="font-bold text-xl my-6">
                            Gracias por enviar tu denuncia
                        </h1>
                        <p className="leading-6">
                            Recuerda que puedes dar seguimiento del caso con el
                            folio que te mostramos a continuación, mismo que fue
                            enviado a tu correo de contacto.
                        </p>
                        <button
                            onClick={() =>
                                router.push(`/seguimiento?id=${id_denuncia}`)
                            }
                            className="shadow-md rounded-3xl bg-black text-white p-3 flex items-center justify-center md:m-10 mt-5  px-12 w-full md:w-1/2"
                        >
                            Folio de seguimiento: #SDI-
                            {formatNumber(id_denuncia, 6)}
                        </button>
                        <div className="my-8">
                            Para dudas o comentarios comunicate con la Lic. xxx,
                            Coordinadora de xxx n Tel. xxx Correo:{' '}
                            <p className="text-[#37BCF8]">
                                xxx@sanpedro.gob.mx
                            </p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mb-28 px-4 sm:px-44">
                    <Toaster position="top-center" richColors closeButton />
                    <div className=" ">
                        <h1 className="text-xl pt-7">
                            <strong>{title}</strong>
                        </h1>
                    </div>

                    <div>
                        <div className=" flex w-full justify-start">
                            <Stepper
                                steps={steps}
                                activeStep={activeStep}
                                activeColor="black"
                                defaultColor="#9CA3AF"
                                completeColor="#9CA3AF"
                                titleFontSize={titleFontSize}
                            />
                        </div>
                    </div>
                    <div className="mx-10 lg:mx-38">
                        <div className="mt-6">
                            <div>
                                {activeStep === steps.length - 1 && (
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                            className="ml-24 mb-10"
                                        />
                                        &nbsp;&nbsp;Declaro bajo protesta de
                                        decir verdad, que he leído y acepto los
                                        Términos y Condiciones y el Aviso de
                                        Privacidad de Municipio de San Pedro
                                        Garza García.
                                    </label>
                                )}
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LefMhgpAAAAAGhafQqB6ircUYgMXw_TorkJzi-V"
                                    onChange={onChange}
                                />
                            </div>
                            <div className="md:flex md:flex-row justify-center ">
                                {activeStep !== 0 && (
                                    <button
                                        onClick={() =>
                                            setActiveStep(activeStep - 1)
                                        }
                                        className="shadow-md rounded-3xl border border-black bg-white p-3 flex items-center justify-center md:m-10 mt-5 px-12 w-full md:w-2/6"
                                    >
                                        <BiChevronLeft />
                                        ANTERIOR
                                    </button>
                                )}
                                {activeStep !== steps.length - 1 ? (
                                    <button
                                        onClick={() => handleNextStep()}
                                        className="shadow-md rounded-3xl bg-black text-white p-3 flex items-center justify-center md:m-10 mt-5  px-10 md:w-2/6"
                                    >
                                        SIGUIENTE
                                        <BiChevronRight />
                                    </button>
                                ) : (
                                    <button
                                        className={`${
                                            !passCaptcha
                                                ? 'bg-gray-300'
                                                : 'bg-black'
                                        } shadow-md rounded-3xl text-white p-3 flex items-center justify-center  md:m-10 mt-5 px-10 md:w-2/6`}
                                        onClick={() => handleLastStep()}
                                        disabled={!passCaptcha}
                                    >
                                        ENVIAR
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return handleDisplayForm()
}
