import React from "react";
import "../../assets/styles/Choose.css";
import logo from "../../img/LogoBandoggie.png";

const ChooseAccountTypeModal = ({
  onClose,
  openLogin,
  openRegisterUser,
  openRegisterVet,
}) => {
  return (
    <div className="modal-overlay">
      <div className="choose-container modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
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
              onClose?.();        // Cierra este modal
              openRegisterUser(); // Abre modal de usuario normal
            }}
          >
            <h3>Usuario Normal</h3>
            <p>Compra productos personalizados a tu gusto</p>
          </div>

          <div
            className="choose-card"
            onClick={() => {
              onClose?.();       // Cierra este modal
              openRegisterVet(); // Abre modal de veterinaria
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
              onClose?.();
              openLogin?.();
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
