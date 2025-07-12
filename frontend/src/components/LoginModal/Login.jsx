import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import useFetchLogin from "../../hooks/Login/UseFetchLogin.js";

import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Login.css";

import InputComponent from "../Input/Input.jsx";
import ButtonComponent from "../Button/Button.jsx";
import PasswordInput from "../InputPassword/InputPassword.jsx";

const LoginModal = ({ onClose, openChoose }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { handleLogin } = useFetchLogin();

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose?.();
      }, 250); // Debe coincidir con duración del fadeOut
    }
  };

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      toast.dismiss();
      toast.error("Por favor, ingresa todos los datos.", { id: "fields" });
      return;
    }

    try {
      const response = await handleLogin(data.email, data.password);
      if (response) {
        toast.dismiss();
        toast.success("Sesión iniciada correctamente", { id: "login" });
        reset();

        switch (response.userType) {
          case "employee":
          case "vet":
          case "client":
            navigate("/mainpage");
            break;
          default:
            toast.error("Tipo de usuario no reconocido.", {
              id: "user-type-error",
            });
        }

        handleClose(); // Usa fadeOut
      }
    } catch (error) {
      toast.dismiss();
      if (
        error.message &&
        (error.message.toLowerCase().includes("not found") ||
          error.message.toLowerCase().includes("no existe"))
      ) {
        toast.error("El perfil no existe.", { id: "no-user" });
      } else {
        toast.error(
          error.message || "Login fallido. Verifica tus credenciales.",
          { id: "login-error" }
        );
      }
    }
  };

  return (
    <div className="modal-overlay">
      <Toaster position="top-right" reverseOrder={true} />
      <div className="login-container modal-content" ref={modalRef}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="logo-container">
          <div className="logo">
          <img src={logo} alt="HUELLITAS Logo" />
        </div>
        </div>

        <hr />
        <h2>Iniciar Sesión</h2>

        <p
          className="small-link"
          onClick={() => {
            handleClose();
            openChoose?.();
          }}
          style={{ cursor: "pointer" }}
        >
          ¿No tienes una cuenta aún? Regístrate
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Correo Electrónico</label>
          <InputComponent
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            register={register("email", { required: true })}
            icon="📧"
          />
          {errors.email && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}

          <label htmlFor="password">Contraseña</label>
          <PasswordInput
            id="password"
            placeholder="Ingresa tu contraseña"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span style={{ color: "red" }}>Este campo es obligatorio</span>
          )}

          <a className="small-link" href="/request-code">
            ¿Olvidaste tu contraseña?
          </a>

          <ButtonComponent type="submit">Confirmar</ButtonComponent>
        </form>

        <div className="decoration-container"></div>
      </div>
    </div>
  );
};

export default LoginModal;
