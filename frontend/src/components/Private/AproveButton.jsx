import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from "@mui/material";

// Recibe el mensaje como prop: title, onClick, y selected para el estado
function AproveButton({ 
  title = "Aprobar reseña", 
  onClick = () => {}, 
  selected = false 
}) {
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    width: "43px",
    height: "43px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: selected ? "#2e6b7a" : "#4a90a4",
    color: "white",
    transition: "all 0.3s ease",
    transform: hovered ? "scale(1.1)" : "scale(1)",
    boxShadow: selected 
      ? "0 0 0 3px rgba(78, 144, 164, 0.3)" 
      : hovered 
        ? "0 4px 12px rgba(0, 0, 0, 0.2)" 
        : "none",
  };

  return (
    <Tooltip title={title} placement="bottom">
      <button
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <CheckIcon fontSize="small" />
      </button>
    </Tooltip>
  );
}

export default AproveButton;