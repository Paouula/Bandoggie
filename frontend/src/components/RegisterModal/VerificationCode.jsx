import React, { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegister from "../../hooks/Register/useFetchRegister.js";
import Button from "../Button/Button.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import VerificationCodeInput from "../VerificationCodeInput/VerificationCodeInput.jsx";

const VerificationCodeModal = ({ onClose, openLogin }) => {
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const modalRef = useRef();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyEmail } = useFetchRegister();

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
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast.success("Código enviado. Por favor, espera...");
    try {
      const response = await verifyEmail(data.token);
      if (response) {
        reset();
        // Cerramos el modal y abrimos login después de éxito
        if (modalRef.current) {
          modalRef.current.classList.add("fade-out");
          setTimeout(() => {
            onClose?.();
            openLogin?.();
          }, 250);
        } else {
          onClose?.();
          openLogin?.();
        }
        toast.success("Código verificado con éxito.");
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
