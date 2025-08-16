import React, { useState, useEffect } from 'react';
import { Package, MessageCircle, Star, Users, BarChart3, Settings, Shield, Stethoscope } from 'lucide-react';
import RoleSelector from '../../../components/Profile/RoleSelector';
import ProfileCard from '../../../components/Profile/ProfileCard';
import WelcomeSection from '../../../components/Profile/WelcomeSection';
import useFetchProfile from '../../../hooks/Profile/useFetchProfileCard';

const UserProfile = () => {
  const {
    userInfo,
    isLoading,
    isAuthenticated,
    handleInputChange,
    updateUserData,
    refreshUserData
  } = useFetchProfile();

  const [isEditing, setIsEditing] = useState(false);

  // El rol se obtiene automáticamente del usuario autenticado
  const currentRole = userInfo.userType || 'client';

  const menuConfig = {
    client: [
      { id: 1, icon: <Package className="menu-icon icon-orders" />, text: 'Tus pedidos', badge: null, hasArrow: true },
      { id: 2, icon: <MessageCircle className="menu-icon icon-messages" />, text: 'Mensajes', badge: 2, hasArrow: true },
      { id: 3, icon: <Star className="menu-icon icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true }
    ],
    employee: [
      { id: 1, icon: <Package className="menu-icon icon-orders" />, text: 'Gestión de Pedidos', badge: 8, hasArrow: true },
      { id: 2, icon: <Users className="menu-icon icon-clients" />, text: 'Clientes', badge: null, hasArrow: true },
      { id: 3, icon: <BarChart3 className="menu-icon icon-analytics" />, text: 'Análisis', badge: null, hasArrow: true },
      { id: 4, icon: <Settings className="menu-icon icon-settings" />, text: 'Configuración', badge: null, hasArrow: true }
    ],
    vet: [
      { id: 1, icon: <Stethoscope className="menu-icon icon-consultations" />, text: 'Consultas', badge: 5, hasArrow: true },
      { id: 2, icon: <MessageCircle className="menu-icon icon-messages" />, text: 'Mensajes', badge: 3, hasArrow: true },
      { id: 3, icon: <Star className="menu-icon icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true },
      { id: 4, icon: <Shield className="menu-icon icon-certifications" />, text: 'Certificaciones', badge: null, hasArrow: true }
    ]
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async (updatedUserInfo) => {
    const success = await updateUserData(updatedUserInfo);
    return success;
  };

  // Refrescar datos cuando se detecte un cambio en la autenticación
  useEffect(() => {
    // Escuchar eventos de login/logout globales si los tienes implementados
    const handleAuthChange = () => {
      refreshUserData();
    };

    // Si tienes un event listener global para cambios de autenticación
    // window.addEventListener('authStateChange', handleAuthChange);

    // Cleanup
    // return () => {
    //   window.removeEventListener('authStateChange', handleAuthChange);
    // };
  }, [refreshUserData]);

  const getWelcomeMessage = () => {
    if (!isAuthenticated) {
      return '';
    }

    const roleMessages = {
      client: `¡Hola${userInfo.name ? `, ${userInfo.name}` : ''}! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${userInfo.name ? `, ${userInfo.name}` : ''}! Panel de empleado`,
      vet: `¡Hola${userInfo.name ? `, Dr. ${userInfo.name}` : ''}! Panel veterinario`
    };

    return roleMessages[currentRole] || `¡Hola${userInfo.name ? `, ${userInfo.name}` : ''}!`;
  };

  return (
    <div className="user-profile">
      {/* Solo mostrar el selector de rol si el usuario está autenticado y es necesario */}
      {isAuthenticated && false && ( // Desactivado porque el rol se obtiene del login
        <RoleSelector 
          currentRole={currentRole} 
          onRoleChange={() => {}} // Disabled porque el rol viene del backend
        />
      )}
      
      <div className="profile-container">
        <ProfileCard 
          userInfo={userInfo}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onEditToggle={handleEditToggle}
          onUpdateProfile={handleUpdateProfile}
          isLoading={isLoading}
          isAuthenticated={isAuthenticated}
        />
        
        {isAuthenticated && (
          <WelcomeSection 
            userName={userInfo.name}
            welcomeMessage={getWelcomeMessage()}
            menuItems={menuConfig[currentRole] || menuConfig.client}
          />
        )}
      </div>
      
      <style jsx>{`
        .user-profile { 
          min-height: 100vh; 
          background: linear-gradient(135deg, #ECF2F9 0%, #E3F2FD 100%); 
          padding: 20px; 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
        }
        
        .profile-container { 
          max-width: 1200px; 
          margin: 0 auto; 
          display: flex; 
          flex-direction: row; 
          gap: 30px; 
          align-items: flex-start; 
        }

        /* Animaciones y mejoras visuales */
        .profile-container > :global(*) {
          animation: slideInUp 0.6s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 640px) {
          .user-profile {
            padding: 15px;
            background: #ECF2F9;
          }
          
          .profile-container {
            flex-direction: column;
            gap: 20px;
          }
        }
        
        @media (max-width: 900px) {
          .profile-container {
            flex-direction: column;
            gap: 20px;
          }
          
          .profile-container > :global(*) {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }
        }

        /* Estado no autenticado */
        .profile-container:has(.auth-placeholder) {
          justify-content: center;
          align-items: center;
          min-height: 60vh;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;