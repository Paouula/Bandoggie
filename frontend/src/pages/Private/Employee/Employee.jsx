// src/pages/EmployeesInterface.jsx
import React from 'react';
import './Employee.css';
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png';
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import ListEmployees from '../../../components/Employees/ListEmployees';
import BannerPrivate from '../../../components/BannerPrivate/BannerPrivate.jsx';

const EmployeesInterface = () => {
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
        {/*El banner principal de la página*/}
    <BannerPrivate
        title="Empleados"
        subtitle="Listado de los empleados registrados"
        mainImage={EquipoEmp}
      />

      <LineaDivisora />

        {/*Busqueda y botón de agregar*/}
      <div className="employees-container">
        <Tooltip title="Añadir un nuevo empleado" placement="bottom">
          <button className='addEmp'>
            <AddIcon style={{ marginRight: '5px' }} /> Agregar
          </button>
        </Tooltip>

        {/* Aquí se muestra la lista de empleados */}
        <ListEmployees employees={employees} />

        <div className="pagination">
          <a href="#" className="pagination-link">Anterior</a>
          <span className="pagination-separator">/</span>
          <a href="#" className="pagination-link">Siguiente</a>
        </div>

      </div>
    </>
  );
};

export default EmployeesInterface;
