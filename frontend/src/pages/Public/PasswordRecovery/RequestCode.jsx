import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import useFetchPasswordRecovery from "../../../hooks/PasswordRecovery/useFetchPasswordRecov.js";
import logo from "../../../img/LogoBandoggie.png";
import InputComponent from "../../../components/Input/Input.jsx";
import ButtonComponent from "../../../components/Button/Button.jsx";
import "../../../assets/styles/PasswordRecovery.css";

const RequestCode = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { handleRequest } = useFetchPasswordRecovery();

  const [isSending, setIsSending] = useState(false); 

  const onSubmit = async (data) => {
    if (isSending) return;
    setIsSending(true); 
    try {
      await handleRequest(data.email);
      navigate("/verify-code");
    } catch (error) {
      console.error("Error al enviar el código de verificación:", error);
    } finally {
      setIsSending(false); 
    }
  };

  return (
    <div className="parent-container">
      <div className="recovery-container">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="recovery-logo" style={{ marginBottom: 10 }}>
          <img src={logo} alt="Huellitas" />
        </div>
        <hr />
        <h2>Recuperar Contraseña</h2>
        <p>
          Ingresa tu correo electrónico para recibir un código de verificación
        </p>

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
              disabled={isSending} 
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
        <div className="recovery-link">
          <Link to="/mainpage">Volver a la pagina principal</Link>
        </div>
        <div className="recovery-decoration"></div>
      </div>
    </div>
  );
};

export default RequestCode;
