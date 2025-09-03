import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from "@mui/material";

function EditButton({ title = "Editar", onClick }) {
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
    backgroundColor: "#ff9500",
    color: "white",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    transform: hovered ? "scale(1.1)" : "scale(1)",
    boxShadow: hovered ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
    zIndex: 1000, // Asegurar que esté por encima
  };

  return (
    <Tooltip title={title} placement="bottom">
      <button
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <EditIcon fontSize="small" />
      </button>
    </Tooltip>
  );
}

export default EditButton;