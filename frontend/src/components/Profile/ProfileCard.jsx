import React from 'react';
import { Camera } from 'lucide-react';

const ProfileCard = ({ userInfo, isEditing, onInputChange, onEditToggle }) => {
  const renderFormFields = () => (
    <>
      <div className="form-group">
        <label className="form-label">Nombre</label>
        <input 
          type="text" 
          value={userInfo.name} 
          onChange={(e) => onInputChange('name', e.target.value)} 
          className="form-input" 
          readOnly={!isEditing} 
          placeholder="Ingresa tu nombre" 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Correo Electrónico</label>
        <input 
          type="email" 
          value={userInfo.email} 
          onChange={(e) => onInputChange('email', e.target.value)} 
          className="form-input" 
          readOnly={!isEditing} 
          placeholder="correo@ejemplo.com" 
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Fecha de nacimiento</label>
          <input 
            type="text" 
            value={userInfo.birthDate} 
            onChange={(e) => onInputChange('birthDate', e.target.value)} 
            className="form-input" 
            readOnly={!isEditing} 
            placeholder="DD/MM/YYYY" 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Teléfono</label>
          <input 
            type="text" 
            value={userInfo.phone} 
            onChange={(e) => onInputChange('phone', e.target.value)} 
            className="form-input" 
            readOnly={!isEditing} 
            placeholder="0000-0000" 
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <input 
          type="password" 
          value={userInfo.password} 
          onChange={(e) => onInputChange('password', e.target.value)} 
          className="form-input" 
          readOnly={!isEditing} 
          placeholder="••••••••" 
        />
      </div>
    </>
  );

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder"></div>
          <div className="camera-icon">
            <Camera size={16} />
          </div>
        </div>
      </div>
      <div className="profile-form">
        {renderFormFields()}
        <button 
          type="button" 
          onClick={onEditToggle} 
          className="edit-button"
        >
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>
      
      <style jsx>{`
        .profile-card { 
          flex: 1; 
          width: auto; 
          max-width: none; 
          background: rgba(255,255,255,0.95); 
          border-radius: 20px; 
          padding: 30px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
          backdrop-filter: blur(10px); 
        }
        
        .profile-header {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }
        
        .profile-avatar {
          position: relative;
          width: 80px;
          height: 80px;
        }
        
        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #F5A02D 0%, #FF8C42 100%);
          border: 3px solid white;
          box-shadow: 0 4px 15px rgba(245, 160, 45, 0.3);
        }
        
        .camera-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 28px;
          height: 28px;
          background: #F5A02D;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        
        .camera-icon:hover {
          background: #E8921A;
          transform: scale(1.1);
        }
        
        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        
        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        
        .form-input {
          padding: 12px 16px;
          border: 2px solid #E2E8F0;
          border-radius: 12px;
          font-size: 14px;
          transition: all 0.3s ease;
          background: white;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #F5A02D;
          box-shadow: 0 0 0 3px rgba(245, 160, 45, 0.1);
        }
        
        .form-input[readonly] {
          background: #F8FAFC;
          color: #64748B;
        }
        
        .edit-button {
          padding: 12px 24px;
          background: #F5A02D;
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        
        .edit-button:hover {
          background: #E8921A;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(245, 160, 45, 0.3);
        }
        
        @media (max-width: 640px) {
          .profile-card {
            padding: 20px;
          }
          
          .form-row {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;