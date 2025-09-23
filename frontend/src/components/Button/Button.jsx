import React from 'react';
import "./Button.css";
import classNames from 'classnames';

// Botón reutilizable que acepta tipo, clases adicionales y contenido dinámico
const ButtonComponent = ({ type = "button", error, children, className = "", onClick }) => {
  return (
    <button 
      type={type} // Por defecto es un botón normal; se puede usar "submit" en formularios
      className={classNames(className ,"custom-button", {
        "input-error": error,
      })} // Aplica la clase base + cualquier clase personalizada
      onClick={onClick} // Maneja el evento de clic
    >
      {children} {/* Muestra el contenido dentro del botón (puede ser texto, íconos, etc.) */}
    </button>
  );
};

export default ButtonComponent;
