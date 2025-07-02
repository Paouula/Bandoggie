import React from 'react';
import './Employee.css';
import PawYellow from '../../../img/Empleados/PawYellow.png'
import PawPink from '../../../img/Empleados/PawPink.png'
import PawBlue from '../../../img/Empleados/PawBlue.png'
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png'
import LineaDivisora from '../../../components/LineaDivisora.jsx';
import SearchC from '../../../components/Search/Search.jsx';



function Employee() {
    return (
        <>
            <section className="employees-section">
                  <div class="floating-circle-1"></div>
                    <div class="floating-circle-2"></div>
                    <div class="floating-circle-3"></div>
                    <div class="floating-circle-4"></div>
                    <div class="floating-circle-5"></div>
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

            <SearchC />
               
        </>
    )
}

export default Employee;