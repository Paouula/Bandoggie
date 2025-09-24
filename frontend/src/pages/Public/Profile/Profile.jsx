import React, { useState, useEffect } from 'react';
import { Package, MessageCircle, Star, Users, BarChart3, Settings, Shield, Stethoscope } from 'lucide-react';
import ProfileCard from '../../../components/Profile/ProfileCard';
// CORRECCIÓN: Importación del hook correcto
import useFetchProfileCard from '../../../hooks/Profile/useFetchProfileCard';

const UserProfile = () => {
  // Desestructuración correcta del hook
  const {
    userInfo,
    isLoading,
    isAuthenticated,
    handleInputChange,
    updateUserData,
    fetchUserData, // Cambié refreshUserData por fetchUserData que es lo que retorna el hook
    // Agregando propiedades de debug si están disponibles
    debugInfo,
    hasToken,
    apiBaseUrl
  } = useFetchProfileCard();

  const [isEditing, setIsEditing] = useState(false);

  // El rol se obtiene automáticamente del usuario autenticado
  const currentRole = userInfo?.userType || 'client';

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
    const handleAuthChange = () => {
      fetchUserData(); // Corregido el nombre de la función
    };
    // Cleanup logic aquí si es necesario
  }, [fetchUserData]);

  const getWelcomeMessage = () => {
    if (!isAuthenticated) {
      return '';
    }

    const roleMessages = {
      // CORRECCIÓN: Template literals arreglados
      client: `¡Hola${userInfo?.name ? `, ${userInfo.name}` : ''}! Bienvenido a tu perfil de cliente`,
      employee: `¡Hola${userInfo?.name ? `, ${userInfo.name}` : ''}! Panel de empleado`,
      vet: `¡Hola${userInfo?.name ? `, Dr. ${userInfo.name}` : ''}! Panel veterinario`
    };

    return roleMessages[currentRole] || `¡Hola${userInfo?.name ? `, ${userInfo.name}` : ''}!`;
  };

  // Debug component (temporal para diagnosticar)
  const DebugPanel = () => {
    if (!debugInfo) return null;
    
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: 10, 
        right: 10, 
        background: 'rgba(0,0,0,0.9)', 
        color: 'white', 
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '400px',
        maxHeight: '300px',
        overflow: 'auto',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#4CAF50' }}>
          🐛 Debug Panel
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>API:</strong> {apiBaseUrl}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Token:</strong> {hasToken ? '✅ Presente' : '❌ Ausente'}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Autenticado:</strong> {isAuthenticated ? '✅ Sí' : '❌ No'}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>Cargando:</strong> {isLoading ? '⏳ Sí' : '✅ No'}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>UserType:</strong> {userInfo?.userType || 'Sin tipo'}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <strong>UserName:</strong> {userInfo?.name || 'Sin nombre'}
        </div>
        <hr style={{ margin: '8px 0', borderColor: '#333' }} />
        <div style={{ maxHeight: '150px', overflow: 'auto' }}>
          {debugInfo.slice(-5).map((debug, i) => (
            <div key={i} style={{ marginBottom: '4px', fontSize: '11px' }}>
              <span style={{ color: '#FFB74D' }}>[{debug.timestamp}]</span>{' '}
              <span style={{ color: '#E1F5FE' }}>{debug.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mostrar loading mientras se cargan los datos
  if (isLoading) {
    return (
      <div className="user-profile">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando perfil...</p>
        </div>
        <DebugPanel />
        <style jsx>{`
          .user-profile {
            min-height: 100vh;
            background: linear-gradient(135deg, #ECF2F9 0%, #E3F2FD 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading-container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e3f2fd;
            border-top: 4px solid #2196f3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Mostrar mensaje si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="user-profile">
        <div className="auth-placeholder">
          <h2>Por favor, inicia sesión para ver tu perfil</h2>
          <p>Necesitas estar autenticado para acceder a esta página.</p>
          <button 
            onClick={fetchUserData}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Reintentar
          </button>
        </div>
        <DebugPanel />
        <style jsx>{`
          .user-profile {
            min-height: 100vh;
            background: linear-gradient(135deg, #ECF2F9 0%, #E3F2FD 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
          }
          .auth-placeholder {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="user-profile">
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
        
        {/*<WelcomeSection 
          userName={userInfo?.name}
          welcomeMessage={getWelcomeMessage()}
          menuItems={menuConfig[currentRole] || menuConfig.client}
        />*/}
  </div>

      
      
      {/* Panel de debug temporal */}
      <DebugPanel />
      
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
      `}</style>
    </div>
  );
};

export default UserProfile;