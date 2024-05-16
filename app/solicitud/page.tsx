'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

import ReCAPTCHA from 'react-google-recaptcha';
import { FormControl, Input } from '@mui/material';

export default function Page() {
    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [passCaptcha, setPassCaptcha] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [titleFontSize, setTitleFontSize] = useState(16);
    const [acceptBox, setAcceptBox] = useState<boolean>(false);

    const captcha = useRef(null);

    const steps = [
        { title: 'Proporciona tus datos para iniciar una solicitud' },
    ];

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

    const handleAcceptBox = () => {
        setAcceptBox(!acceptBox);
    };

    const handleNextStep = () => {};

    const onChange = (value) => {
        // if(captcha.current.getValue())
        setPassCaptcha(true);
    };

    const handleDisplayForm = () => {
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
                    <div className="w-full">
                        <FormControl>
                            <Input />
                        </FormControl>
                    </div>
                    <div className="mt-6">
                        <div className="w-full flex flex-col items-center">
                            <div className="w-7/12 flex justify-center mb-2">
                                <div className="w-4 mr-1">
                                    <input
                                        type="checkbox"
                                        checked={acceptBox}
                                        onChange={handleAcceptBox}
                                        className=""
                                    />
                                </div>
                                <label className="text-center w-9/12">
                                    Declaro bajo protesta de decir verdad, que
                                    he leído y acepto los Términos y Condiciones
                                    y el Aviso de Privacidad de Municipio de San
                                    Pedro Garza García.
                                </label>
                            </div>
                            <ReCAPTCHA
                                ref={captcha}
                                sitekey="6LefMhgpAAAAAGhafQqB6ircUYgMXw_TorkJzi-V"
                                onChange={onChange}
                            />
                        </div>
                        <div className="md:flex md:flex-row justify-center ">
                            <button
                                className={`${
                                    !passCaptcha ? 'bg-gray-300' : 'bg-black'
                                } shadow-md rounded-3xl text-white p-3 flex items-center justify-center  md:m-10 mt-5 px-10 md:w-2/6`}
                                disabled={!passCaptcha}
                            >
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return handleDisplayForm();
}
