import React, { useState, useEffect } from "react";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  BadgeDollarSign,
  AlertCircle,
  LogIn,
  UserCircle,
  Edit3,
  Save,
  X,
  Shield,
  Calendar
} from "lucide-react";
import useFetchUser from "../../hooks/Profile/useFetchProfileCard";
import "./ProfileCard.css";

const ProfileCard = ({ 
  isEditing: propIsEditing, 
  onEditToggle, 
  onUpdateProfile,
  isLoading: propIsLoading,
  isAuthenticated: propIsAuthenticated 
}) => {
  const {
    userInfo,
    handleInputChange,
    updateUserData,
    isLoading: hookIsLoading,
    isAuthenticated: hookIsAuthenticated,
    login
  } = useFetchUser();

  // Usar props si están disponibles, sino usar valores del hook
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading;
  const isAuthenticated = propIsAuthenticated !== undefined ? propIsAuthenticated : hookIsAuthenticated;

  const [isEditing, setIsEditing] = useState(propIsEditing || false);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState(null);

  // Sincronizar con props
  useEffect(() => {
    if (propIsEditing !== undefined) {
      setIsEditing(propIsEditing);
    }
  }, [propIsEditing]);

  // Debug: Mostrar datos en consola
  useEffect(() => {
    console.log('🔍 ProfileCard - Estado actual:', {
      userInfo,
      isLoading,
      isAuthenticated,
      propIsEditing,
      isEditing
    });
  }, [userInfo, isLoading, isAuthenticated, propIsEditing, isEditing]);

  // Guardar datos originales cuando entra en modo edición
  const handleStartEdit = () => {
    setOriginalData({ ...userInfo });
    setIsEditing(true);
    if (onEditToggle) onEditToggle();
  };

  // Guardar cambios
  const handleSave = async () => {
    setSaving(true);
    try {
      let success;
      if (onUpdateProfile) {
        // Usar función del componente padre si está disponible
        success = await onUpdateProfile(userInfo);
      } else {
        // Usar función del hook
        success = await updateUserData(userInfo);
      }
      
      if (success) {
        setIsEditing(false);
        setOriginalData(null);
        if (onEditToggle) onEditToggle();
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setSaving(false);
    }
  };

  // Cancelar edición y revertir cambios
  const handleCancel = () => {
    if (originalData) {
      // Revertir todos los campos a su estado original
      Object.keys(originalData).forEach(key => {
        handleInputChange(key, originalData[key]);
      });
    }
    setIsEditing(false);
    setOriginalData(null);
    if (onEditToggle) onEditToggle();
  };

  // Manejar cambios de input con validación
  const handleInputChangeWithValidation = (field, value) => {
    console.log(`📝 Cambiando campo ${field}:`, value);
    handleInputChange(field, value);
  };

  // Componente para cuando no está autenticado
  const NotAuthenticatedCard = () => (
    <div className="profile-card not-authenticated">
      <div className="not-auth-content">
        <div className="not-auth-header">
          <div className="not-auth-text">
            <h2 className="not-auth-title">¡Hola! Accede a tu perfil</h2>
            <p className="not-auth-subtitle">
              Inicia sesión para ver y gestionar tu información personal
            </p>
          </div>
        </div>
      </div>
    </div>
  );


  // Componente para estado de carga
  const LoadingCard = () => (
    <div className="profile-card loading-state">
      <div className="loading-content">
        <div className="loading-spinner">
          <Loader2 className="spinner-icon" size={48} />
        </div>
        <div className="loading-text">
          <h3>Cargando tu perfil...</h3>
          <p>Obteniendo información personalizada</p>
        </div>
      </div>
    </div>
  );

  // Componente para errores
  const ErrorCard = () => (
    <div className="profile-card error-state">
      <div className="error-content">
        <div className="error-icon">
          <AlertCircle size={48} />
        </div>
        <div className="error-text">
          <h3>Ops! Algo salió mal</h3>
          <p>No pudimos cargar tu información. Intenta nuevamente.</p>
        </div>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );

  // Función para obtener el tipo de usuario en español
  const getUserTypeLabel = (userType) => {
    const types = {
      vet: "Veterinario",
      client: "Cliente", 
      employee: "Empleado"
    };
    return types[userType] || "Usuario";
  };

  // Si no está autenticado, mostrar tarjeta de login
  if (!isAuthenticated && !isLoading) {
    return <NotAuthenticatedCard />;
  }

  // Si está cargando, mostrar loader
  if (isLoading) {
    return <LoadingCard />;
  }

  // Si no hay userInfo después de cargar, mostrar error
  if (!userInfo || !userInfo.userType) {
    return <ErrorCard />;
  }

  return (
    <div className={`profile-card authenticated ${isEditing ? 'editing' : ''}`}>
      {/* Header del perfil */}
      <div className="profile-header">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {userInfo.image ? (
              <img 
                src={userInfo.image} 
                alt={userInfo.name} 
                className="avatar-image"
              />
            ) : (
              <div className="avatar-placeholder">
                {userInfo?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
          </div>
          <div className="profile-header-info">
            <h2 className="profile-name">{userInfo.name || "Usuario"}</h2>
            <span className={`role-badge role-${userInfo.userType}`}>
              {getUserTypeLabel(userInfo.userType)}
            </span>
          </div>
        </div>
        
        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="edit-button"
              onClick={handleStartEdit}
              disabled={saving}
            >
              <Edit3 size={16} />
              Editar Perfil
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="save-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="spinning" size={16} />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Guardar
                  </>
                )}
              </button>
              <button 
                className="cancel-button"
                onClick={handleCancel}
                disabled={saving}
              >
                <X size={16} />
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Formulario de información */}
      <div className="profile-form">
        <div className="form-sections">
          {/* Información básica */}
          <div className="form-section">
            <h4 className="section-title">Información Personal</h4>
            
            <div className="form-group">
              <label className="form-label">
                <User size={16} />
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={userInfo.name || ""}
                onChange={(e) => handleInputChangeWithValidation("name", e.target.value)}
                className={`form-input ${!isEditing ? "readonly" : ""}`}
                readOnly={!isEditing}
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={16} />
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={userInfo.email || ""}
                onChange={(e) => handleInputChangeWithValidation("email", e.target.value)}
                className={`form-input ${!isEditing ? "readonly" : ""}`}
                readOnly={!isEditing}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={16} />
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone || ""}
                onChange={(e) => handleInputChangeWithValidation("phone", e.target.value)}
                className={`form-input ${!isEditing ? "readonly" : ""}`}
                readOnly={!isEditing}
                placeholder="+503 0000-0000"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Home size={16} />
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={userInfo.address || ""}
                onChange={(e) => handleInputChangeWithValidation("address", e.target.value)}
                className={`form-input ${!isEditing ? "readonly" : ""}`}
                readOnly={!isEditing}
                placeholder="Tu dirección completa"
              />
            </div>
          </div>

          {/* Información específica por tipo de usuario */}
          {userInfo.userType === "client" && (
            <div className="form-section">
              <h4 className="section-title">Información Adicional</h4>
              
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} />
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={userInfo.birthday ? userInfo.birthday.split('T')[0] : ""}
                  onChange={(e) => handleInputChangeWithValidation("birthday", e.target.value)}
                  className={`form-input ${!isEditing ? "readonly" : ""}`}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          )}

          {userInfo.userType === "vet" && (
            <div className="form-section">
              <h4 className="section-title">Información de Veterinaria</h4>
              
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} />
                  Ubicación
                </label>
                <input
                  type="text"
                  name="locationVet"
                  value={userInfo.locationVet || ""}
                  onChange={(e) => handleInputChangeWithValidation("locationVet", e.target.value)}
                  className={`form-input ${!isEditing ? "readonly" : ""}`}
                  readOnly={!isEditing}
                  placeholder="Ubicación de la veterinaria"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <BadgeDollarSign size={16} />
                  NIT
                </label>
                <input
                  type="text"
                  name="nitVet"
                  value={userInfo.nitVet || ""}
                  onChange={(e) => handleInputChangeWithValidation("nitVet", e.target.value)}
                  className={`form-input ${!isEditing ? "readonly" : ""}`}
                  readOnly={!isEditing}
                  placeholder="NIT de la veterinaria"
                />
              </div>
            </div>
          )}
        </div>

        {/* Información de estado */}
        {isEditing && (
          <div className="editing-notice">
            <AlertCircle size={16} />
            <span>Modo de edición activado. Realiza tus cambios y guarda.</span>
          </div>
        )}
      </div>

      {/* Debug info - Solo en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-section">
          <details className="debug-details">
            <summary>Información de Debug</summary>
            <pre className="debug-content">
              {JSON.stringify({
                userInfo,
                isLoading,
                isAuthenticated,
                isEditing,
                saving,
                originalData
              }, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;