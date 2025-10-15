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

  // Función auxiliar para manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    onInputChange(field, value);
  };

  // Función auxiliar para manejar cambios en los DatePickers
  const handleDateChange = (field, date) => {
    if (date instanceof Date && !isNaN(date)) {
      // Convertir a formato ISO string (YYYY-MM-DD)
      const isoDate = date.toISOString().split("T")[0];
      onInputChange(field, isoDate);
    }
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
              alt={userInfo.name || userInfo.nameEmployees || "Usuario"}
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
        {/* Campo Nombre */}
        <div className="info-field">
          <label>Nombre</label>
          {isEditing ? (
            <Input
              type="text"
              id="name"
              placeholder="Ingresa tu nombre"
              value={userInfo.name || userInfo.nameEmployees || ""}
              onChange={(e) =>
                handleInputChange(
                  userInfo.nameEmployees ? "nameEmployees" : "name",
                  e.target.value
                )
              }
            />
          ) : (
            <p>
              {userInfo.name || userInfo.nameEmployees || "No especificado"}
            </p>
          )}
        </div>

        {/* Campo Email */}
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

        {/* Campo Teléfono (Empleados y Clientes) */}
        {(userInfo.userType === "employee" ||
          userInfo.userType === "client") && (
          <div className="info-field">
            <label>Teléfono</label>
            {isEditing ? (
              <Input
                type="tel"
                id="phone"
                placeholder="1234-5678"
                value={userInfo.phone || userInfo.phoneEmployees || ""}
                onChange={(e) =>
                  handleInputChange(
                    userInfo.phoneEmployees ? "phoneEmployees" : "phone",
                    e.target.value
                  )
                }
              />
            ) : (
              <p>
                {userInfo.phone || userInfo.phoneEmployees || "No especificado"}
              </p>
            )}
          </div>
        )}

        {/* Campos específicos para CLIENTES */}
        {userInfo.userType === "client" && (
          <div className="info-field">
            <label>Fecha de Nacimiento</label>
            {isEditing ? (
              <InputDataPicker
                label="Selecciona tu fecha de nacimiento"
                value={userInfo.birthday || userInfo.birthDate || ""}
                onChange={(date) => handleDateChange("birthday", date)}
                name="birthday"
              />
            ) : (
              <p>
                {userInfo.birthday
                  ? new Date(userInfo.birthday).toLocaleDateString("es-ES")
                  : userInfo.birthDate
                  ? new Date(userInfo.birthDate).toLocaleDateString("es-ES")
                  : "No especificado"}
              </p>
            )}
          </div>
        )}

        {/* Campos específicos para EMPLEADOS */}
        {userInfo.userType === "employee" && (
          <>
            {/* Fecha de Nacimiento */}
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

            {/* Dirección */}
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

            {/* Fecha de Contratación */}
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

            {/* DUI */}
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

        {/* Campos específicos para VETERINARIOS */}
        {userInfo.userType === "vet" && (
          <>
            {/* Ubicación del Consultorio */}
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

            {/* NIT */}
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

        {/* Tipo de Usuario (Solo lectura) */}
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
