import React, { useRef, useState } from "react";
import "./VerificationCodeInput.css";

const VerificationCodeInput = ({ length = 6, onChange }) => {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleInput = (e, idx) => {
    const raw = e.target.value;
    const clean = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 1); // solo el primer carácter válido

    const newValues = [...values];
    newValues[idx] = clean;
    setValues(newValues);

    if (onChange) onChange(newValues.join(""));

    if (clean && idx < length - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (values[idx]) {
        const newValues = [...values];
        newValues[idx] = "";
        setValues(newValues);
        if (onChange) onChange(newValues.join(""));
      } else if (idx > 0) {
        inputs.current[idx - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, length);

    if (paste) {
      const newValues = paste
        .split("")
        .concat(Array(length).fill(""))
        .slice(0, length);
      setValues(newValues);
      if (onChange) onChange(newValues.join(""));
      setTimeout(() => {
        const nextIdx = paste.length >= length ? length - 1 : paste.length;
        if (inputs.current[nextIdx]) inputs.current[nextIdx].focus();
      }, 0);
    }

    e.preventDefault();
  };

  return (
    <div className="vc-container">
      <div className="vc-title">Código</div>
      <div className="vc-inputs">
        {Array.from({ length }).map((_, idx) => (
          <div className="vc-box" key={idx}>
            <input
              ref={(el) => (inputs.current[idx] = el)}
              type="text"
              maxLength={1}
              value={values[idx]}
              className="vc-input"
              onChange={(e) => handleInput(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              autoFocus={idx === 0}
              tabIndex={0}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationCodeInput;
