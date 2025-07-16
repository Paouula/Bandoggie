import React from 'react';
import './CardEmployee.css';
import EditButton from '../../EditButton.jsx';
import DeleteButton from '../../DeleteButton.jsx';

const CardEmployee = ({ employee, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(employee);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(employee._id);
    }
  };

  return (
    <div className="employee-card">
      <div className="employee-avatar">
        <img 
          src={employee.avatar || `https://ui-avatars.com/api/?name=${employee.name}+${employee.lastName}&background=3b82f6&color=ffffff&size=150`} 
          alt={`${employee.name} ${employee.lastName}`}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${employee.name}+${employee.lastName}&background=3b82f6&color=ffffff&size=150`;
          }}
        />
        <h3 className="employee-name">{employee.name} {employee.lastName}</h3>
        <span className="employee-role">Empleado</span>
      </div>
      
      <div className="employee-details">
        <div className="employee-row">
          <span className="label">Nombre:</span>
          <span className="value">{employee.name} {employee.lastName}</span>
        </div>
        <div className="employee-row">
          <span className="label">Correo:</span>
          <span className="value">{employee.email}</span>
        </div>
        <div className="employee-row">
          <span className="label">Teléfono:</span>
          <span className="value">{employee.telephone}</span>
        </div>
        <div className="employee-row">
          <span className="label">Fecha Nac.:</span>
          <span className="value">{formatDate(employee.birthdate)}</span>
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
          <span className="value">{formatDate(employee.hireDate)}</span>
        </div>
        <div className="employee-row">
          <span className="label">DUI:</span>
          <span className="value">{employee.dui}</span>
        </div>
        <div className="employee-row">
          <span className="label">ISSS:</span>
          <span className="value">{employee.isssNumber}</span>
        </div>
      </div>
      
      <div className="employee-actions">
        <EditButton 
          title="Editar datos del empleado" 
          onClick={handleEdit}
        />
        <DeleteButton 
          title="Eliminar el registro del empleado"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default CardEmployee;