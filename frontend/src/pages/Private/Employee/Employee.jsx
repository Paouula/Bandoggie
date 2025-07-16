import React, { useState } from 'react';
import './Employee.css';
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png';
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import ListEmployees from '../../../components/Private/Employees/ListEmployees.jsx';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import AgregarButton from '../../../components/Private/AgregarButton.jsx';
import Paginacion from '../../../components/Paginacion.jsx';
import RegisterEmployee from '../../../components/Private/Employees/RegisterEmployees.jsx';
import useDataEmployees from '../../../components/Private/Employees/hooks/useDataEmployees.jsx';
import { Toaster } from 'react-hot-toast';

const EmployeesInterface = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const {
    employees,
    loading,
    deleteEmployee,
    fetchData
  } = useDataEmployees();

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleDeleteEmployee = async (employeeId) => {
    await deleteEmployee(employeeId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  if (loading && employees.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando empleados...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="banner-private-container">
        <BannerPrivate
          title="Empleados"
          subtitle="Listado de los empleados registrados"
          mainImage={EquipoEmp}
        />
      </div>

      <LineaDivisora />

      <div className="employees-container">
        <AgregarButton onClick={handleAddEmployee} />

        <div className="employees-stats">
          <p>Total de empleados: {employees.length}</p>
          {loading && <span className="loading-text">Actualizando...</span>}
        </div>

        <ListEmployees 
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />

        <Paginacion />
      </div>

      {modalOpen && (
        <RegisterEmployee 
          onClose={handleCloseModal}
          employeeToEdit={editingEmployee}
        />
      )}
    </>
  );
};

export default EmployeesInterface;