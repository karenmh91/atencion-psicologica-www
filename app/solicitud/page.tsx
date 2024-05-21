'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

import ReCAPTCHA from 'react-google-recaptcha';
import { FormControl, Input, TextField } from '@mui/material';
import { CreateRequest } from '@/models/interfaces';

export default function Page() {
    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);
    const [title, setTitle] = useState('');
    const [passCaptcha, setPassCaptcha] = useState(false);
    const [titleFontSize, setTitleFontSize] = useState(16);
    const [acceptBox, setAcceptBox] = useState<boolean>(false);
    const [showErrors, setShowErrors] = useState<boolean>(false);
    const [form, setForm] = useState<CreateRequest>({
        name: '',
        nomina_number: '',
        email: '',
        date_request: '',
        hour_request: '',
        id_request_status: 1,
        id_user_created_by: 1,
        motive_appointment: '',
        origin_system: 1,
        phone: '',
    });

    const captcha = useRef(null);

    const steps = [
        { title: 'Proporciona tus datos para iniciar una solicitud' },
    ];

    const onChangePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {};

    const onChangeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {};

    const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    };

    const createSolicitud = () => {
        if (
            !passCaptcha &&
            !acceptBox &&
            (form.name === '' ||
                form.nomina_number === '' ||
                form.email === '' ||
                form.phone === '')
        )
            setShowErrors(true);

        // Empezar con la petición
    };

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

    const onChange = (value) => {
        // if(captcha.current.getValue())
        setPassCaptcha(true);
    };

    const handleDisplayForm = () => {
        return (
            <div className="mb-28 px-4 lg:px-40 xl:px-96">
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
                        <div className="w-full flex flex-col mt-4">
                            <div className="w-full mb-2">
                                <TextField
                                    fullWidth
                                    label="Nombre del solicitante"
                                    variant="outlined"
                                    required
                                    size="small"
                                    value={form.name}
                                    name="name"
                                    onChange={onChangeTextInput}
                                />
                            </div>
                            <div className="w-full mb-2">
                                <TextField
                                    fullWidth
                                    label="Número de nómina"
                                    variant="outlined"
                                    required
                                    size="small"
                                    value={form.nomina_number}
                                    name="nomina_number"
                                    onChange={onChangeNumberInput}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-between ">
                            <div className="w-full mb-2">
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    required
                                    size="small"
                                    value={form.email}
                                    name="email"
                                    onChange={onChangeTextInput}
                                />
                            </div>
                            <div className="w-full mb-2">
                                <TextField
                                    fullWidth
                                    label="Télefono"
                                    variant="outlined"
                                    required
                                    size="small"
                                    value={form.phone}
                                    name="phone"
                                    onChange={onChangePhoneInput}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="w-full flex flex-col items-center">
                            <div className="w-full flex justify-between items-center mb-4">
                                <div className="w-1/12 mr-1">
                                    <input
                                        type="checkbox"
                                        checked={acceptBox}
                                        onChange={handleAcceptBox}
                                        className=""
                                    />
                                </div>
                                <label className="w-11/12 text-left">
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
                        <div className="flex justify-center">
                            <button
                                className={`${
                                    acceptBox && passCaptcha
                                        ? 'bg-black'
                                        : 'bg-gray-300'
                                } shadow-md rounded-3xl text-white p-3 flex items-center justify-center  md:m-10 mt-5 px-10 md:w-2/6`}
                                disabled={!passCaptcha}
                                onClick={createSolicitud}
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
