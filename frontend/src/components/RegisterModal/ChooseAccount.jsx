import React, { useRef } from "react";
import "../../assets/styles/Choose.css";
import logo from "../../img/LogoBandoggie.png";

const ChooseAccountTypeModal = ({
  onClose,
  openLogin,
  openRegisterUser,
  openRegisterVet,
}) => {
  const modalRef = useRef(); // Referencia al contenedor para aplicar animación de salida

  // Agrega clase de salida y cierra el modal después de una breve espera (sincronizado con animación)
  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose(); // Llama al cierre desde el padre
      }, 250);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="choose-container modal-content" ref={modalRef}>
        <button className="modal-close" onClick={handleClose}>×</button>

        <div className="choose-logo">
          <img src={logo} alt="Huellitas" />
        </div>

        <hr />
        <h2 className="choose-title">¿Qué tipo de cuenta deseas crear?</h2>

        <div className="choose-options">
          {/* Opción para registrar un cliente normal */}
          <div
            className="choose-card"
            onClick={() => {
              openRegisterUser();
              handleClose(); // Cierra el modal tras elegir
            }}
          >
            <h3>Usuario Normal</h3>
            <p>Compra productos personalizados a tu gusto</p>
          </div>

          {/* Opción para registrar como veterinaria */}
          <div
            className="choose-card"
            onClick={() => {
              openRegisterVet();
              handleClose();
            }}
          >
            <h3>Veterinaria</h3>
            <p>Compra productos al por mayor para tu negocio</p>
          </div>
        </div>

        {/* Acceso a la vista de login si ya tiene cuenta */}
        <div className="choose-footer">
          <p
            className="small-link"
            onClick={() => {
              openLogin?.(); // Solo si está definido
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </p>
        </div>

        <div className="choose-decoration"></div>
      </div>
    </div>
  );
};

export default ChooseAccountTypeModal;
