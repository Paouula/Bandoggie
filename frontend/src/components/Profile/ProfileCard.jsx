import React from "react";
import { Edit2, Save, X, User } from "lucide-react";
import "./ProfileCard.css";
import InputDataPicker from "../InputDataPicker/InputDataPicker";
import Input from "../Input/Input";

const ProfileCard = ({
  userInfo,
  isEditing,
  onInputChange,
  onEditToggle,
  onUpdateProfile,
  isLoading,
  isAuthenticated,
}) => {
  const handleSave = async () => {
    const success = await onUpdateProfile(userInfo);
    if (success) {
      onEditToggle();
    }
  };

  const handleInputChange = (field, value) => {
    onInputChange(field, value);
  };

  const handleDateChange = (field, date) => {
    if (date instanceof Date && !isNaN(date)) {
      const isoDate = date.toISOString().split("T")[0];
      onInputChange(field, isoDate);
    }
  };

  const getNameField = () => {
    switch (userInfo.userType) {
      case "employee":
        return "nameEmployees";
      case "vet":
        return "nameVet";
      case "client":
      default:
        return "name";
    }
  };

  const getPhoneField = () => {
    return userInfo.userType === "employee" ? "phoneEmployees" : "phone";
  };

  const getNameValue = () => {
    switch (userInfo.userType) {
      case "employee":
        return userInfo.nameEmployees || userInfo.name || "";
      case "vet":
        return userInfo.nameVet || userInfo.name || "";
      case "client":
      default:
        return userInfo.name || "";
    }
  };

  const getPhoneValue = () => {
    return userInfo.userType === "employee"
      ? userInfo.phoneEmployees || ""
      : userInfo.phone || "";
  };

  if (!isAuthenticated || !userInfo) {
    return (
      <div className="profile-card">
        <p>No autenticado</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          {userInfo.image ? (
            <img
              src={userInfo.image}
              alt={getNameValue() || "Usuario"}
              className="profile-image"
            />
          ) : (
            <div className="profile-image-placeholder">
              <User size={40} />
            </div>
          )}
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button onClick={onEditToggle} className="btn-edit">
              <Edit2 size={16} />
              Editar
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="btn-save"
                disabled={isLoading}
              >
                <Save size={16} />
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
              <button onClick={onEditToggle} className="btn-cancel">
                <X size={16} />
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-info">
        <div className="info-field">
          <label>Nombre</label>
          {isEditing ? (
            <Input
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              value={getNameValue()}
              onChange={(e) =>
                handleInputChange(getNameField(), e.target.value)
              }
            />
          ) : (
            <p>{getNameValue() || "No especificado"}</p>
          )}
        </div>

        <div className="info-field">
          <label>Email</label>
          {isEditing ? (
            <Input
              type="email"
              id="email"
              placeholder="correo@ejemplo.com"
              value={userInfo.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          ) : (
            <p>{userInfo.email || "No especificado"}</p>
          )}
        </div>

        {(userInfo.userType === "employee" ||
          userInfo.userType === "client") && (
          <div className="info-field">
            <label>Teléfono</label>
            {isEditing ? (
              <Input
                type="tel"
                id="phone"
                placeholder="1234-5678"
                value={getPhoneValue()}
                onChange={(e) =>
                  handleInputChange(getPhoneField(), e.target.value)
                }
              />
            ) : (
              <p>{getPhoneValue() || "No especificado"}</p>
            )}
          </div>
        )}

        {userInfo.userType === "client" && (
          <div className="info-field">
            <label>Fecha de Nacimiento</label>
            {isEditing ? (
              <InputDataPicker
                label="Selecciona tu fecha de nacimiento"
                value={userInfo.birthday || ""}
                onChange={(date) => handleDateChange("birthday", date)}
                name="birthday"
              />
            ) : (
              <p>
                {userInfo.birthday
                  ? new Date(userInfo.birthday).toLocaleDateString("es-ES")
                  : "No especificado"}
              </p>
            )}
          </div>
        )}

        {userInfo.userType === "employee" && (
          <>
            <div className="info-field">
              <label>Fecha de Nacimiento</label>
              {isEditing ? (
                <InputDataPicker
                  label="Selecciona tu fecha de nacimiento"
                  value={userInfo.dateOfBirth || ""}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                  name="dateOfBirth"
                />
              ) : (
                <p>
                  {userInfo.dateOfBirth
                    ? new Date(userInfo.dateOfBirth).toLocaleDateString("es-ES")
                    : "No especificado"}
                </p>
              )}
            </div>

            <div className="info-field">
              <label>Dirección</label>
              {isEditing ? (
                <Input
                  type="text"
                  id="addressEmployees"
                  placeholder="Ingresa tu dirección"
                  value={userInfo.addressEmployees || ""}
                  onChange={(e) =>
                    handleInputChange("addressEmployees", e.target.value)
                  }
                />
              ) : (
                <p>{userInfo.addressEmployees || "No especificado"}</p>
              )}
            </div>

            <div className="info-field">
              <label>Fecha de Contratación</label>
              <p>
                {userInfo.hireDateEmployee
                  ? new Date(userInfo.hireDateEmployee).toLocaleDateString(
                      "es-ES"
                    )
                  : "No especificado"}
              </p>
            </div>

            <div className="info-field">
              <label>DUI</label>
              {isEditing ? (
                <Input
                  type="text"
                  id="duiEmployees"
                  placeholder="12345678-9"
                  value={userInfo.duiEmployees || ""}
                  onChange={(e) =>
                    handleInputChange("duiEmployees", e.target.value)
                  }
                />
              ) : (
                <p>{userInfo.duiEmployees || "No especificado"}</p>
              )}
            </div>
          </>
        )}

        {userInfo.userType === "vet" && (
          <>
            <div className="info-field">
              <label>Ubicación de Consultorio</label>
              {isEditing ? (
                <Input
                  type="text"
                  id="locationVet"
                  placeholder="Ubicación del consultorio"
                  value={userInfo.locationVet || ""}
                  onChange={(e) =>
                    handleInputChange("locationVet", e.target.value)
                  }
                />
              ) : (
                <p>{userInfo.locationVet || "No especificado"}</p>
              )}
            </div>

            <div className="info-field">
              <label>NIT</label>
              {isEditing ? (
                <Input
                  type="text"
                  id="nitVet"
                  placeholder="1234-567890-123-4"
                  value={userInfo.nitVet || ""}
                  onChange={(e) => handleInputChange("nitVet", e.target.value)}
                />
              ) : (
                <p>{userInfo.nitVet || "No especificado"}</p>
              )}
            </div>
          </>
        )}

        <div className="info-field">
          <label>Tipo de Usuario</label>
          <div className="user-type-badge-container">
            <span className={`user-type-badge ${userInfo.userType}`}>
              {userInfo.userType === "client" && "👤 Cliente"}
              {userInfo.userType === "employee" && "👔 Empleado"}
              {userInfo.userType === "vet" && "🩺 Veterinario"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
