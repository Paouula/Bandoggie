import React from 'react';
import './Employee.css';
import PawEmp from '../../../img/Empleados/PawEmp.png'
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png'

function Employee() {
    return ( 
      <>
      <section class="empleados-section">
        <div class="container">
            <div class="left-side">
                <div class="paw-icons">
                    <div class="paw-circle yellow">
                        <img src={PawEmp} alt="Paw Icon" class="paw-icon" />
                    </div>
                    <div class="paw-circle pink">
                        <img src={PawEmp} alt="Paw Icon" class="paw-icon" />
                    </div>
                    <div class="paw-circle blue">
                        <img src={PawEmp} alt="Paw Icon" class="paw-icon" />
                    </div>
                </div>
                <div class="main-image">
                    <img src={EquipoEmp} alt="Equipo trabajando" />
                </div>
            </div>
            
            <div class="right-side">
                <h1 class="title">Empleados</h1>
                <div class="decorative-shapes">
                    <div class="shape-1"></div>
                    <div class="shape-2"></div>
                </div>
            </div>
        </div>
    </section>
          </>
  )
}

export default Employee;