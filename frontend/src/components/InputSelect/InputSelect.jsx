import React from "react";
import "./InputSelect.css";

const SelectComponent = ({
  id,
  options = [],
  register = {},
  className = "",
  value,
  onChange,
  defaultOptionLabel = "Selecciona una opción",
  ...props
}) => {
  return (
    <div className="input-group">
      <select
        id={id}
        className={`custom-select ${className}`}
        value={value}
        onChange={onChange}
        {...register}
        {...props}
      >
        <option value="" disabled hidden>
          {defaultOptionLabel}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
