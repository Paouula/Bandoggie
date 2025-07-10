import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import DatePickerComponent from "./DatePicker";
import "./InputDataPicker.css";

const DatePickerInput = ({
  label = "Selecciona una fecha",
  value,       // valor controlado desde afuera (react-hook-form)
  onChange,    // función para actualizar valor controlado
  onBlur,
  name,
  error,
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(null); // estado interno para uso no controlado

  // Sincronizar estado interno si el valor controlado cambia (modo controlado)
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value ? new Date(value) : null);
    }
  }, [value]);

  // Mostrar la fecha formateada
  const currentDate = value !== undefined ? (value ? new Date(value) : null) : internalValue;
  const displayDate =
    currentDate instanceof Date && !isNaN(currentDate)
      ? currentDate.toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  // Función para manejar cambio de fecha
  const handleChange = (date) => {
    if (onChange) {
      onChange(date);
    } else {
      setInternalValue(date);
    }
    setOpen(false);
  };

  return (
    <div className="input-group">
      <div className="input-date-group">
        <input
          type="text"
          className={`input-date-trigger ${error ? "input-error" : ""}`}
          value={displayDate}
          readOnly
          onClick={() => setOpen(true)}
          placeholder={label}
          onBlur={onBlur}
          name={name}
        />

        <button
          type="button"
          className="calendar-toggle-btn"
          onClick={() => setOpen(true)}
        >
          <FiCalendar className="calendar-icon" />
        </button>

        <DatePickerComponent
          value={currentDate}
          onChange={handleChange}
          open={open}
          onClose={() => setOpen(false)}
          label={label}
        />
      </div>
      
    </div>
  );
};

export default DatePickerInput;
