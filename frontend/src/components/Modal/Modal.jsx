import React, { useRef } from "react";
import "./Modal.css";
import { RxCross1 } from "react-icons/rx";

const Modal = ({ title, children, onClose, className = "", actions }) => {
  const modalRef = useRef(null);

  //Función para manejar el cierre del modal con animación
  const handleClose = () => {
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");

      // Espera a que termine la animación antes de desmontar
      const handleAnimationEnd = () => {
        modalRef.current.removeEventListener("animationend", handleAnimationEnd);
        onClose();
      };

      modalRef.current.addEventListener("animationend", handleAnimationEnd);
    }
  };

  return (
    <div className="modal-overlay-generic">
      <div ref={modalRef} className={`modal-container-generic ${className}`}>
        <div className="modal-body-generic">
          <button className="modal-close-generic" onClick={handleClose}>
            <RxCross1 />
          </button>

          {title && <h2 className="modal-title-generic">{title}</h2>}

          <div className="modal-content-generic">{children}</div>

          {actions && <div className="modal-actions-generic">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
