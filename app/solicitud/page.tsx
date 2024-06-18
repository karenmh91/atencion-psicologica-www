'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Stepper from 'react-stepper-horizontal';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';

import ReCAPTCHA from 'react-google-recaptcha';
import {
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Input,
    TextField,
} from '@mui/material';
import { CreateRequest } from '@/models/interfaces';
import { Label } from '@headlessui/react/dist/components/label/label';
import { createRequest } from '@/services/requests.service';
import useAlertsStore from '@/store/storeAlerts';
import DialogInfo from '@/components/DialogInfo/DialogInfo';

export default function Page() {
    const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    /////Store
    const { setAlert } = useAlertsStore((state) => state);
    /////

    const router = useRouter();

    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [contenidoModal, setContenidoModal] = useState<string>('');

    const [isReqLoading, setIsReqLoading] = useState<boolean>(false);
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

    const onChangePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length > 10) return;

        // Eliminar cualquier caracter no numérico del número
        const cleaned = e.currentTarget.value.replace(/\D/g, '');

        // Aplicar la máscara (por ejemplo, con guiones)
        const formatted = cleaned.replace(
            /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            '$1-$2-$3-$4-$5'
        );
        setForm({ ...form, phone: formatted });
    };

    const onChangeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
        let regNums = /^[0-9]+$/;

        if (regNums.test(e.currentTarget.value) || e.currentTarget.value === '')
            setForm({ ...form, nomina_number: e.currentTarget.value });
    };

    const onChangeTextInput = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    };

    const createSolicitud = async () => {
        if (
            !(acceptBox && passCaptcha) ||
            form.name === '' ||
            form.nomina_number === '' ||
            !regExEmail.test(form.email) ||
            form.phone === ''
        ) {
            setShowErrors(true);
            return;
        }
        let currDate = new Date();

        let hh = ('0' + currDate.getHours()).slice(-2);
        let mm = ('0' + currDate.getMinutes()).slice(-2);

        let DD = ('0' + currDate.getDate()).slice(-2);
        let MM = ('0' + (currDate.getMonth() + 1)).slice(-2);
        let YYYY = currDate.getFullYear();

        setIsReqLoading(true);
        let res = await createRequest({
            ...form,
            hour_request: `${hh}:${mm} `,
            date_request: `${YYYY}-${MM}-${DD}`,
        });

        if (res.status === 200) {
            setAlert('success', res.message || 'Solicitud creada con exito');
            setConfirmModal(true);
            setContenidoModal(
                `Se ha creado una nueva solicitud con el id ${('0000' + res.response?.id).slice(-4)}`
            );
        } else {
            if (res.status === 500) {
                setAlert('error', 'Error en el servidor.');
            } else {
                setAlert(
                    'error',
                    res.message || 'Error al crear la solicitud.'
                );
            }
        }
        setIsReqLoading(false);
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
            <>
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
                                        error={showErrors && form.name === ''}
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
                                        error={
                                            showErrors &&
                                            form.nomina_number === ''
                                        }
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
                                        error={
                                            showErrors &&
                                            !regExEmail.test(form.email)
                                        }
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        required
                                        size="small"
                                        value={form.email}
                                        name="email"
                                        onChange={onChangeTextInput}
                                        helperText={
                                            showErrors &&
                                            !regExEmail.test(form.email)
                                                ? 'Debe de ser un email válido.'
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="w-full mb-2">
                                    <TextField
                                        error={showErrors && form.phone === ''}
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
                                <div className="w-full flex justify-center items-center mb-4">
                                    <div className="w-full mr-1">
                                        <FormControl error={!acceptBox}>
                                            <FormControlLabel
                                                required
                                                control={
                                                    <Checkbox
                                                        onChange={
                                                            handleAcceptBox
                                                        }
                                                        checked={acceptBox}
                                                    />
                                                }
                                                label={`Declaro bajo protesta de decir verdad, que
                                            he leído y acepto los Términos y Condiciones
                                            y el Aviso de Privacidad de Municipio de San
                                            Pedro Garza García.`}
                                            />
                                            {!acceptBox && showErrors && (
                                                <FormHelperText>
                                                    Para solicitar una cita es
                                                    necesario este campo.
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
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
                                        acceptBox &&
                                        passCaptcha &&
                                        !isReqLoading
                                            ? 'bg-black'
                                            : 'bg-gray-300'
                                    } shadow-md rounded-3xl text-white p-3 flex items-center justify-center  md:m-10 mt-5 px-10 md:w-2/6`}
                                    disabled={
                                        !(acceptBox && passCaptcha) ||
                                        isReqLoading
                                    }
                                    onClick={createSolicitud}
                                >
                                    {isReqLoading ? (
                                        <CircularProgress />
                                    ) : (
                                        'ENVIAR'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogInfo
                    title="Solicitud creada"
                    onClose={() => {
                        setConfirmModal(false);
                        setContenidoModal('');
                        router.push('/');
                    }}
                    content={contenidoModal}
                    isOpen={confirmModal}
                />
            </>
        );
    };

    return handleDisplayForm();
}
