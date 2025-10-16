import React, { useState, useEffect } from "react";
import {
  Package,
  Star,
  Users,
  BarChart3,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { toast, Toaster} from "react-hot-toast";
import ProfileCard from "../../../components/Profile/ProfileCard";
import { API_FETCH_JSON } from "../../../config";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Estado para los detalles del usuario mostrados en el formulario
  const [userDetails, setUserDetails] = useState(null);

  // Estado para guardar una copia original de los datos
  // Esto nos permite comparar qué campos cambiaron y restaurar al cancelar
  const [originalUserDetails, setOriginalUserDetails] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentRole = user?.userType || userDetails?.userType || "client";

  const handleMenuClick = (menuId) => {
    console.log("Menu clicked:", menuId);

    switch (menuId) {
      case 1:
        if (currentRole === "client") {
          console.log(" Navegando a OrderHistory...");
          navigate("/orderHistory");
        } else if (currentRole === "employee") {
          toast.info("Gestión de Pedidos - Próximamente");
        } else if (currentRole === "vet") {
          toast.info("Consultas - Próximamente");
        }
        break;

      case 2:
        toast.info("Mensajes - Próximamente");
        break;

      case 3:
        toast.info("Reseñas - Próximamente");
        break;

      case 4:
        toast.info("Configuración - Próximamente");
        break;

      default:
        toast.info("Función próximamente disponible");
    }
  };

  const menuConfig = {
    client: [
      {
        id: 1,
        icon: <Package className="menu-icon icon-orders" />,
        text: "Tus pedidos",
        badge: null,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <Star className="menu-icon icon-reviews" />,
        text: "Reseñas",
        badge: null,
        hasArrow: true,
      },
    ],
    employee: [
      {
        id: 1,
        icon: <Package className="menu-icon icon-orders" />,
        text: "Gestión de Pedidos",
        badge: 8,
        hasArrow: true,
      },
      {
        id: 2,
        icon: <Users className="menu-icon icon-clients" />,
        text: "Clientes",
        badge: null,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <BarChart3 className="menu-icon icon-analytics" />,
        text: "Análisis",
        badge: null,
        hasArrow: true,
      },
    ],
    vet: [
      {
        id: 1,
        icon: <Package className="menu-icon icon-orders" />,
        text: "Tus pedidos",
        badge: null,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <Star className="menu-icon icon-reviews" />,
        text: "Reseñas",
        badge: null,
        hasArrow: true,
      },
    ],
  };

  // Obtiene los detalles completos del usuario desde el backend
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const data = await API_FETCH_JSON("login/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (data?.user) {
        console.log(" Detalles del usuario obtenidos:", data.user);

        // Guardamos los datos en ambos estados
        setUserDetails(data.user);

        //  Guardamos una copia original para poder compararla después
        setOriginalUserDetails(data.user);
      }
    } catch (error) {
      console.error(" Error al obtener detalles del usuario:", error);
      toast.error("Error al cargar los datos del perfil");
    } finally {
      setIsLoading(false);
    }
  };

  // Maneja los cambios en tiempo real de los campos del formulario
  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Maneja el toggle del modo edición
  const handleEditToggle = () => {
    // Si está cancelando la edición, restaura los datos originales
    if (isEditing) {
      setUserDetails(originalUserDetails);
    }
    setIsEditing(!isEditing);
  };

  // Función que compara el estado actual con el original
  // y retorna SOLO los campos que cambiaron
  const getChangedFields = (current, original) => {
    const changes = {};

    // Recorre todos los campos del objeto actual
    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const originalValue = original[key];

      // Solo incluye el campo si:
      // 1. El valor cambió (currentValue !== originalValue)
      // 2. El valor tiene contenido (no es undefined, null o string vacío)
      if (
        currentValue !== originalValue &&
        currentValue !== undefined &&
        currentValue !== null &&
        currentValue !== ""
      ) {
        changes[key] = currentValue;
      }
    });

    return changes;
  };

  //  Función mejorada para actualizar el perfil
  // Ahora solo envía los campos que realmente cambiaron
  const handleUpdateProfile = async (updatedUserInfo) => {
    try {
      setIsLoading(true);

      // Obtiene SOLO los campos que cambiaron
      const changedFields = getChangedFields(
        updatedUserInfo,
        originalUserDetails
      );

      // Si no hay cambios, no hace la petición
      if (Object.keys(changedFields).length === 0) {
        toast.info("No hay cambios para guardar");
        return false;
      }

      // Llama a la función updateProfile del contexto
      // pero ahora solo con los campos modificados
      const result = await updateProfile(
        userDetails._id,
        currentRole,
        changedFields //  Solo envía lo que cambió
      );

      if (result.success) {
        // Recarga los datos del usuario para tener la versión actualizada
        await fetchUserDetails();
        // Sale del modo edición
        setIsEditing(false);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Carga los detalles del usuario cuando el componente monta
  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const getWelcomeMessage = () => {
    if (!user) return "";
    const name =
      userDetails?.name ||
      userDetails?.nameEmployees ||
      userDetails?.nameVet ||
      user?.name ||
      "";
    const roleMessages = {
      client: `¡Hola${
        name ? `, ${name}` : ""
      }! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${name ? `, ${name}` : ""}! Panel de empleado`,
      vet: `¡Hola${name ? `, Dr. ${name}` : ""}! Panel veterinario`,
    };
    return roleMessages[currentRole] || `¡Hola${name ? `, ${name}` : ""}!`;
  };

  // Pantalla de no autenticado
  if (!user) {
    return (
      <div className="user-profile">
        <div className="auth-placeholder">
          <h2>Por favor, inicia sesión para ver tu perfil</h2>
          <button
            onClick={() => (window.location.href = "/mainPage")}
            className="retry-button"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de carga inicial
  if (isLoading && !userDetails) {
    return (
      <div className="user-profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {/* Botón para regresar */}
      <Toaster position="top-right" reverseOrder={false} />

      <button onClick={handleGoBack} className="back-button">
        <ArrowLeft className="back-icon" size={20} />
        <span>Regresar</span>
      </button>

      {/* Mensaje de bienvenida personalizado */}
      <div className="welcome-section">
        <h1 className="welcome-message">{getWelcomeMessage()}</h1>
      </div>

      {/* Layout principal con dos columnas */}
      <div className="profile-and-content-wrapper">
        {/* Columna izquierda: Tarjeta de perfil */}
        <div className="profile-container">
          <ProfileCard
            userInfo={userDetails || user}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onEditToggle={handleEditToggle}
            onUpdateProfile={handleUpdateProfile} // 🆕 Ahora solo envía cambios
            isLoading={isLoading}
            isAuthenticated={!!user}
          />
        </div>

        {/* Columna derecha: Menú y opciones */}
        <div className="content-wrapper">
          {/* Menú de opciones según el tipo de usuario */}
          <div className="menu-section">
            <h2 className="menu-title">Opciones</h2>
            <div className="menu-list">
              {menuConfig[currentRole]?.map((item) => (
                <button
                  key={item.id}
                  className="menu-item"
                  onClick={() => handleMenuClick(item.id)}
                >
                  <div className="menu-item-content">
                    {item.icon}
                    <span className="menu-text">{item.text}</span>
                    {item.badge && (
                      <span className="menu-badge">{item.badge}</span>
                    )}
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className="menu-arrow" size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="info-section">
            <div className="info-card">
              <h3>Tipo de cuenta</h3>
              <p className="user-type-display">
                {currentRole === "client" && "Cliente"}
                {currentRole === "employee" && "Empleado"}
                {currentRole === "vet" && "🩺 Veterinario"}
              </p>
            </div>

            {/* Botón de cerrar sesión */}
            <div className="logout-section">
              <button onClick={logout} className="logout-button">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
