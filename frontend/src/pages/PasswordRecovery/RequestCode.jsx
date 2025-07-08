import React from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useFetchPasswordRecovery from "../../hooks/PasswordRecovery/useFetchPasswordRecov.js";
import "../../assets/styles/PasswordRecovery.css"; 

const RequestCode = () => {
    const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleRequest } = useFetchPasswordRecovery();

  const onSubmit = async (data) => {
    try {
      await handleRequest(data.email);
      navigate('/verify-code');
    } catch (error) {
      // El toast ya se maneja dentro del hook, pero podrías hacer más cosas aquí si quieres
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
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
            className="recovery-input"
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <button type="submit" className="recovery-button">Enviar código</button>
      </form>
    </div>
  );
};

export default RequestCode;
