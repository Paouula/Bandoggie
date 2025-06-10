import React from 'react';

const ButtonComponent = ({ type, children }) => {
    return (
        <button type={type}>
            {children}
        </button>
    );
};

export default ButtonComponent;