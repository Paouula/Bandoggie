import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./InputPassword.css"; 

const PasswordInput = ({ register, error, className = "", ...props }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <div className="input-pass-group">
        <input
          type={show ? "text" : "password"}
          className={`custom-input input-login ${className}`}
          {...register}
          {...props}
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
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

export default PasswordInput;
