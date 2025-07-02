import React from 'react';
import './Employee.css';
import PawYellow from '../../../img/Empleados/PawYellow.png'
import PawPink from '../../../img/Empleados/PawPink.png'
import PawBlue from '../../../img/Empleados/PawBlue.png'
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png'
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import SearchC from '../../../components/Search/Search.jsx';
import Tooltip from '@mui/material/Tooltip';
//imports de los icons
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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


  const EmployeeCard = ({ employee }) => (
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
          <span className="label">Contratada:</span>
          <span className="value">{employee.hired}</span>
        </div>
        <div className="employee-row">
          <span className="label">DUI:</span>
          <span className="value">{employee.dui}</span>
        </div>
      </div>
      <div className="employee-actions">
        <button className="action-btn edit-btn">
          <EditIcon size={16} />
        </button>
        <button className="action-btn delete-btn">
          <DeleteIcon size={16} />
        </button>
      </div>
    </div>
  );

    return (
        <>
        {/*Header principal de la página*/}
            <section className="employees-section">
                  <div className="floating-circle-1"></div>
                    <div className="floating-circle-2"></div>
                    <div className="floating-circle-3"></div>
                    <div className="floating-circle-4"></div>
                    <div className="floating-circle-5"></div>
                <div className="container-emp">
                    <div className="left-side">
                        <div className="paw-icons">
                            <div className="paw-circle yellow">
                                <img src={PawYellow} alt="Paw Icon" className="paw-icon" />
                            </div>
                            <div className="paw-circle pink">
                                <img src={PawPink} alt="Paw Icon" className="paw-icon" />
                            </div>
                            <div className="paw-circle blue">
                                <img src={PawBlue} alt="Paw Icon" className="paw-icon" />
                            </div>
                        </div>
                        <div className="main-image">
                            <img src={EquipoEmp} alt="Equipo trabajando" />
                        </div>
                    </div>
                    
                    <div className="right-side">
                        <h1 className="title-emp">Empleados</h1>
                        <p className="header-emp">¿Qué deseas hacer hoy?</p>
                    </div>
                </div>
            </section>
            <LineaDivisora />

            {/*<SearchC />*/}

        {/*Botón y busqueda*/}
        <div className="employees-container">
            <Tooltip title="Añadir un nuevo empleado" placement="bottom">
            <button className='addEmp'> <AddIcon style={{ marginRight: '5px' }} /> Agregar
        </button>
        </Tooltip>

        {/* Lista de los empleados */}
        <div className="employees-list">
        {employees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      <div className="pagination">
        <a href="#" className="pagination-link">Anterior</a>
        <span className="pagination-separator">/</span>
        <a href="#" className="pagination-link">Siguiente</a>
      </div>
      </div>
               
        </>
    )
}

export default EmployeesInterface;