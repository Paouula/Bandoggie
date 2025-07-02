// src/components/Employees/CardEmployee.jsx
import React from 'react';
import './CardEmployee.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const CardEmployee = ({ employee }) => (
  <div className="employee-card">
    <div className="employee-avatar">
      <img src={employee.avatar} alt={employee.name} />
      <h3 className="employee-name">{employee.name}</h3>
      <span className="employee-role">{employee.role}</span>
    </div>
    <div className="employee-details">
      <div className="employee-row">
        <span className="label">Nombre:</span>
        <span className="value">{employee.name}</span>
      </div>
      <div className="employee-row">
        <span className="label">Correo:</span>
        <span className="value">{employee.email}</span>
      </div>
      <div className="employee-row">
        <span className="label">Teléfono:</span>
        <span className="value">{employee.phone}</span>
      </div>
      <div className="employee-row">
        <span className="label">Fecha d...:</span>
        <span className="value">{employee.date}</span>
      </div>
    </div>
    <div className="employee-details-right">
      <div className="employee-row">
        <span className="label">Dirección:</span>
        <span className="value">{employee.address}</span>
      </div>
      <div className="employee-row">
        <span className="label">Contraseña:</span>
        <span className="value">............</span>
      </div>
      <div className="employee-row">
        <span className="label">Trabaja desde:</span>
        <span className="value">{employee.hired}</span>
      </div>
      <div className="employee-row">
        <span className="label">DUI:</span>
        <span className="value">{employee.dui}</span>
      </div>
    </div>
    <div className="employee-actions">
      <button className="action-btn edit-btn">
        <Tooltip title="Editar datos del empleado" placement="right">
          <EditIcon size={16} />
        </Tooltip>
      </button>
      <button className="action-btn delete-btn">
        <Tooltip title="Eliminar empleado" placement="right">
          <DeleteIcon size={16} />
        </Tooltip>
      </button>
    </div>
  </div>
);

export default CardEmployee;
