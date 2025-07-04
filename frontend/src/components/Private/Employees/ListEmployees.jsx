// src/components/Employees/ListEmployees.jsx
import React from 'react';
import CardEmployee from './CardEmployee';

const ListEmployees = ({ employees }) => {
  return (
    <div className="employees-list">
      {employees.map(employee => (
        <CardEmployee key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default ListEmployees;
