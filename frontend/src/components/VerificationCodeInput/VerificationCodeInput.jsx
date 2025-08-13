import React, { useRef, useState } from "react";
import "./VerificationCodeInput.css";

const VerificationCodeInput = ({ length = 6, onChange }) => {
  const [values, setValues] = useState(Array(length).fill("")); // Array de caracteres individuales del código
  const inputs = useRef([]); // Referencias a cada input para controlar el foco

  // Se ejecuta al escribir en un input individual
  const handleInput = (e, idx) => {
    // Limpia el valor ingresado: solo alfanumérico, en mayúsculas, y limita a 1 carácter
    const raw = e.target.value;
    const clean = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 1); 

    // Actualiza el array con el nuevo carácter
    const newValues = [...values];
    newValues[idx] = clean;
    setValues(newValues);

    if (onChange) onChange(newValues.join("")); // Envía el código completo como string

    // Si el input tiene valor y no es el último, mueve el foco al siguiente automáticamente
    if (clean && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  // Se ejecuta cuando se presiona una tecla (ej. Backspace)
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        // Si el input tiene valor, lo borra
        const newValues = [...values];
        newValues[idx] = "";
        setValues(newValues);
        if (onChange) onChange(newValues.join(""));
      } else if (idx > 0) {
        // Si está vacío, se mueve al input anterior
        inputs.current[idx - 1].focus();
      }
    }
  };

  // Permite pegar un código completo desde el portapapeles (como "AB12CD")
  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, length); // Solo agarra los primeros `length` caracteres válidos

    if (paste) {
      const newValues = paste
        .split("")
        .concat(Array(length).fill("")) // Asegura que tenga la longitud correcta
        .slice(0, length);              // Recorta cualquier exceso
      setValues(newValues);
      if (onChange) onChange(newValues.join(""));

      // Enfoca el input correspondiente tras pegar
      setTimeout(() => {
        const nextIdx = paste.length >= length ? length - 1 : paste.length;
        if (inputs.current[nextIdx]) inputs.current[nextIdx].focus();
      }, 0);
    }

    e.preventDefault(); // Evita que el navegador pegue directamente en un solo input
  };

  return (
    <div className="vc-container">
      <div className="vc-title">Código</div>
      <div className="vc-inputs">
        {Array.from({ length }).map((_, idx) => (
          <div className="vc-box" key={idx}>
            <input
              ref={(el) => (inputs.current[idx] = el)} // Registra la referencia del input
              type="text"
              maxLength={1}
              value={values[idx]}
              className="vc-input"
              onChange={(e) => handleInput(e, idx)} // Maneja la entrada individual
              onKeyDown={(e) => handleKeyDown(e, idx)} // Backspace y navegación
              onPaste={handlePaste} // Permite pegar múltiples caracteres
              autoFocus={idx === 0} // Solo el primer input tiene foco inicial
              tabIndex={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationCodeInput;
