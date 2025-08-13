import React, { useState } from "react";
import "../../assets/styles/AproveButton.css";
import CheckIcon from "@mui/icons-material/Check";
import { Tooltip } from "@mui/material";

function AproveButton({ title = "Aprobar reseña", onClick = () => {}, selected = false }) {
  return (
    <Tooltip title={title} placement="bottom">
      <button
        className={`check-btn ${selected ? "selected" : ""}`}
        onClick={onClick}
      >
        <CheckIcon fontSize="small" />
      </button>
    </Tooltip>
  );
}

export default AproveButton;
