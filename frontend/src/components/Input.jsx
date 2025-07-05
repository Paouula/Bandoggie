import React from 'react';


const InputComponent = ({ type, id, placeholder, register, ...props }) => {
    return (
        <div className="input-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register}
                {...props}
            />
        </div>
    );
};

export default InputComponent;