import React from "react";
import { Edit2, Save, X, User } from "lucide-react";
import "./ProfileCard.css";

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
        <div className="info-field">
          <label>Nombre</label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.name || userInfo.nameEmployees || ""}
              onChange={(e) =>
                onInputChange(
                  userInfo.nameEmployees ? "nameEmployees" : "name",
                  e.target.value
                )
              }
              placeholder="Ingresa tu nombre"
            />
          ) : (
            <p>
              {userInfo.name || userInfo.nameEmployees || "No especificado"}
            </p>
          )}
        </div>

        <div className="info-field">
          <label>Email</label>
          {isEditing ? (
            <input
              type="email"
              value={userInfo.email || ""}
              onChange={(e) => onInputChange("email", e.target.value)}
              placeholder="correo@ejemplo.com"
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
              <input
                type="tel"
                value={userInfo.phone || userInfo.phoneEmployees || ""}
                onChange={(e) =>
                  onInputChange(
                    userInfo.phoneEmployees ? "phoneEmployees" : "phone",
                    e.target.value
                  )
                }
                placeholder="1234-5678"
              />
            ) : (
              <p>
                {userInfo.phone || userInfo.phoneEmployees || "No especificado"}
              </p>
            )}
          </div>
        )}

        {/* Campos específicos para clientes */}
        {userInfo.userType === "client" && (
          <div className="info-field">
            <label>Fecha de Nacimiento</label>
            {isEditing ? (
              <input
                type="date"
                value={userInfo.birthday || userInfo.birthDate || ""}
                onChange={(e) => onInputChange("birthday", e.target.value)}
              />
            ) : (
              <p>
                {userInfo.birthday || userInfo.birthDate || "No especificado"}
              </p>
            )}
          </div>
        )}

        {/* Campos específicos para empleados */}
        {userInfo.userType === "employee" && (
          <>
            <div className="info-field">
              <label>Fecha de Nacimiento</label>
              {isEditing ? (
                <input
                  type="date"
                  value={
                    userInfo.dateOfBirth
                      ? new Date(userInfo.dateOfBirth)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) => onInputChange("dateOfBirth", e.target.value)}
                />
              ) : (
                <p>
                  {userInfo.dateOfBirth
                    ? new Date(userInfo.dateOfBirth).toLocaleDateString()
                    : "No especificado"}
                </p>
              )}
            </div>
            <div className="info-field">
              <label>Dirección</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.addressEmployees || ""}
                  onChange={(e) =>
                    onInputChange("addressEmployees", e.target.value)
                  }
                  placeholder="Dirección"
                />
              ) : (
                <p>{userInfo.addressEmployees || "No especificado"}</p>
              )}
            </div>
            <div className="info-field">
              <label>Fecha de Contratación</label>
              {isEditing ? (
                <input
                  type="date"
                  value={
                    userInfo.hireDateEmployee
                      ? new Date(userInfo.hireDateEmployee)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    onInputChange("hireDateEmployee", e.target.value)
                  }
                />
              ) : (
                <p>
                  {userInfo.hireDateEmployee
                    ? new Date(userInfo.hireDateEmployee).toLocaleDateString()
                    : "No especificado"}
                </p>
              )}
            </div>
            <div className="info-field">
              <label>DUI</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.duiEmployees || ""}
                  onChange={(e) =>
                    onInputChange("duiEmployees", e.target.value)
                  }
                  placeholder="DUI"
                />
              ) : (
                <p>{userInfo.duiEmployees || "No especificado"}</p>
              )}
            </div>
          </>
        )}

        {/* Campos específicos para veterinarios */}
        {userInfo.userType === "vet" && (
          <>
            <div className="info-field">
              <label>Ubicación de Consultorio</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.locationVet || ""}
                  onChange={(e) => onInputChange("locationVet", e.target.value)}
                  placeholder="Ubicación del consultorio"
                />
              ) : (
                <p>{userInfo.locationVet || "No especificado"}</p>
              )}
            </div>
            <div className="info-field">
              <label>NIT</label>
              {isEditing ? (
                <input
                  type="text"
                  value={userInfo.nitVet || ""}
                  onChange={(e) => onInputChange("nitVet", e.target.value)}
                  placeholder="NIT del consultorio"
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
