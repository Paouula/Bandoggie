import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import useFetchRegister from "../../hooks/Register/UseFetchRegister.js";
import InputComponent from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import ImageLoader from "../ImageLoader/ImageLoader.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import InputDataPicker from "../InputDataPicker/InputDataPicker.jsx";
import PasswordInput from "../InputPassword/InputPassword.jsx";

const RegisterModal = ({ onClose, openLogin, onRegisterSuccess }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleRegister } = useFetchRegister();
  const phoneValue = watch("phone", "");

  // Formatea el teléfono con guion "1111-1111"
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4, 8);
    }
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    setValue("phone", value);
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    if (!profileImage) {
      toast.error("Por favor, sube una imagen de perfil.");
      return;
    }

    setIsSubmitting(true);
    toast.success("La información se ha enviado. Por favor, espera...");
    try {
      const response = await handleRegister(
        data.name,
        data.email,
        data.phone,
        data.birthday,
        data.password,
        profileImage
      );
      if (response) {
        reset();
        // No cerramos el modal aquí
        // Llamamos la función que el padre nos pasó para mostrar el modal de verificación
        onRegisterSuccess?.();
      }
    } catch (error) {
      toast.error(error.message || "Registro fallido. Verifica tus datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <h2 className="register-title">REGISTRO</h2>

        <p
          className="small-link"
          onClick={() => {
            onClose?.();
            openLogin?.();
          }}
          style={{ cursor: "pointer" }}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </p>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="register-profile-image-container">
            <ImageLoader id="image" onImageChange={setProfileImage} />
          </div>

          <div className="register-input-group">
            <label htmlFor="name">Nombre</label>
            <InputComponent
              type="text"
              id="name"
              onChange={(e) => {
                const onlyLyrics = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ""
                );
                e.target.value = onlyLyrics;
              }}
              placeholder="Nombre"
              register={register("name", {
                required: "El nombre es obligatorio",
              })}
              className="register-input"
            />
            {errors.name && (
              <span style={{ color: "red" }}>{errors.name.message}</span>
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
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div className="register-input-group" style={{ flex: 1 }}>
              <label htmlFor="birthday">Fecha de nacimiento</label>
              <Controller
                name="birthday"
                control={control}
                rules={{
                  required: "La fecha de nacimiento es obligatoria",
                  validate: (value) => {
                    if (!value) return "La fecha de nacimiento es obligatoria";
                    const today = new Date();
                    const birthDate = new Date(value);
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    if (
                      m < 0 ||
                      (m === 0 && today.getDate() < birthDate.getDate())
                    ) {
                      age--;
                    }
                    return age >= 18 ? true : "Debes ser mayor de edad";
                  },
                }}
                render={({ field, fieldState }) => (
                  <InputDataPicker
                    {...field}
                    label="Fecha de nacimiento"
                    error={fieldState.error}
                    id="birthday"
                  />
                )}
              />
              {errors.birthday && (
                <span style={{ color: "red" }}>{errors.birthday.message}</span>
              )}
            </div>

            <div className="register-input-group" style={{ flex: 1 }}>
              <label htmlFor="phone">Teléfono</label>
              <InputComponent
                type="text"
                id="phone"
                placeholder="1111-1111"
                register={register("phone", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^\d{4}-\d{4}$/,
                    message: "Formato: 1111-1111",
                  },
                })}
                className="register-input"
                maxLength={9}
                onChange={handlePhoneChange}
                inputMode="numeric"
                autoComplete="off"
                value={phoneValue}
              />
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone.message}</span>
              )}
            </div>
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

          <div className="register-forgot">
            <a href="/request-code">¿Olvidaste tu contraseña?</a>
          </div>

          <Button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Siguiente"}
          </Button>
        </form>

        <div className="register-decoration"></div>
      </div>
    </div>
  );
};

export default RegisterModal;
