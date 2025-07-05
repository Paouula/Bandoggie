import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegister from "../hooks/Register/UseFetchRegister.js";
import Button from "../components/Button";
import logo from "../img/NavBar/LogoBandoggie.png";
import "../assets/styles/Register.css";
import VerificationCodeInput from "../components/VerificationCodeInput/VerificationCodeInput.jsx";

const VerificationCode = () => {
    const navigate = useNavigate();
    const {
       handleSubmit,
       reset,
       setValue,
       formState: { errors },
    } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { verifyEmail } = useFetchRegister();

    const onSubmit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        toast.success("Código enviado. Por favor, espera...");
        try {
            const response = await verifyEmail(data.token);
            if (response) {
                reset();
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.message || "Error al verificar el código.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Maneja el cambio del código y lo guarda en el form
    const handleCodeChange = (token) => {
        setValue("token", token);
    };

    return (
        <div className="register-container">
            <Toaster position="top-right" reverseOrder={false} />
            <div className="register-logo" style={{ marginBottom: 10 }}>
                <img src={logo} alt="Huellitas" />
            </div>
            <hr />
            <h2 className="register-title" style={{ marginTop: 50 }}>Verifique su código</h2>

            <p>Ingrese el código que se le ha enviado a su correo electrónico</p>

            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: 30 }}>
                    <VerificationCodeInput onChange={handleCodeChange} />
                </div>
                {errors.code && (
                    <span style={{ color: "red" }}>{errors.code.message}</span>
                )}
                <Button type="submit" className="register-button" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Siguiente"}
                </Button>
            </form>
            <div className="register-decoration"></div>
        </div>
    );
};

export default VerificationCode;