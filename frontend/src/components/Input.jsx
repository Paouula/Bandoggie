import React from 'react';


const InputComponent = ({ type, id, placeholder, register, icon }) => {
    return (
        <div className="input-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register}
            />
            <span className="icon">{icon}</span>
        </div>
    );
};

export default InputComponent;