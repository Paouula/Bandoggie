import React from 'react';
import "./Input.css"; 


const InputComponent = ({ type, id, placeholder, error, register = {}, className = "", ...props }) => { //En esta parte el componente recibe varios props para su uso
    return (
        <div className="input-group">
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={classNames(className ,"custom-input", {
                    "input-error": error,
                  })}
                {...register}
                {...props}
            />
        </div>
        //Retorna el input con sus respectivos atributos y clases, teniendo en cuenta que se pueden pasar más props si es necesario
        //Ademas de tener un diseño personalizado 
    );
};

export default InputComponent;
    