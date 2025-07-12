import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./InputPassword.css"; 

const PasswordInput = ({ register, error, className = "", ...props }) => {
  const [show, setShow] = useState(false);

  const handleLimit = (e, idx) => {
    const max = e.target.value.slice(0, 30)

    e.target.value = max;
  }

  return (
    <div className="input-group">
      <div className="input-pass-group input-font">
        <input
          type={show ? "text" : "password"}
          onInput={handleLimit}
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
