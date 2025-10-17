import React, { useState, useRef, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetchRegister from "../../hooks/Register/useFetchRegister.js";
import useFetchResend from "../../hooks/Register/useFetchResendVerifyCode.js";
import Button from "../Button/Button.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import { useAuth } from "../../context/AuthContext";
import VerificationCodeInput from "../VerificationCodeInput/VerificationCodeInput.jsx";

const VerificationCodeModal = ({ onClose, openLogin, email, role }) => {
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { token: "" },
  });

  const modalRef = useRef();

  //Estados para la verificacion  del envio y el Countdown para el reenvio del codigo
  const [resendCountdown, setResendCountdown] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { verifyEmail } = useFetchRegister();
  const { resendVerifyEmail } = useFetchResend();
  const { setPendingVerification, verificationInfo, clearVerificationInfo } = useAuth();

  //  Usar verificationInfo del contexto
  const currentEmail = email || verificationInfo.email;
  const currentRole = role || verificationInfo.role;

    //Efecto que Verifica que se haya enviado tanto el role como el email
  useEffect(() => {
    //Verifica que se haya enviado tanto el role como el email
    if (!currentEmail || !currentRole) {
      toast.error("Error: Faltan datos de verificación. Intenta registrarte nuevamente.");
    }
  }, [email, role, verificationInfo, currentEmail, currentRole]);

  // Funcio del Reenvío de código
  const handleResendCode = async () => {
    //Valida que se haya enviado los campos necesarios para el reenvio
    if (!currentEmail || !currentRole) {
      toast.error("No se puede reenviar el código: faltan datos de verificación.");
      return;
    }

    //Retorna el envio del codigo
    if (isResending) return;
    setIsResending(true);
    setResendCountdown(30)
    
    try {
      await resendVerifyEmail({ email: currentEmail, role: currentRole });
      toast.success("Código reenviado a tu correo.");
    } catch (error) {
      toast.error(error.message || "Error al reenviar el código.");
    } finally {
      // Bloquea el botón por 30s
      setTimeout(() => setIsResending(false), 30000);
    }
  };

  //  Cerrar modal
  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose?.();
        openLogin?.();
      }, 250);
    }
  };

  //  Enviar código
  const onSubmit = async (data) => {
    if (!data.token || data.token.length < 6) { 
      toast.error("Debes ingresar un código válido");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      //Hace el envio del token al backend
      const response = await verifyEmail(data.token);
      if (response) {
        toast.success("Código verificado con éxito.");
        reset();

        //  Actualiza estado global para que no vuelva a abrir
        setPendingVerification(false);

        //  Animación de cierre
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


//Creo el temporizador 
  useEffect(() => {
    if(!isResending) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        //Si el contador llega a 1 o menos se detiene
        if (prev <= 1) {
          clearInterval(timer)
          setIsResending(false)
          return 0;
        }
        return prev -1;
      });
      //Esto se ejecuta cada 1000 milisegundos
    }, 1000);
    return () => clearInterval(timer)
  }, [isResending])

  const handleCodeChange = (token) => setValue("token", token);

  //  Si no tenemos los datos necesarios, mostrar error
  if (!currentEmail || !currentRole) {
    return (
      <div className="modal-overlay-register">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="register-container modal-content-register" ref={modalRef}>
          <div className="register-logo" style={{ marginBottom: 10 }}>
            <img src={logo} alt="Huellitas" />
          </div>
          <hr />
          <h2 className="register-title" style={{ marginTop: 50 }}>
            Error de Verificación
          </h2>
          <p style={{ color: 'red', textAlign: 'center' }}>
            No se encontraron los datos necesarios para la verificación.
          </p>
          <p style={{ textAlign: 'center' }}>
            Por favor, intenta registrarte nuevamente.
          </p>
          <Button
            onClick={handleClose}
            className="register-button"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

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

        <p>Ingrese el código que se le ha enviado a: <strong>{currentEmail}</strong></p>
        <p style={{ fontSize: '12px', color: '#666' }}>Tipo de cuenta: {currentRole}</p>

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

        <p
          className={`register-small-link ${isResending ? 'disabled' : ''}`}
          onClick={!isResending ? handleResendCode : undefined}
          style={{ 
            cursor: isResending ? 'not-allowed' : 'pointer',
            opacity: isResending ? 0.5 : 1
          }}
        >
          {isResending
            ? `Espera ${resendCountdown} segundos para reenviar`
            : "Reenviar código"}
        </p>

        <div className="register-decoration"></div>
      </div>
    </div>
  );
};

export default VerificationCodeModal;