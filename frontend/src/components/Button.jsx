import React from 'react';
import "../assets/styles/Login.css";

const ButtonComponent = ({ type, children }) => {
    return (
        <button type={type}>
            {children}
        </button>
    );
};

export default ButtonComponent;