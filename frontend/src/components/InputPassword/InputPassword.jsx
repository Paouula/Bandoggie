// Ejemplo de InputComponent para contraseña
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./InputPassword.css"; 

const PasswordInput = ({ register, error, ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <div className="input-pass-group">
        <input
        type={show ? "text" : "password"}
        {...register}
        {...props}
        style={{ fontFamily: "'Baloo Bhaijaan 2', Arial, sans-serif" }}
      />
      <button
        type="button"
        className="eye-toggle-btn"
        tabIndex={-1}
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {show ? (
          <FiEyeOff className="eye-icon" />
        ) : (
          <FiEye className="eye-icon" />
        )}
      </button>
      </div>
      {error && <span style={{ color: "red" }}>Este campo es obligatorio</span>}
    </div>
  );
};

export default PasswordInput;