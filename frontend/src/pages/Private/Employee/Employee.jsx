// src/pages/EmployeesInterface.jsx
import React, { useState } from 'react';
import './Employee.css';
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png';
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import ListEmployees from '../../../components/Private/Employees/ListEmployees.jsx';
import BannerPrivate from '../../../components/Private/BannerPrivate/BannerPrivate.jsx';
import AgregarButton from '../../../components/Private/AgregarButton.jsx';
import Paginacion from '../../../components/Paginacion.jsx';
import RegisterEmployee from '../../../components/Private/Employees/RegisterEmployees.jsx';

const EmployeesInterface = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const employees = [
    {
      id: 1,
      name: "Monica Pérez",
      role: "Empleada",
      email: "monicaperez@gmail.com",
      phone: "7897-2362",
      date: "11/09/1998",
      address: "Calle 2, Avenida 9",
      hired: "12/03/2025",
      dui: "123456789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Monica Pérez",
      role: "Empleada",
      email: "monicaperez@gmail.com",
      phone: "7897-2362",
      date: "11/09/1998",
      address: "Calle 2, Avenida 9",
      hired: "12/03/2025",
      dui: "123456789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Monica Pérez",
      role: "Empleada",
      email: "monicaperez@gmail.com",
      phone: "7897-2362",
      date: "11/09/1998",
      address: "Calle 2, Avenida 9",
      hired: "12/03/2025",
      dui: "123456789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <>
      <BannerPrivate
        title="Empleados"
        subtitle="Listado de los empleados registrados"
        mainImage={EquipoEmp}
      />

      <LineaDivisora />

      <div className="employees-container">
        <AgregarButton onClick={() => setModalOpen(true)} />

        <ListEmployees employees={employees} />

        <Paginacion />
      </div>

      {/* Modal de registro */}
      {modalOpen && (
        <RegisterEmployee onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default EmployeesInterface;
