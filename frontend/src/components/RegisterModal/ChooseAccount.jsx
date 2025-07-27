import React, { useRef } from "react";
import "../../assets/styles/Choose.css";
import logo from "../../img/LogoBandoggie.png";
import { RxCross1 } from "react-icons/rx";


const ChooseAccountTypeModal = ({
  onClose,
  openLogin,
  openRegisterUser,
  openRegisterVet,
}) => {
  const modalRef = useRef();

  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
      setTimeout(() => {
        onClose?.();
      }, 250);
    }
  };

  return (
    <div className="modal-overlay-choose">
      <div className="choose-container modal-content-choose" ref={modalRef}>
        {/* Botón de cierre con clase personalizada */}
        <button className="modal-close-choose" onClick={handleClose}>
          <RxCross1 />
        </button>

        <div className="choose-logo">
          <img src={logo} alt="Huellitas" />
        </div>

        <hr />
        <h2 className="choose-title">¿Qué tipo de cuenta deseas crear?</h2>

        <div className="choose-options">
          <div
            className="choose-card"
            onClick={() => {
              openRegisterUser();
              handleClose();
            }}
          >
            <h3>Usuario Normal</h3>
            <p>Compra productos personalizados a tu gusto</p>
          </div>

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

        <div className="choose-footer">
          <p
            className="small-link"
            onClick={() => {
              openLogin?.();
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
