import React from 'react';
import "./Input.css"; // Asegúrate de que esta ruta sea correcta

const InputComponent = ({ type, id, placeholder, register = {}, className = "", ...props }) => {
    return (
        <div className="input-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`custom-input ${className}`}
                {...register}
                {...props}
            />
        </div>
    );
};

export default InputComponent;
