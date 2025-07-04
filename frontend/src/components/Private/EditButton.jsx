import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from "@mui/material";

function DeleteButton({ title = "Eliminar empleado" }) {
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
  };

  return (
    <Tooltip title={title} placement="bottom">
      <button
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <EditIcon size={14} />
      </button>
    </Tooltip>
  );
}

export default DeleteButton;
