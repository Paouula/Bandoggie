import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetchPasswordRecovery from "../../../hooks/PasswordRecovery/useFetchPasswordRecov.js";
import "../../../assets/styles/PasswordRecovery.css"; 

import InputComponent from "../../../components/Input/Input.jsx";  
import ButtonComponent from "../../../components/Button/Button.jsx"; 

const RequestCode = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleRequest } = useFetchPasswordRecovery();

  const [isSending, setIsSending] = useState(false); // 👈 Estado de carga

  const onSubmit = async (data) => {
    if (isSending) return;
    setIsSending(true); // ⏳ bloquear al hacer submit
    try {
      await handleRequest(data.email);
      navigate('/verify-code');
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
    } finally {
      setIsSending(false); // 🔓 desbloquear en caso de error
    }
  };

  return (
    <div className="recovery-container">
      <Toaster position="top-right" reverseOrder={false} />
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu correo electrónico para recibir un código de verificación</p>

      <form onSubmit={handleSubmit(onSubmit)} className="recovery-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <InputComponent
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            register={register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
            className="input-recovery"
            disabled={isSending} // 🔒 opcionalmente bloquea el input también
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <ButtonComponent
          type="submit"
          className="button-recovery"
          disabled={isSending}
        >
          {isSending ? "Enviando código..." : "Enviar código"}
        </ButtonComponent>
      </form>
    </div>
  );
};

export default RequestCode;
