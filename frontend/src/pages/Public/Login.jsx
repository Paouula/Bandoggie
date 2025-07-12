import React from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useFetchLogin from "../../hooks/Login/UseFetchLogin.js";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Login.css";
import InputComponent from "../../components/Input/Input.jsx";
import ButtonComponent from "../../components/Button/Button.jsx";
import PasswordInput from "../../components/InputPassword/InputPassword.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { handleLogin } = useFetchLogin();

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
        navigate("/dashboard");
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
        toast.error(error.message || "Login fallido. Verifica tus credenciales.", { id: "login-error" });
      }
    }
  };

  return (
    <div className="login-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="HUELLITAS Logo" />
        </div>
        <hr />
        <h2>Iniciar Sesión</h2>
        <Link className="small-link" to="/choose-account">¿No tienes una cuenta aún? Regístrate</Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Correo Electrónico</label>
          <InputComponent
            type="email"
            id="email"
            placeholder="Ingresa tu correo"
            register={register("email", { required: true })}
            icon="📧"
          />
          {errors.email && <span style={{ color: "red" }}>Este campo es obligatorio</span>}

          <label htmlFor="password">Contraseña</label>
          <PasswordInput
            id="password"
            placeholder="Ingresa tu contraseña"
            register={register("password", { required: true })}
          />
          {errors.password && <span style={{ color: "red" }}>Este campo es obligatorio</span>}
          {/*<p className="forgot">¿Olvidaste tu contraseña?</p>*/}
          <Link className="small-link" to="/request-code">¿Olvidaste tu contraseña?</Link>
          <ButtonComponent type="submit">Confirmar</ButtonComponent>
        </form>
      </div>
      <div className="decoration-container"></div>
    </div>
  );
};

export default Login;
