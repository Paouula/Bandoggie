import React from 'react';
import './Employee.css';
import PawYellow from '../../../img/Empleados/PawYellow.png'
import PawPink from '../../../img/Empleados/PawPink.png'
import PawBlue from '../../../img/Empleados/PawBlue.png'
import EquipoEmp from '../../../img/Empleados/EquipoEmp.png'
import LineaDivisora from '../../../components/LineaDivisora.jsx'; 


function Employee() {
    return ( 
      <>
      <section class="empleados-section">
        <div class="container">
            <div class="left-side">
                <div class="paw-icons">
                    <div class="paw-circle yellow">
                        <img src={PawYellow} alt="Paw Icon" class="paw-icon" />
                    </div>
                    <div class="paw-circle pink">
                        <img src={PawPink} alt="Paw Icon" class="paw-icon" />
                    </div>
                    <div class="paw-circle blue">
                        <img src={PawBlue} alt="Paw Icon" class="paw-icon" />
                    </div>
                </div>
                <div class="main-image">
                    <img src={EquipoEmp} alt="Equipo trabajando" />
                </div>
            </div>
            
            <div class="right-side">
                <h1 class="title-emp">Empleados</h1>
            </div>
        </div>
        <LineaDivisora />
    </section>
          </>
  )
}

export default Employee;