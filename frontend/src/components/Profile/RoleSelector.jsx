import React from 'react';

const RoleSelector = ({ currentRole, onRoleChange }) => {
  return (
    <div className="role-selector">
      {['client', 'employee', 'vet'].map(role => (
        <button 
          key={role} 
          className={`role-button ${currentRole === role ? 'active' : ''}`} 
          onClick={() => onRoleChange(role)}
        >
          {role === 'client' ? 'Cliente' : role === 'employee' ? 'Empleado' : 'Veterinaria'}
        </button>
      ))}
      
      <style jsx>{`
        .role-selector { 
          display: flex; 
          justify-content: center; 
          gap: 10px; 
          margin-bottom: 20px; 
          flex-wrap: wrap;
        }

        .role-button { 
          padding: 8px 16px; 
          border: 1px solid #aaa; 
          background: #fff; 
          color: #333; 
          border-radius: 8px; 
          cursor: pointer; 
          font-size: 14px; 
          transition: background 0.2s, color 0.2s, border 0.2s;
        }

        .role-button:hover {
          background: #f2f2f2;
        }

        .role-button.active { 
          background: #333; 
          color: #fff; 
          border-color: #333;
        }

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
