import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchPasswordRecovery from "../../../hooks/PasswordRecovery/useFetchPasswordRecov.js";
import VerificationCodeInput from "../../../components/VerificationCodeInput/VerificationCodeInput";
import logo from "../../../img/NavBar/LogoBandoggie.png";
import Button from "../../../components/Button/Button.jsx";
import "../../../assets/styles/Register.css"; 

const VerificationCode = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { handleVerify } = useFetchPasswordRecovery();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await handleVerify(data.code); // usamos "code" aquí porque así se llama en handleVerify
      if (result) {
        toast.success("Código verificado correctamente");
        reset();
        navigate("/new-password"); // o donde quieras llevar al usuario
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (value) => {
    setValue("code", value);
  };

  return (
    <div className="register-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="register-logo">
        <img src={logo} alt="Bandoggie" />
      </div>
      <hr />
      <h2 className="register-title" style={{ marginTop: 50 }}>
        Verifica tu código
      </h2>
      <p className="verification-hint">
        Ingresa el código que hemos enviado a tu correo electrónico
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <div style={{ marginBottom: 30 }}>
          <VerificationCodeInput onChange={handleCodeChange} />
        </div>
        {/* Validación del input */}
        <input
          type="hidden"
          {...register("code", {
            required: "El código es obligatorio",
            minLength: {
              value: 4,
              message: "El código debe tener al menos 4 dígitos",
            },
          })}
        />
        {errors.code && (
          <span style={{ color: "red" }}>{errors.code.message}</span>
        )}

        <Button type="submit" className="register-button" disabled={isSubmitting}>
          {isSubmitting ? "Verificando..." : "Siguiente"}
        </Button>
      </form>
      <div className="register-decoration"></div>
    </div>
  );
};

export default VerificationCode;
