import React, { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from "@mui/material";

function AproveButton({ 
  title = "Aprobar reseña", 
  onClick = () => {}, 
  selected = false 
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Tooltip title={title} placement="bottom">
        <button
          className={` check-btn ${selected ? 'selected' : ''}`}
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <CheckIcon fontSize="small" />
        </button>
      </Tooltip>

      <style jsx>{`
        .check-btn {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color:rgb(97, 150, 164);
          color: white;
        }

        .check-btn.selected {
          background-color: #2e6b7a;
          box-shadow: 0 0 0 3px rgba(78, 144, 164, 0.3);
        }

        .check-btn:hover {
          background-color: #357a8a;
          box-shadow: 0 5px 15px rgba(74, 144, 164, 0.3);
        }
      `}</style>
    </>
  );
}

export default AproveButton;
