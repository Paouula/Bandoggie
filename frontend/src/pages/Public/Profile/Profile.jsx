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
import ProfileCard from "../../../components/Profile/ProfileCard";
import { API_FETCH_JSON } from "../../../config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth(); // ✅ Obtener updateProfile del contexto
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentRole = user?.userType || userDetails?.userType || 'client';

  const handleMenuClick = (menuId) => {
    console.log('📘 Menu clicked:', menuId);
    
    switch(menuId) {
      case 1:
        if (currentRole === 'client') {
          console.log('📦 Navegando a OrderHistory...');
          navigate('/orderHistory');
        }
        else if (currentRole === 'employee') {
          toast.info('Gestión de Pedidos - Próximamente');
        }
        else if (currentRole === 'vet') {
          toast.info('Consultas - Próximamente');
        }
        break;
        
      case 2:
        toast.info('Mensajes - Próximamente');
        break;
        
      case 3:
        toast.info('Reseñas - Próximamente');
        break;
        
      case 4:
        toast.info('Configuración - Próximamente');
        break;
        
      default:
        toast.info('Función próximamente disponible');
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

  // Obtener detalles completos del usuario
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const data = await API_FETCH_JSON("login/auth/me", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (data?.user) {
        console.log(' Detalles del usuario obtenidos:', data.user);
        setUserDetails(data.user);
      }
    } catch (error) {
      console.error(' Error al obtener detalles del usuario:', error);
      toast.error('Error al cargar los datos del perfil');
    } finally {
      setIsLoading(false);
    }
  };

  //  Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  //  Usar updateProfile del contexto
  const handleUpdateProfile = async (updatedUserInfo) => {
    try {
      setIsLoading(true);
      
      // Llamar a updateProfile del contexto
      const result = await updateProfile(
        userDetails._id,
        currentRole,
        updatedUserInfo
      );

      if (result.success) {
        // Recargar los detalles del usuario
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

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const getWelcomeMessage = () => {
    if (!user) return "";
    const name = userDetails?.name || userDetails?.nameEmployees || userDetails?.nameVet || user?.name || "";
    const roleMessages = {
      client: `¡Hola${name ? `, ${name}` : ""}! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${name ? `, ${name}` : ""}! Panel de empleado`,
      vet: `¡Hola${name ? `, Dr. ${name}` : ""}! Panel veterinario`,
    };
    return roleMessages[currentRole] || `¡Hola${name ? `, ${name}` : ""}!`;
  };

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

  if (!user) {
    return (
      <div className="user-profile">
        <div className="auth-placeholder">
          <h2>Por favor, inicia sesión para ver tu perfil</h2>
          <button onClick={() => window.location.href = '/mainPage'} className="retry-button">
            Ir al Inicio            
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      {/* Botón de regreso */}
      <button onClick={handleGoBack} className="back-button">
        <ArrowLeft className="back-icon" size={20} />
        <span>Regresar</span>
      </button>

      {/* Mensaje de bienvenida */}
      <div className="welcome-section">
        <h1 className="welcome-message">{getWelcomeMessage()}</h1>
      </div>

      {/* Layout horizontal: Perfil a la izquierda, contenido a la derecha */}
      <div className="profile-and-content-wrapper">
        {/* Tarjeta de perfil - Columna Izquierda */}
        <div className="profile-container">
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

        {/* Contenido principal - Columna Derecha */}
        <div className="content-wrapper">
          {/* Menú de opciones según el rol */}
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
                {currentRole === 'client' && 'Cliente'}
                {currentRole === 'employee' && 'Empleado'}
                {currentRole === 'vet' && '🩺 Veterinario'}
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