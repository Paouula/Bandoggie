import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegister from "../../hooks/Register/useFetchRegister.js";
import Button from "../Button/Button.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import { useAuth } from "../../Context/AuthContext.jsx";
import VerificationCodeInput from "../VerificationCodeInput/VerificationCodeInput.jsx";

const VerificationCodeModal = ({ onClose, openLogin }) => {
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { token: "" },
  });

  const modalRef = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyEmail } = useFetchRegister();
  const { setPendingVerification } = useAuth()

  // Función para cerrar modal Y abrir login
  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose?.();      // Cierra el modal de verificación
        openLogin?.();    // Abre el login
      }, 250); 
    }
  };

   const onSubmit = async (data) => {
    if (!data.token || data.token.length < 6) { // 🔹 Validación mínima
      toast.error("Debes ingresar un código válido");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await verifyEmail(data.token);
      if (response) {
        toast.success("Código verificado con éxito.");
        reset();

        // 🔹 Actualiza estado global para que no vuelva a abrir
        setPendingVerification(false);

        // 🔹 Animación de cierre
        if (modalRef.current) {
          modalRef.current.classList.add("fade-out");
          setTimeout(() => {
            openLogin?.();
          }, 250);
        } else {
          openLogin?.();
        }
      }
    } catch (error) {
      toast.error(error.message || "Error al verificar el código.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (token) => {
    setValue("token", token);
  };

  return (
    <div className="modal-overlay-register">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="register-container modal-content-register" ref={modalRef}>
       

        <div className="register-logo" style={{ marginBottom: 10 }}>
          <img src={logo} alt="Huellitas" />
        </div>
        <hr />
        <h2 className="register-title" style={{ marginTop: 50 }}>
          Verifique su código
        </h2>

        <p>Ingrese el código que se le ha enviado a su correo electrónico</p>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: 30 }}>
            <VerificationCodeInput onChange={handleCodeChange} />
          </div>

          {errors.token && (
            <span style={{ color: "red" }}>{errors.token.message}</span>
          )}

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

export default VerificationCodeModal;
