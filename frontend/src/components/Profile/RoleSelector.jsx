import React from 'react';

// Componente que permite seleccionar uno de los roles
// Recibe dos props:
// currentRole: el rol actualmente seleccionado
// onRoleChange: función que se ejecuta cuando el usuario selecciona un rol distinto
const RoleSelector = ({ currentRole, onRoleChange }) => {
  return (
    <div className="role-selector">
      {/* Mapear los roles disponibles (client, employee y vet) */}
      {['client', 'employee', 'vet'].map(role => (
        <button 
          key={role} // clave única 
          // Agregamos la clase "active" si el rol actual es igual al rol del botón
          className={`role-button ${currentRole === role ? 'active' : ''}`} 
          // Al hacer clic se llama a la función onRoleChange con el rol seleccionado
          onClick={() => onRoleChange(role)}
        >
          {/* Mostrar el texto dependiendo del rol */}
          {role === 'client' 
            ? 'Cliente' 
            : role === 'employee' 
            ? 'Empleado' 
            : 'Veterinaria'}
        </button>
      ))}
      
      {/* Estilos en línea con JSX */}
      <style jsx>{`
        /* Contenedor de los botones de rol */
        .role-selector { 
          display: flex; 
          justify-content: center; 
          gap: 10px; 
          margin-bottom: 20px; 
          flex-wrap: wrap; /* Permite que los botones se ajusten en pantallas pequeñas */
        }

        /* Estilo base de cada botón */
        .role-button { 
          padding: 8px 16px; 
          border: 1px solid #aaa; 
          background: #fff; 
          color: #333; 
          border-radius: 8px; 
          cursor: pointer; 
          font-size: 14px; 
          transition: background 0.2s, color 0.2s, border 0.2s; /* Animación suave */
        }

        /* Cambio visual al pasar el mouse */
        .role-button:hover {
          background: #f2f2f2;
        }

        /* Estilo del botón activo */
        .role-button.active { 
          background: #333; 
          color: #fff; 
          border-color: #333;
        }

        /* Ajustes para pantallas pequeñas */
        @media (max-width: 640px) {
          .role-button {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default RoleSelector;
