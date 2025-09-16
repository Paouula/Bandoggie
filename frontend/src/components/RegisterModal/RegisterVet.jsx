import React, { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import useFetchRegisterVet from "../../hooks/Register/useFetchRegisterVet.js";
import InputComponent from "../Input/Input.jsx";
import Button from "../Button/Button.jsx";
import logo from "../../img/LogoBandoggie.png";
import "../../assets/styles/Register.css";
import PasswordInput from "../InputPassword/InputPassword.jsx";
import ImageLoader from "../ImageLoader/ImageLoader.jsx"; 

const RegisterVetModal = ({
  onClose,
  openLogin,
  onRegisterSuccess,
  openChoose,
}) => {
  const modalRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState(null); 
  const { handleRegister } = useFetchRegisterVet();

  //Funcion para el cierre del modal
  const handleClose = () => {
    modalRef.current?.classList.add("fade-out");
    setTimeout(() => onClose?.(), 250);
  };

  //Funcion para la navegacion entre modales
  const handleBack = () => {
    modalRef.current?.classList.add("fade-out");
    setTimeout(() => {
      onClose?.();
      openChoose?.();
    }, 250);
  };

  //Funcion para el envio de los datos para el registro
  const onSubmit = async (data) => {
    if (isSubmitting) return;

    //Verifica que haya una imagen de perfil
    if (!profileImage) {
      toast.error("Por favor, sube una imagen de perfil.");
      return;
    }

    setIsSubmitting(true);
    toast.success("Enviando información...");

    //Envio de los datos
    try {
      const response = await handleRegister(
        data.nameVet,
        data.email,
        data.password,
        data.locationVet,
        data.nitVet,
        profileImage
      );

      if (response) {
        reset();
        setProfileImage(null); 
        onRegisterSuccess?.(data.email, "vet");
      }
    } catch (error) {
      toast.error(error.message || "Registro fallido");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay-register">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="register-container modal-content-register" ref={modalRef}>
        <div className="modal-header-buttons-register">
          <button
            type="button"
            className="register-back-button"
            onClick={handleBack}
            aria-label="Regresar"
          >
            <BiArrowBack />
          </button>

          <button
            className="modal-close-register"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <RxCross1 />
          </button>
        </div>

        <div className="register-logo">
          <img src={logo} alt="Huellitas" />
        </div>
        <hr />
        <h2 className="register-title">REGISTRO DE VETERINARIA</h2>

        <a
          className="register-small-links"
          onClick={() => {
            handleClose();
            openLogin?.();
          }}
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </a>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          {/*Campo de imagen */}
          <div className="register-profile-image-container">
            <ImageLoader id="image" onImageChange={setProfileImage} />
          </div>

          <div className="register-input-group">
            <label htmlFor="nameVet">Nombre de la veterinaria</label>
            <InputComponent
              type="text"
              id="nameVet"
              placeholder="Nombre"
              onChange={(e) => {
                e.target.value = e.target.value.replace(
                  /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                  ""
                );
              }}
              {...register("nameVet", {
                required: "El nombre es obligatorio",
              })}
              className="register-input"
            />
            {errors.nameVet && (
              <span className="form-error">{errors.nameVet.message}</span>
            )}
          </div>

          {/*Campo para el Correo */}
          <div className="register-input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <InputComponent
              type="email"
              id="email"
              placeholder="Correo Electrónico"
              {...register("email", {
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

          {/*Campo para la contraseña */}
          <div className="register-input-group">
            <label htmlFor="password">Contraseña</label>
            <PasswordInput
              id="password"
              placeholder="Ingresa tu contraseña"
              {...register("password", {
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

          {/*Campo para la ubicacion */}
          <div className="register-input-group">
            <label htmlFor="locationVet">Ubicación</label>
            <InputComponent
              type="text"
              id="locationVet"
              placeholder="Ubicación de la veterinaria"
              {...register("locationVet", {
                required: "La ubicación es obligatoria",
              })}
              className="register-input"
            />
            {errors.locationVet && (
              <span className="form-error">{errors.locationVet.message}</span>
            )}
          </div>

          {/*Campo para el ingreso del nit */}
          <div className="register-input-group">
            <label htmlFor="nitVet">NIT</label>
            <InputComponent
              type="text"
              id="nitVet"
              placeholder="0614-290523-102-1"
              {...register("nitVet", {
                required: "El NIT es obligatorio",
                pattern: {
                  value: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
                  message: "El formato debe ser 0111-110111-101-1",
                },
              })}
              className="register-input"
            />
            {errors.nitVet && (
              <span className="form-error">{errors.nitVet.message}</span>
            )}
          </div>

          {/* Recuperacion de contraseña */}
          <div className="register-forgot">
            <a className="register-small-links" href="/request-code">
              ¿Olvidaste tu contraseña?
            </a>
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
  );
};

export default RegisterVetModal;
