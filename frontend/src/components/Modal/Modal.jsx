import React, { useRef, useState } from "react";
import "./Modal.css";
import { RxCross1 } from "react-icons/rx";

const Modal = ({ 
  title, 
  subtitle, 
  children, 
  onClose, 
  className = "", 
  actions,
  isSubmitting = false 
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  // Función para manejar el cierre del modal con animación
  const handleClose = () => {
    if (isSubmitting) return; // Prevenir cierre durante submit
    
    setIsClosing(true);
    
    // Agregar clase fade-out al overlay y modal
    if (overlayRef.current) {
      overlayRef.current.classList.add("fade-out");
    }
    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
    }

    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      onClose();
    }, 300); // Duración de la animación (0.3s)
  };

  // Manejar click en overlay para cerrar
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      ref={overlayRef}
      className={`modal-overlay-generic ${isClosing ? "fade-out" : ""}`}
      onClick={handleOverlayClick}
    >
      <div 
        ref={modalRef} 
        className={`modal-container-generic ${className} ${isClosing ? "fade-out" : ""}`}
      >
        {/* Close Button */}
        <button 
          className="modal-close-generic" 
          onClick={handleClose}
          disabled={isSubmitting}
        >
          <RxCross1 />
        </button>

        {/* Header */}
        {(title || subtitle) && (
          <div className="modal-header-generic">
            {title && <h2 className="modal-title-generic">{title}</h2>}
            {subtitle && <p className="modal-subtitle-generic">{subtitle}</p>}
          </div>
        )}

        {/* Content */}
        <div className="modal-content-generic">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="modal-actions-generic">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;