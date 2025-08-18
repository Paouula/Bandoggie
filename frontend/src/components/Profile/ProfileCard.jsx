import React, { useState, useEffect } from "react";
import {
  Loader2,
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  BadgeDollarSign,
  AlertCircle
} from "lucide-react";
import useFetchUser from "../../hooks/Profile/useFetchProfileCard";
import "./ProfileCard.css";

const ProfileCard = () => {
  const {
    userInfo,
    handleInputChange,
    updateUserData,
    isLoading,
    isAuthenticated
  } = useFetchUser();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Debug: Mostrar datos en consola
  useEffect(() => {
    console.log('🔍 ProfileCard - Estado actual:', {
      userInfo,
      isLoading,
      isAuthenticated
    });
  }, [userInfo, isLoading, isAuthenticated]);

  // Guardar cambios
  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await updateUserData(userInfo);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setSaving(false);
    }
  };

  // Cancelar edición y revertir cambios
  const handleCancel = () => {
    setIsEditing(false);
    // Aquí podrías revertir los cambios si es necesario
    // fetchUserData(); // Si tienes esta función disponible
  };

  // Manejar cambios de input con validación
  const handleInputChangeWithValidation = (field, value) => {
    console.log(`📝 Cambiando campo ${field}:`, value);
    handleInputChange(field, value);
  };

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="profile-card error-state">
        <div className="error-message">
          <AlertCircle size={48} color="#dc2626" />
          <h3>No autenticado</h3>
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  // Si está cargando, mostrar loader
  if (isLoading) {
    return (
      <div className="profile-card loading-state">
        <div className="loading-spinner">
          <Loader2 className="spinning" size={48} />
          <p>Cargando información del perfil...</p>
        </div>
      </div>
    );
  }

  // Si no hay userInfo después de cargar, mostrar error
  if (!userInfo || !userInfo.userType) {
    return (
      <div className="profile-card error-state">
        <div className="error-message">
          <AlertCircle size={48} color="#dc2626" />
          <h3>Error al cargar perfil</h3>
          <p>No se pudieron cargar los datos del usuario.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`profile-card ${isLoading ? "loading" : ""}`}>
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userInfo?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
        <div className="user-role-badge">
          <span className={`role-badge role-${userInfo.userType}`}>
            {userInfo.userType === "vet" 
              ? "Veterinario" 
              : userInfo.userType === "client" 
              ? "Cliente" 
              : "Empleado"
            }
          </span>
        </div>
      </div>

      <div className="profile-form">
        <div className="form-fields-container">
          {/* Nombre */}
          <div className="form-group">
            <label className="form-label">
              <User size={16} /> Nombre
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name || ""}
              onChange={(e) => handleInputChangeWithValidation("name", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
              placeholder="Ingresa tu nombre"
            />
          </div>

          {/* Correo */}
          <div className="form-group">
            <label className="form-label">
              <Mail size={16} /> Correo
            </label>
            <input
              type="email"
              name="email"
              value={userInfo.email || ""}
              onChange={(e) => handleInputChangeWithValidation("email", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
              placeholder="Ingresa tu correo"
            />
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label className="form-label">
              <Phone size={16} /> Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone || ""}
              onChange={(e) => handleInputChangeWithValidation("phone", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
              placeholder="Ingresa tu teléfono"
            />
          </div>

          {/* Dirección - Campo común para todos */}
          <div className="form-group">
            <label className="form-label">
              <Home size={16} /> Dirección
            </label>
            <input
              type="text"
              name="address"
              value={userInfo.address || ""}
              onChange={(e) => handleInputChangeWithValidation("address", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
              placeholder="Ingresa tu dirección"
            />
          </div>

          {/* Campos específicos para CLIENTES */}
          {userInfo.userType === "client" && (
            <div className="form-group">
              <label className="form-label">
                <Home size={16} /> Cumpleaños
              </label>
              <input
                type="date"
                name="birthday"
                value={userInfo.birthday || ""}
                onChange={(e) => handleInputChangeWithValidation("birthday", e.target.value)}
                className={`form-input ${!isEditing ? "readonly" : ""}`}
                readOnly={!isEditing}
              />
            </div>
          )}

          {/* Campos específicos para VETERINARIOS */}
          {userInfo.userType === "vet" && (
            <>
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} /> Ubicación
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
                  <BadgeDollarSign size={16} /> NIT
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
            </>
          )}
        </div>

        {/* Botones */}
        <div className="button-group">
          <button
            className={`edit-button ${isEditing ? "cancel-mode" : ""}`}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="spinning" size={18} />
                Guardando...
              </>
            ) : isEditing ? (
              "Cancelar"
            ) : (
              "Editar"
            )}
          </button>

          {isEditing && (
            <button
              className="save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="spinning" size={18} />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </button>
          )}
        </div>

        {/* Debug info - Remover en producción */}
        {process.env.NODE_ENV === 'development' && (
          <div className="debug-info">
            <details>
              <summary>Debug Info</summary>
              <pre>{JSON.stringify({
                userInfo,
                isLoading,
                isAuthenticated,
                isEditing,
                saving
              }, null, 2)}</pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;