import React, { useState } from 'react';
import { Camera, User, Mail, Calendar, Phone, Lock, Loader2 } from 'lucide-react';
import './ProfileCard.css';

const ProfileCard = ({ 
  userInfo, 
  isEditing, 
  onInputChange, 
  onEditToggle, 
  isLoading = false, 
  isAuthenticated = false,
  onUpdateProfile 
}) => {
  const [isSaving, setIsSaving] = useState(false);

  // Configuración de campos según el tipo de usuario
  const getFieldsConfig = (userType) => {
    const baseFields = [
      {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        placeholder: 'Ingresa tu nombre',
        icon: <User size={18} />,
        required: true
      },
      {
        name: 'email',
        label: 'Correo Electrónico',
        type: 'email',
        placeholder: 'correo@ejemplo.com',
        icon: <Mail size={18} />,
        required: true
      }
    ];

    const additionalFields = {
      client: [
        {
          name: 'birthDate',
          label: 'Fecha de nacimiento',
          type: 'date',
          placeholder: 'DD/MM/YYYY',
          icon: <Calendar size={18} />,
          required: false
        },
        {
          name: 'phone',
          label: 'Teléfono',
          type: 'tel',
          placeholder: '0000-0000',
          icon: <Phone size={18} />,
          required: false
        }
      ],
      employee: [
        {
          name: 'phone',
          label: 'Teléfono de contacto',
          type: 'tel',
          placeholder: '0000-0000',
          icon: <Phone size={18} />,
          required: true
        },
        {
          name: 'department',
          label: 'Departamento',
          type: 'text',
          placeholder: 'Área de trabajo',
          icon: <User size={18} />,
          required: false
        }
      ],
      vet: [
        {
          name: 'phone',
          label: 'Teléfono de consulta',
          type: 'tel',
          placeholder: '0000-0000',
          icon: <Phone size={18} />,
          required: true
        },
        {
          name: 'specialization',
          label: 'Especialización',
          type: 'text',
          placeholder: 'Especialidad veterinaria',
          icon: <User size={18} />,
          required: false
        },
        {
          name: 'license',
          label: 'Número de licencia',
          type: 'text',
          placeholder: 'Licencia profesional',
          icon: <User size={18} />,
          required: false
        }
      ]
    };

    return [
      ...baseFields,
      ...(additionalFields[userType] || additionalFields.client),
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: '••••••••',
        icon: <Lock size={18} />,
        required: false
      }
    ];
  };

  const handleSave = async () => {
    if (onUpdateProfile) {
      setIsSaving(true);
      const success = await onUpdateProfile(userInfo);
      setIsSaving(false);
      if (success) {
        onEditToggle();
      }
    } else {
      onEditToggle();
    }
  };

  const renderFormFields = () => {
    if (!isAuthenticated) {
      return (
        <div className="auth-placeholder">
          <div className="auth-message">
            <User size={48} className="auth-icon" />
            <h3>Inicia sesión para ver tu perfil</h3>
            <p>Accede a tu cuenta para gestionar tu información personal</p>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="loading-container">
          <Loader2 size={24} className="spinning" />
          <p>Cargando información del perfil...</p>
        </div>
      );
    }

    const fields = getFieldsConfig(userInfo.userType);

    return (
      <>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label className="form-label">
              {field.icon && <span className="label-icon">{field.icon}</span>}
              {field.label}
              {field.required && <span className="required-asterisk">*</span>}
            </label>
            <div className="input-wrapper">
              <input
                type={field.type}
                value={userInfo[field.name] || ''}
                onChange={(e) => onInputChange(field.name, e.target.value)}
                className={`form-input ${!isEditing ? 'readonly' : ''}`}
                readOnly={!isEditing}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          </div>
        ))}
      </>
    );
  };

  const getRoleDisplayName = (userType) => {
    const roleNames = {
      client: 'Cliente',
      employee: 'Empleado',
      vet: 'Veterinario'
    };
    return roleNames[userType] || 'Usuario';
  };

  return (
    <div className={`profile-card ${isLoading ? 'loading' : ''}`}>
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : <User size={24} />}
          </div>
          {isAuthenticated && (
            <div className="camera-icon">
              <Camera size={16} />
            </div>
          )}
        </div>
        {isAuthenticated && userInfo.userType && (
          <div className="user-role-badge">
            <span className={`role-badge role-${userInfo.userType}`}>
              {getRoleDisplayName(userInfo.userType)}
            </span>
          </div>
        )}
      </div>
      
      <div className="profile-form">
        {renderFormFields()}
        
        {isAuthenticated && (
          <button
            type="button"
            onClick={isEditing ? handleSave : onEditToggle}
            className={`edit-button ${isEditing ? 'save-mode' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="spinning" />
                Guardando...
              </>
            ) : (
              isEditing ? 'Guardar' : 'Editar'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;