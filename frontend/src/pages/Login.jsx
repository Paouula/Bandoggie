import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useFetchLogin from "../hooks/Login/UseFetchLogin";
import logo from "../img/NavBar/LogoBandoggie.png";
import "../assets/styles/Login.css";
import InputComponent from "../components/Input";
import ButtonComponent from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { handleLogin } = useFetchLogin();

  const onSubmit = async (data) => {
    try {
      const response = await handleLogin(data.email, data.password);
      if (response) {
        toast.success("Login successful");
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="HUELLITAS Logo" />
        </div>
        <hr />
        <h2>Iniciar Sesión</h2>
        <p className="small-link">¿No tienes una cuenta aún?</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Correo Electrónico</label>
          <InputComponent
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            register={register("email", { required: true })}
            icon="📧"
          />

          <label htmlFor="password">Contraseña</label>
          <InputComponent
            type="password"
            id="password"
            placeholder="Ingresa tu contraseña"
            register={register("password", { required: true })}
            icon="👁️"
          />

          <p className="forgot">¿Olvidaste tu contraseña?</p>

          <ButtonComponent type="submit">Confirmar</ButtonComponent>
        </form>
      </div>
      <div className="decoration-container"></div>
    </div>
  );
};

export default Login;
