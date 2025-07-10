import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import logo from "../../../img/LogoBandoggie.png";
import InputPassword from "../../../components/InputPassword/InputPassword.jsx";
import Button from "../../../components/Button/Button.jsx";
import useFetchPasswordRecovery from "../../../hooks/PasswordRecovery/useFetchPasswordRecov.js";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { handleNewPass } = useFetchPasswordRecovery();
  const newPasswordValue = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const result = await handleNewPass(data.newPassword);
      if (result) {
        toast.success("¡Contraseña actualizada con éxito!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
    }
  };

  return (
    <div className="recovery-container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="recovery-logo" style={{ marginBottom: 10 }}>
        <img src={logo} alt="Huellitas" />
      </div>
       <hr />
      <h2>Cambiar Contraseña</h2>
      <p>Ingresa tu nueva contraseña</p>

      <form onSubmit={handleSubmit(onSubmit)} className="recovery-form">
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña</label>
          <InputPassword
            id="newPassword"
            placeholder="Nueva contraseña"
            register={register("newPassword", {
              required: "La nueva contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Debe tener un máximo de 30 caracteres",
              },
            })}
            className="input-recovery"
          />
          {errors.newPassword && (
            <span className="form-error">{errors.newPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <InputPassword
            id="confirmPassword"
            placeholder="Repite la contraseña"
            register={register("confirmPassword", {
              required: "Confirma tu contraseña",
              validate: (value) =>
                value === newPasswordValue || "Las contraseñas no coinciden",
            })}
            className="input-recovery"
          />
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button type="submit" className="button-recovery">
          Cambiar contraseña
        </Button>
      </form>
      <div className="recovery-decoration"></div>
    </div>
  );
};

export default ChangePassword;
