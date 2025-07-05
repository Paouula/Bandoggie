import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegister from "../hooks/Register/UseFetchRegister.js";
import InputComponent from "../components/Input";
import Button from "../components/Button";
import ImageLoader from "../components/ImageLoader/ImageLoader";
import logo from "../img/NavBar/LogoBandoggie.png";
import "../assets/styles/Register.css";
import PasswordInput from "../components/InputPassword/InputPassword.jsx";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleRegister } = useFetchRegister();

  const phoneValue = watch("phone", "");

  // Formatea el teléfono en tiempo real
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
        reset(); // Limpiar el formulario
        navigate("/verification-code");
      }
    } catch (error) {
      toast.error(error.message || "Registro fallido. Verifica tus datos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="register-logo" style={{ marginBottom: 10 }}>
        <img src={logo} alt="Huellitas" />
      </div>
      <hr />
      <h2 className="register-title">REGISTRO</h2>
      <Link to="/login">¿Ya tiene una cuenta? Inicie sesión</Link>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-profile-image-container">
          <ImageLoader id="image" onImageChange={setProfileImage} />
        </div>
        <div className="register-input-group">
          <label htmlFor="name">Nombre</label>
          <InputComponent
            type="text"
            id="name"
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
            <InputComponent
              type="date"
              id="birthday"
              placeholder="Fecha de nacimiento"
              register={register("birthday", {
                required: "La fecha de nacimiento es obligatoria",
                validate: (value) => {
                  if (!value) return "La fecha de nacimiento es obligatoria";
                  const today = new Date();
                  const birthDate = new Date(value);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const m = today.getMonth() - birthDate.getMonth();
                  if (
                    m < 0 ||
                    (m === 0 && today.getDate() < birthDate.getDate())
                  ) {
                    return age - 1 >= 18 ? true : "Debes ser mayor de edad";
                  }
                  return age >= 18 ? true : "Debes ser mayor de edad";
                },
              })}
              className="register-input"
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
            })}
            error={errors.password}
          />
        </div>
        <div className="register-forgot">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <Button type="submit" className="register-button" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Siguiente"}
        </Button>
      </form>
      <div className="register-decoration"></div>
    </div>
  );
};

export default Register;
