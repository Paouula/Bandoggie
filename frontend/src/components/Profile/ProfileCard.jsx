// ProfileCard.jsx
import React, { useState } from "react";
import { Loader2, User, Mail, Phone, Home } from "lucide-react";
import useFetchUser from "../../hooks/Profile/useFetchProfileCard"; 
import "./ProfileCard.css";

const ProfileCard = () => {
  const {
    userInfo,
    handleInputChange,
    updateUserData,
    isLoading,
  } = useFetchUser();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Guardar cambios
  const handleSave = async () => {
    setSaving(true);
    const success = await updateUserData(userInfo);
    if (success) setIsEditing(false);
    setSaving(false);
  };

  return (
    <div className={`profile-card ${isLoading ? "loading" : ""}`}>
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userInfo?.name?.[0] || "U"}
          </div>
        </div>
        <div className="user-role-badge">
          <span className="role-badge role-client">
            {userInfo.userType || "Cliente"}
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
              value={userInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
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
              value={userInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
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
              value={userInfo.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
            />
          </div>

          {/* Dirección */}
          <div className="form-group">
            <label className="form-label">
              <Home size={16} /> Dirección
            </label>
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className={`form-input ${!isEditing ? "readonly" : ""}`}
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="button-group">
          <button
            className={`edit-button ${isEditing ? "save-mode" : ""}`}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="spinning" size={18} />
            ) : isEditing ? (
              "Cancelar"
            ) : (
              "Editar"
            )}
          </button>

          {isEditing && (
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Guardar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
