import React, { useState, useEffect } from 'react';
//  AGREGADO: Importar useNavigate para la navegación entre páginas
import { useNavigate } from 'react-router-dom';
import {
  Package,
  MessageCircle,
  Star,
  Users,
  BarChart3,
  Settings,
  Shield,
  Stethoscope,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import ProfileCard from '../../../components/Profile/ProfileCard';
import { API_FETCH_JSON } from '../../../config';
import { toast } from 'react-hot-toast';
import './UserProfile.css';

const UserProfile = () => {
  const { user, logout } = useAuth();
  //  AGREGADO: Hook para navegar programáticamente a otras rutas
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const currentRole = user?.userType || userDetails?.userType || 'client';

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

  // ✅ AGREGADO: Función para manejar los clics en las opciones del menú
  // Navega a la página correspondiente según el texto del item clickeado
  const handleMenuClick = (itemText) => {
    // Si es "Tus pedidos" (cliente) o "Gestión de Pedidos" (empleado)
    if (itemText === 'Tus pedidos' || itemText === 'Gestión de Pedidos') {
      // Navegar a la página de historial de pedidos
      navigate('/order-history');
    } else {
      // Para las demás opciones, mostrar un mensaje temporal
      toast.info('Esta sección estará disponible próximamente');
    }
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
        console.log('✅ Detalles del usuario obtenidos:', data.user);
        setUserDetails(data.user);
      }
    } catch (error) {
      console.error('❌ Error al obtener detalles del usuario:', error);
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
      {/* Mensaje de bienvenida */}
      <div className="welcome-section">
        <h1 className="welcome-message">{getWelcomeMessage()}</h1>
      </div>

      {/* Tarjeta de perfil */}
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

      {/* Menú de opciones según el rol */}
      <div className="menu-section">
        <h2 className="menu-title">Opciones</h2>
        <div className="menu-list">
          {menuConfig[currentRole]?.map((item) => (
            <button 
              key={item.id} 
              className="menu-item"
              // ✅ AGREGADO: onClick para manejar la navegación al hacer clic
              // Llama a handleMenuClick pasando el texto del item para determinar a dónde navegar
              onClick={() => handleMenuClick(item.text)}
            >
              <div className="menu-item-content">
                {item.icon}
                <span className="menu-text">{item.text}</span>
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
              </div>
              {item.hasArrow && <ChevronRight className="menu-arrow" size={20} />}
            </button>
          ))}
        </div>
      </div>

      {/* Información adicional */}
      <div className="info-section">
        <div className="info-card">
          <h3>Tipo de cuenta</h3>
          <p className="user-type-display">
            {currentRole === 'client' && '👤 Cliente'}
            {currentRole === 'employee' && '💼 Empleado'}
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
  );
};

export default UserProfile;