import React from 'react';
import "./Button.css"; 

const ButtonComponent = ({ type = "button", children, className = "" }) => {
    return (
        <button type={type} className={`custom-button ${className}`}>
            {children}
        </button>
    );
};

export default ButtonComponent;
