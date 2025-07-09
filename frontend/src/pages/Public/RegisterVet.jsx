import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegisterVet from "../../hooks/Register/useFetchRegisterVet";
import InputComponent from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import logo from "../../img/NavBar/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import PasswordInput from "../../components/InputPassword/InputPassword.jsx";

const RegisterVet = () => {
  const navigate = useNavigate();
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
        navigate("/verification-code");
      }
    } catch (error) {
      toast.error(error.message || "Registro fallido");
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
      <h2 className="register-title">REGISTRO DE VETERINARIA</h2>
      <Link to="/login">¿Ya tiene una cuenta? Inicia sesión</Link>

      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-input-group">
          <label htmlFor="nameVet">Nombre de la veterinaria</label>
          <InputComponent
            type="text"
            id="nameVet"
            placeholder="Nombre"
            register={register("nameVet", { required: "El nombre es obligatorio" })}
            className="register-input"
          />
          {errors.nameVet && <span style={{ color: "red" }}>{errors.nameVet.message}</span>}
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
          {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
        </div>

        <div className="register-input-group">
          <label htmlFor="password">Contraseña</label>
          <PasswordInput
            id="password"
            placeholder="Ingresa tu contraseña"
            register={register("password", { required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
        </div>
        
    

        <div className="register-input-group">
          <label htmlFor="locationVet">Ubicación</label>
          <InputComponent
            type="text"
            id="locationVet"
            placeholder="Ubicación de la veterinaria"
            register={register("locationVet", { required: "La ubicación es obligatoria" })}
            className="register-input"
          />
          {errors.locationVet && <span style={{ color: "red" }}>{errors.locationVet.message}</span>}
        </div>

        <div className="register-input-group">
          <label htmlFor="nitVet">NIT</label>
          <InputComponent
            type="text"
            id="nitVet"
            placeholder="NIT"
            register={register("nitVet", { required: "El NIT es obligatorio" })}
            className="register-input"
          />
          {errors.nitVet && <span style={{ color: "red" }}>{errors.nitVet.message}</span>}
        </div>
        <div className="register-forgot">
          <Link to="/request-code">¿Olvidaste tu contraseña?</Link>
        </div>
        <Button type="submit" className="register-button" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Registrarse"}
        </Button>
      </form>
      <div class="register-decoration"></div>
    </div>
  );
};

export default RegisterVet;
