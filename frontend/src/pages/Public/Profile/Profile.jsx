import React, { useState, useEffect } from "react";
import {
  Package,
  Star,
  Users,
  BarChart3,
  ChevronRight,
  ArrowLeft,
  MessageCircle,
  Settings,
  Shield,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import ProfileCard from "../../../components/Profile/ProfileCard";
import { API_FETCH_JSON } from "../../../config";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [originalUserDetails, setOriginalUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentRole = user?.userType || userDetails?.userType || "client";

  const handleMenuClick = (menuId) => {
    switch (menuId) {
      case 1:
        if (currentRole === "client") navigate("/orderHistory");
        else if (currentRole === "employee")
          toast.info("Gestión de Pedidos - Próximamente");
        else if (currentRole === "vet")
          toast.info("Consultas - Próximamente");
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
        icon: <Package className="profile-menu-icon profile-icon-orders" />,
        text: "Tus pedidos",
        badge: null,
        hasArrow: true,
      },
      {
        id: 2,
        icon: <MessageCircle className="profile-menu-icon profile-icon-messages" />,
        text: "Mensajes",
        badge: 2,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <Star className="profile-menu-icon profile-icon-reviews" />,
        text: "Reseñas",
        badge: null,
        hasArrow: true,
      },
    ],
    employee: [
      {
        id: 1,
        icon: <Package className="profile-menu-icon profile-icon-orders" />,
        text: "Gestión de Pedidos",
        badge: 8,
        hasArrow: true,
      },
      {
        id: 2,
        icon: <Users className="profile-menu-icon profile-icon-clients" />,
        text: "Clientes",
        badge: null,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <BarChart3 className="profile-menu-icon profile-icon-analytics" />,
        text: "Análisis",
        badge: null,
        hasArrow: true,
      },
      {
        id: 4,
        icon: <Settings className="profile-menu-icon profile-icon-settings" />,
        text: "Configuración",
        badge: null,
        hasArrow: true,
      },
    ],
    vet: [
      {
        id: 1,
        icon: <Stethoscope className="profile-menu-icon profile-icon-consultations" />,
        text: "Consultas",
        badge: 5,
        hasArrow: true,
      },
      {
        id: 2,
        icon: <MessageCircle className="profile-menu-icon profile-icon-messages" />,
        text: "Mensajes",
        badge: 3,
        hasArrow: true,
      },
      {
        id: 3,
        icon: <Star className="profile-menu-icon profile-icon-reviews" />,
        text: "Reseñas",
        badge: null,
        hasArrow: true,
      },
      {
        id: 4,
        icon: <Shield className="profile-menu-icon profile-icon-certifications" />,
        text: "Certificaciones",
        badge: null,
        hasArrow: true,
      },
    ],
  };

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const data = await API_FETCH_JSON("login/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (data?.user) {
        setUserDetails(data.user);
        setOriginalUserDetails(data.user);
      }
    } catch (error) {
      console.error("Error al obtener detalles del usuario:", error);
      toast.error("Error al cargar los datos del perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) setUserDetails(originalUserDetails);
    setIsEditing(!isEditing);
  };

  const getChangedFields = (current, original) => {
    const changes = {};
    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const originalValue = original[key];
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

  const handleUpdateProfile = async (updatedUserInfo) => {
    try {
      setIsLoading(true);
      const changedFields = getChangedFields(
        updatedUserInfo,
        originalUserDetails
      );

      if (Object.keys(changedFields).length === 0) {
        toast.info("No hay cambios para guardar");
        return false;
      }

      const result = await updateProfile(
        userDetails._id,
        currentRole,
        changedFields
      );

      if (result.success) {
        await fetchUserDetails();
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

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    if (user) fetchUserDetails();
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
      client: `¡Hola${name ? `, ${name}` : ""}! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${name ? `, ${name}` : ""}! Panel de empleado`,
      vet: `¡Hola${name ? `, Dr. ${name}` : ""}! Panel veterinario`,
    };
    return roleMessages[currentRole] || `¡Hola${name ? `, ${name}` : ""}!`;
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-auth-placeholder">
          <h2>Por favor, inicia sesión para ver tu perfil</h2>
          <button
            onClick={() => (window.location.href = "/mainPage")}
            className="profile-retry-button"
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !userDetails) {
    return (
      <div className="profile-page">
        <div className="profile-loading-container">
          <div className="profile-loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Toaster position="top-right" reverseOrder={false} />

      <button onClick={handleGoBack} className="profile-back-button">
        <ArrowLeft className="profile-back-icon" size={20} />
        <span>Regresar</span>
      </button>

      <div className="profile-welcome-section">
        <h1 className="profile-welcome-message">{getWelcomeMessage()}</h1>
      </div>

      <div className="profile-layout-wrapper">
        <div className="profile-card-container">
          <ProfileCard
            userInfo={userDetails || user}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onEditToggle={handleEditToggle}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
            isAuthenticated={!!user}
          />
        </div>

        <div className="profile-content-wrapper">
          <div className="profile-menu-section">
            <h2 className="profile-menu-title">Opciones</h2>
            <div className="profile-menu-list">
              {menuConfig[currentRole]?.map((item) => (
                <button
                  key={item.id}
                  className="profile-menu-item"
                  onClick={() => handleMenuClick(item.id)}
                >
                  <div className="profile-menu-item-content">
                    {item.icon}
                    <span className="profile-menu-text">{item.text}</span>
                    {item.badge && (
                      <span className="profile-menu-badge">{item.badge}</span>
                    )}
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className="profile-menu-arrow" size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="profile-info-section">
            <div className="profile-info-card">
              <h3>Tipo de cuenta</h3>
              <p className="profile-user-type">
                {currentRole === "client" && "Cliente"}
                {currentRole === "employee" && "Empleado"}
                {currentRole === "vet" && "Veterinario"}
              </p>
            </div>

            <div className="profile-logout-section">
              <button onClick={logout} className="profile-logout-button">
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
