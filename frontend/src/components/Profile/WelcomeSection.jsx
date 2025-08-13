import React from 'react';
import { ChevronRight } from 'lucide-react';

const WelcomeSection = ({ userName, menuItems }) => {
  return (
    <div className="welcome-section">
      <h1 className="welcome-title">{userName || 'Usuario'}</h1>
      <p className="welcome-subtitle">¡Bienvenido/a a tu perfil!</p>
      <p className="welcome-description">
        Aquí podrás gestionar tus datos, ver tus pedidos y personalizar tus productos favoritos.
      </p>
      <p className="welcome-description">
        Gracias por confiar en nosotros para consentir a tu mejor amigo.
      </p>
      
      <div className="menu-options">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-left">
              {item.icon}
              <span className="menu-text">{item.text}</span>
            </div>
            <div className="menu-item-right">
              {item.badge && <span className="menu-badge">{item.badge}</span>}
              {item.hasArrow && <ChevronRight className="menu-arrow" size={16} />}
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
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
        
        .welcome-title {
          font-size: 28px;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 8px;
        }
        
        .welcome-subtitle {
          font-size: 16px;
          color: #F5A02D;
          font-weight: 600;
          margin-bottom: 20px;
        }
        
        .welcome-description {
          font-size: 14px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 10px;
        }
        
        .menu-options {
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
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
        
        .menu-item:hover {
          background: rgba(245, 160, 45, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(245, 160, 45, 0.15);
        }
        
        .menu-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .menu-item-left :global(.menu-icon) {
          width: 20px;
          height: 20px;
          color: #F5A02D;
        }
        
        .menu-text {
          font-size: 14px;
          font-weight: 500;
          color: #334155;
        }
        
        .menu-item-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .menu-badge {
          background: #F5A02D;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          min-width: 20px;
          text-align: center;
        }
        
        .menu-arrow {
          color: #94A3B8;
          transition: transform 0.3s ease;
        }
        
        .menu-item:hover .menu-arrow {
          transform: translateX(4px);
        }
        
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