import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add"; // este era el ícono que usabas
import { Tooltip } from "@mui/material";

function AgregarButton({ title = "Añadir un nuevo empleado" }) {
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: hovered ? "#2e8c52" : "#28a745", // cambio en hover
    color: "white",
    border: "none",
    padding: "6px 32px",
    borderRadius: "13px",
    fontSize: "16px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontFamily: "'Inria Sans', sans-serif",
    marginLeft: "88%",
    marginBottom: "2%",
    boxShadow: hovered ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
  };

  return (
    <Tooltip title={title} placement="bottom">
      <button
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AddIcon style={{ marginRight: "5px" }} />
        Agregar
      </button>
    </Tooltip>
  );
}

export default AgregarButton;
