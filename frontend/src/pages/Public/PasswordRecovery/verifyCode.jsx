import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchPasswordRecovery from "../../../hooks/PasswordRecovery/useFetchPasswordRecov.js";
import VerificationCodeInput from "../../../components/VerificationCodeInput/VerificationCodeInput";
import logo from "../../../img/LogoBandoggie.png";
import Button from "../../../components/Button/Button.jsx";
import "../../../assets/styles/PasswordRecovery.css";

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
      const result = await handleVerify(data.code);
      if (result) {
        toast.success("Código verificado correctamente");
        reset();
        navigate("/new-password");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (value) => setValue("code", value);

  return (
    <div className="parent-container">
      <div className="recovery-container">
        <Toaster position="top-right" reverseOrder={false} />

      
        <div className="recovery-logo">
          <img src={logo} alt="Bandoggie" />
        </div>

        <hr />

       
        <h2>Verifica tu código</h2>
        <p>Ingresa el código que hemos enviado a tu correo electrónico</p>

       
        <form onSubmit={handleSubmit(onSubmit)} className="recovery-form">
          <VerificationCodeInput onChange={handleCodeChange} />

          
          <input
            type="hidden"
            {...register("code", {
              required: "El código es obligatorio",
              minLength: { value: 4, message: "Debe tener 4 dígitos" },
            })}
          />
          {errors.code && (
            <span className="form-error">{errors.code.message}</span>
          )}

          <Button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verificando..." : "Siguiente"}
          </Button>
        </form>

        
        <div className="recovery-decoration"></div>
      </div>
    </div>
  );
};

export default VerificationCode;
