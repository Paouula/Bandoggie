import React from 'react';
import { ChevronRight } from 'lucide-react';

const WelcomeSection = ({ userName, menuItems, role }) => {
  return (
    <div className="welcome-section">
      {/* Nombre del usuario o "Usuario" por defecto */}
      <h1 className="welcome-title">{userName || 'Usuario'}</h1>

      {/* Subtítulo de bienvenida */}
      <p className="welcome-subtitle">¡Bienvenido/a a tu perfil!</p>
      
      {/* Rol del usuario (se muestra como etiqueta con color distinto) */}
      {role && (
        <p className={`user-role role-${role.toLowerCase()}`}>
          {role === "client" && "Cliente"}
          {role === "employee" && "Empleado"}
          {role === "vet" && "Veterinario"}
        </p>
      )}

      {/* Mensajes de introducción */}
      <p className="welcome-description">
        Aquí podrás gestionar tus datos, ver tus pedidos y personalizar tus productos favoritos.
      </p>
      <p className="welcome-description">
        Gracias por confiar en nosotros para consentir a tu mejor amigo.
      </p>
      
      {/* Opciones del menú (perfil, pedidos, chat, etc) */}
      <div className="menu-options">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            {/* Parte izquierda: ícono + texto */}
            <div className="menu-item-left">
              {item.icon}
              <span className="menu-text">{item.text}</span>
            </div>
            {/* Parte derecha: solo flechita (se quitó el badge) */}
            <div className="menu-item-right">
              {item.hasArrow && <ChevronRight className="menu-arrow" size={16} />}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        /* Contenedor principal */
        .welcome-section { 
          flex: 1; 
          width: auto; 
          max-width: none; 
          background: rgba(255,255,255,0.95); 
          border-radius: 20px; 
          padding: 30px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
          backdrop-filter: blur(10px); 
        }
        
        /* Título de bienvenida */
        .welcome-title {
          font-size: 28px;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 8px;
        }
        
        /* Subtítulo (naranja) */
        .welcome-subtitle {
          font-size: 16px;
          color: #F5A02D;
          font-weight: 600;
          margin-bottom: 10px;
        }

        /* Etiqueta con el rol del usuario */
        .user-role {
          font-size: 16px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 20px;
        }
        
        /* Colores distintos según el rol */
        .role-client {
          background: #dbeafe;
          color: #2563eb;
        }
        
        .role-employee {
          background: #dcfce7;
          color: #16a34a;
        }
        
        .role-vet {
          background: #fee2e2;
          color: #dc2626;
        }

        /* Texto descriptivo */
        .welcome-description {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        
        /* Lista de opciones del menú */
        .menu-options {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        /* Cada opción del menú */
        .menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #ECF2F9;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(245, 160, 45, 0.1);
        }
        
        /* Efecto al pasar el mouse */
        .menu-item:hover {
          background: rgba(245, 160, 45, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 160, 45, 0.15);
        }
        
        /* Contenedor del ícono + texto */
        .menu-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        /* Ícono de cada opción */
        .menu-item-left :global(.menu-icon) {
          width: 20px;
          height: 20px;
          color: #F5A02D;
        }
        
        /* Texto de la opción */
        .menu-text {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
        }
        
        /* Parte derecha: solo flechita (badge eliminado) */
        .menu-item-right {
          display: flex;
          align-items: center;
        }
        
        /* Flecha */
        .menu-arrow {
          color: #94A3B8;
          transition: transform 0.3s ease;
        }
        
        /* Flecha se mueve un poquito a la derecha en hover */
        .menu-item:hover .menu-arrow {
          transform: translateX(4px);
        }
        
        /* Ajustes en pantallas pequeñas */
        @media (max-width: 640px) {
          .welcome-section {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeSection;
