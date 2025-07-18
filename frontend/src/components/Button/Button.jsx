import React from 'react';
import "./Button.css";

// Botón reutilizable que acepta tipo, clases adicionales y contenido dinámico
const ButtonComponent = ({ type = "button", children, className = "" }) => {
  return (
    <button 
      type={type} // Por defecto es un botón normal; se puede usar "submit" en formularios
      className={`custom-button ${className}`} // Aplica la clase base + cualquier clase personalizada
    >
      {children} {/* Muestra el contenido dentro del botón (puede ser texto, íconos, etc.) */}
    </button>
  );
};

export default ButtonComponent;
