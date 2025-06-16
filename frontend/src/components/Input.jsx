import React from 'react';


const InputComponent = ({ type, id, placeholder, register }) => {
    return (
        <div className="input-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register}
            />
        </div>
    );
};

export default InputComponent;