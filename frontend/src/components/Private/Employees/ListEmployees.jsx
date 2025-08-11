import React from "react";
import CardEmployee from "../Employees/CardEmployee/CardEmployee.jsx";

const ListEmployees = ({ employees = [], onEdit, onDelete, currentUserEmail }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-employees">
        <div className="empty-icon">👥</div>
        <h3>No hay empleados registrados</h3>
        <p>Agrega tu primer empleado haciendo clic en el botón "Agregar"</p>
      </div>
    );
  }

  return (
    <div className="employees-list">
      <div className="employees-grid">
        {employees.map((employee) => (
          <CardEmployee
            key={employee._id}
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
            currentUserEmail={currentUserEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default ListEmployees;
