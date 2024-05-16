/* eslint-disable no-shadow */
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createTheme, styled } from '@mui/material/styles'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'

export default function Home() {
    const router = useRouter()
    const [open, setOpen] = useState(0)
    const handleOpen = (value) => setOpen(open === value ? 0 : value)

    const defaultMaterialTheme = createTheme()

    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 27 27"
                strokeWidth={2}
                stroke="currentColor"
                className={`${
                    parseInt(id) === parseInt(open) ? 'rotate-180' : 'rotate-0'
                } h-5 w-5 transition-transform`}
            >
                {/* Primer SVG con filtro */}
                <g filter="url(#filter0_d_429_74)">
                    <circle cx="13.5" cy="13.5" r="10.5" fill="black" />
                </g>

                {/* Definición del filtro */}
                <defs>
                    <filter
                        id="filter0_d_429_74"
                        x="0"
                        y="0"
                        width="27"
                        height="27"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                    >
                        <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                        />
                        <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                        />
                        <feMorphology
                            radius="1"
                            operator="dilate"
                            in="SourceAlpha"
                            result="effect1_dropShadow_429_74"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="1" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_429_74"
                        />
                        <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_429_74"
                            result="shape"
                        />
                    </filter>
                </defs>

                {/* Segundo SVG sobre el primero, centrado */}
                <g transform="translate(7, 10)">
                    <path
                        d="M11 1H2L6.38462 6L11 1Z"
                        fill="white"
                        stroke="white"
                    />
                </g>
            </svg>
        )
    }

    const handleClick = () => {
        router.push(`/solicitud`)
    }

    const Accordion = styled((props: AccordionProps) => (
        <MuiAccordion elevation={0} {...props} />
    ))(({ theme }) => ({
        backgroundColor: 'white',
        border: `none`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    }))

    const AccordionSummary = styled((props: AccordionSummaryProps) => (
        <MuiAccordionSummary
            expandIcon={<Icon id={props.id} open={open} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: 'white',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: theme.spacing(1),
        },
    }))

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
    }))

    return (
        <>
            <div className="mx-10 sm:mx-28">
                <div className="w-full pt-6">
                    <h2 className="mb-3 font-bold text-xl">Solicita tu cita</h2>
                    <p className="leading-6">
                        Este es un espacio dedicado a recibir solicitudes de
                        cita de atención psicológica, para trabajadores del
                        municipio de San Pedro Garza García.
                    </p>

                    <p className="mt-8">Solicitar tu cita es muy sencillo:</p>

                    <div className="w-5/6 mx-auto mt-[50px] mb-[100px] py-8 px-8">
                        <div className="step-content w-full relative flex flex-col md:flex-row items-center justify-between">
                            <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 border-b bg-gray-300 hidden md:block"></div>
                            <div className="mb-20 md:mb-0 relative z-10 grid place-items-center w-10 h-10 rounded-full font-bold transition-all duration-300 bg-gray-900 text-white">
                                1
                                <div className="absolute -bottom-[3.5rem] w-max text-center">
                                    <p className="block antialiased font-sans leading-relaxed font-normal text-black">
                                        Proporciona tus datos <br />
                                    </p>
                                </div>
                            </div>
                            <div className="mb-20 md:mb-0 step-2 relative z-10 grid place-items-center w-10 h-10 rounded-full font-bold transition-all duration-300 bg-gray-900 text-white">
                                2
                                <div className="absolute -bottom-[3.5rem] w-[325px] text-center">
                                    <p className="text-black antialiased font-sans text-base leading-relaxed text-blue-gray-900 font-normal">
                                        Recibe correo de solicitud de cita, y
                                        espera de 1-2 días con los datos de la
                                        cita asignada
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-btn text-center">
                        <button
                            onClick={handleClick}
                            className="bg-black text-white rounded-full px-7 py-3 hover:bg-gray-700"
                        >
                            Solicitar cita
                        </button>
                    </div>

                    {/*Preguntas frecuenes*/}
                    <div className="mt-[70px] mb-[70px]">
                        <h2 className="mb-3">Preguntas frecuentes</h2>
                        <Accordion expanded={open === 1}>
                            <AccordionSummary
                                id="1"
                                onClick={() => handleOpen(1)}
                            >
                                ¿Pregunta 1?
                            </AccordionSummary>
                            <AccordionDetails>Respuesta 1</AccordionDetails>
                        </Accordion>
                        <Accordion expanded={open === 2}>
                            <AccordionSummary
                                id="2"
                                onClick={() => handleOpen(2)}
                            >
                                ¿Pregunta 2?
                            </AccordionSummary>
                            <AccordionDetails>Respuesta 2</AccordionDetails>
                        </Accordion>
                        <Accordion expanded={open === 3}>
                            <AccordionSummary
                                id="3"
                                onClick={() => handleOpen(3)}
                            >
                                ¿Pregunta 3?
                            </AccordionSummary>
                            <AccordionDetails>Respuesta 3</AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    )
}
