import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegisterVet from "../../hooks/Register/useFetchRegisterVet.js";
import InputComponent from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import PasswordInput from "../InputPassword/InputPassword.jsx";
import VerificationCodeModal from "./VerificationCode.jsx";

const RegisterVetModal = ({ onClose, openLogin }) => {
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleRegister } = useFetchRegisterVet();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast.success("Enviando información...");
    try {
      const response = await handleRegister(
        data.nameVet,
        data.email,
        data.password,
        data.locationVet,
        data.nitVet
      );

      if (response) {
        reset();
        setShowVerification(true); // Mostrar modal de verificación
      }
    } catch (error) {
      toast.error(error.message || "Registro fallido");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cierre del modal de verificación: cierra todo el modal padre
  const handleCloseVerification = () => {
    setShowVerification(false);
    onClose?.();
  };

  return (
    <>
      {showVerification ? (
        <VerificationCodeModal onClose={handleCloseVerification} />
      ) : (
        <div className="modal-overlay">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="register-container modal-content">
            <button className="modal-close" onClick={onClose}>
              ×
            </button>

            <div className="register-logo" style={{ marginBottom: 10 }}>
              <img src={logo} alt="Huellitas" />
            </div>
            <hr />
            <h2 className="register-title">REGISTRO DE VETERINARIA</h2>

            <p
              className="small-link"
              onClick={() => {
                onClose?.();
                openLogin?.();
              }}
              style={{ cursor: "pointer" }}
            >
              ¿Ya tiene una cuenta? Inicia sesión
            </p>

            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="register-input-group">
                <label htmlFor="nameVet">Nombre de la veterinaria</label>
                <InputComponent
                  type="text"
                  id="nameVet"
                  onChange={(e) => {
                    const onlyLyrics = e.target.value.replace(
                      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                      ""
                    );
                    e.target.value = onlyLyrics;
                  }}
                  placeholder="Nombre"
                  register={register("nameVet", {
                    required: "El nombre es obligatorio",
                  })}
                  className="register-input"
                />
                {errors.nameVet && (
                  <span className="form-error">{errors.nameVet.message}</span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="email">Correo Electrónico</label>
                <InputComponent
                  type="email"
                  id="email"
                  placeholder="Correo Electrónico"
                  register={register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  className="register-input"
                />
                {errors.email && (
                  <span className="form-error">{errors.email.message}</span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="password">Contraseña</label>
                <PasswordInput
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  register={register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "Debe tener al menos 8 caracteres",
                    },
                    maxLength: {
                      value: 30,
                      message: "Debe tener un máximo de 30 caracteres",
                    },
                  })}
                />
                {errors.password && (
                  <span className="form-error">{errors.password.message}</span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="locationVet">Ubicación</label>
                <InputComponent
                  type="text"
                  id="locationVet"
                  placeholder="Ubicación de la veterinaria"
                  register={register("locationVet", {
                    required: "La ubicación es obligatoria",
                  })}
                  className="register-input"
                />
                {errors.locationVet && (
                  <span className="form-error">{errors.locationVet.message}</span>
                )}
              </div>

              <div className="register-input-group">
                <label htmlFor="nitVet">NIT</label>
                <InputComponent
                  type="text"
                  id="nitVet"
                  placeholder="NIT"
                  register={register("nitVet", {
                    required: "El NIT es obligatorio",
                  })}
                  className="register-input"
                />
                {errors.nitVet && (
                  <span className="form-error">{errors.nitVet.message}</span>
                )}
              </div>

              <div className="register-forgot">
                <a href="/request-code">¿Olvidaste tu contraseña?</a>
              </div>

              <Button
                type="submit"
                className="register-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Registrarse"}
              </Button>
            </form>

            <div className="register-decoration"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterVetModal;
