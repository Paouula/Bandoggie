import React, { useState, useEffect } from 'react';
import {
  Package,
  MessageCircle,
  Star,
  Users,
  BarChart3,
  Settings,
  Shield,
  Stethoscope,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import ProfileCard from '../../../components/Profile/ProfileCard';
import { API_FETCH_JSON } from '../../../config';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentRole = user?.userType || userDetails?.userType || 'client';

  const menuConfig = {
    client: [
      { id: 1, icon: <Package className="profile-menu-icon profile-icon-orders" />, text: 'Tus pedidos', badge: null, hasArrow: true },
      { id: 2, icon: <MessageCircle className="profile-menu-icon profile-icon-messages" />, text: 'Mensajes', badge: 2, hasArrow: true },
      { id: 3, icon: <Star className="profile-menu-icon profile-icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true }
    ],
    employee: [
      { id: 1, icon: <Package className="profile-menu-icon profile-icon-orders" />, text: 'Gestión de Pedidos', badge: 8, hasArrow: true },
      { id: 2, icon: <Users className="profile-menu-icon profile-icon-clients" />, text: 'Clientes', badge: null, hasArrow: true },
      { id: 3, icon: <BarChart3 className="profile-menu-icon profile-icon-analytics" />, text: 'Análisis', badge: null, hasArrow: true },
      { id: 4, icon: <Settings className="profile-menu-icon profile-icon-settings" />, text: 'Configuración', badge: null, hasArrow: true }
    ],
    vet: [
      { id: 1, icon: <Stethoscope className="profile-menu-icon profile-icon-consultations" />, text: 'Consultas', badge: 5, hasArrow: true },
      { id: 2, icon: <MessageCircle className="profile-menu-icon profile-icon-messages" />, text: 'Mensajes', badge: 3, hasArrow: true },
      { id: 3, icon: <Star className="profile-menu-icon profile-icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true },
      { id: 4, icon: <Shield className="profile-menu-icon profile-icon-certifications" />, text: 'Certificaciones', badge: null, hasArrow: true }
    ]
  };

  // Obtener detalles completos del usuario
  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const data = await API_FETCH_JSON('login/auth/me', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
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

  // Actualizar perfil del usuario
  const updateUserProfile = async (updatedData) => {
    try {
      // Filtrar datos vacíos
      const dataToSend = {};
      Object.keys(updatedData).forEach(key => {
        if (updatedData[key] !== '' && updatedData[key] !== null && updatedData[key] !== undefined) {
          dataToSend[key] = updatedData[key];
        }
      });

      // Determinar el endpoint según el tipo de usuario
      let endpoint = '';
      if (currentRole === 'client') {
        endpoint = `users/client/${userDetails._id}`;
      } else if (currentRole === 'vet') {
        endpoint = `users/vet/${userDetails._id}`;
      } else if (currentRole === 'employee') {
        endpoint = `users/employee/${userDetails._id}`;
      }

      const response = await API_FETCH_JSON(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: dataToSend
      });

      if (response) {
        toast.success('Perfil actualizado correctamente');
        await fetchUserDetails(); // Recargar datos
        return true;
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      toast.error(error.message || 'Error al actualizar el perfil');
      return false;
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (field, value) => {
    setUserDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleUpdateProfile = async (updatedUserInfo) => {
    const success = await updateUserProfile(updatedUserInfo);
    return success;
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
    if (!user) return '';
    const name = userDetails?.name || user?.name || '';
    const roleMessages = {
      client: `¡Hola${name ? `, ${name}` : ''}! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${name ? `, ${name}` : ''}! Panel de empleado`,
      vet: `¡Hola${name ? `, Dr. ${name}` : ''}! Panel veterinario`
    };
    return roleMessages[currentRole] || `¡Hola${name ? `, ${name}` : ''}!`;
  };

  if (isLoading) {
    return (
      <div className="profile-page">
        <div className="profile-loading-container">
          <div className="profile-loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-auth-placeholder">
          <h2>Por favor, inicia sesión para ver tu perfil</h2>
          <button onClick={() => window.location.href = '/mainPage'} className="profile-retry-button">
            Ir al Inicio            
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Botón de regreso */}
      <button onClick={handleGoBack} className="profile-back-button">
        <ArrowLeft className="profile-back-icon" size={20} />
        <span>Regresar</span>
      </button>

      {/* Mensaje de bienvenida */}
      <div className="profile-welcome-section">
        <h1 className="profile-welcome-message">{getWelcomeMessage()}</h1>
      </div>

      {/* Layout horizontal: Perfil a la izquierda, contenido a la derecha */}
      <div className="profile-layout-wrapper">
        {/* Tarjeta de perfil - Columna Izquierda */}
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

        {/* Contenido principal - Columna Derecha */}
        <div className="profile-content-wrapper">
          {/* Menú de opciones según el rol */}
          <div className="profile-menu-section">
            <h2 className="profile-menu-title">Opciones</h2>
            <div className="profile-menu-list">
              {menuConfig[currentRole]?.map((item) => (
                <button key={item.id} className="profile-menu-item">
                  <div className="profile-menu-item-content">
                    {item.icon}
                    <span className="profile-menu-text">{item.text}</span>
                    {item.badge && (
                      <span className="profile-menu-badge">{item.badge}</span>
                    )}
                  </div>
                  {item.hasArrow && <ChevronRight className="profile-menu-arrow" size={20} />}
                </button>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className="profile-info-section">
            <div className="profile-info-card">
              <h3>Tipo de cuenta</h3>
              <p className="profile-user-type">
                {currentRole === 'client' && 'Cliente'}
                {currentRole === 'employee' && 'Empleado'}
                {currentRole === 'vet' && 'Veterinario'}
              </p>
            </div>
            
            {/* Botón de cerrar sesión */}
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