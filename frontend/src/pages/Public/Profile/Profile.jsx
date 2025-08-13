import React, { useState } from 'react';
import { Package, MessageCircle, Star, Users, BarChart3, Settings, Shield, Stethoscope } from 'lucide-react';
import RoleSelector from '../../../components/Profile/RoleSelector';
import ProfileCard from '../../../components/Profile/ProfileCard';
import WelcomeSection from '../../../components/Profile/WelcomeSection';

const UserProfile = () => {
  const [currentRole, setCurrentRole] = useState('client');
  const [isEditing, setIsEditing] = useState(false);

  const emptyUserData = {
    name: '',
    email: '',
    birthDate: '',
    phone: '',
    password: ''
  };

  const [userInfo, setUserInfo] = useState(emptyUserData);

  const menuConfig = {
    client: [
      { id: 1, icon: <Package className="menu-icon icon-orders" />, text: 'Tus pedidos', badge: null, hasArrow: true },
      { id: 2, icon: <MessageCircle className="menu-icon icon-messages" />, text: 'Mensajes', badge: 2, hasArrow: true },
      { id: 3, icon: <Star className="menu-icon icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true }
    ],
    employee: [
      { id: 2, icon: <Package className="menu-icon icon-orders" />, text: 'Gestión de Pedidos', badge: 8, hasArrow: true },
      { id: 3, icon: <Users className="menu-icon icon-clients" />, text: 'Clientes', badge: null, hasArrow: true },
      { id: 4, icon: <Settings className="menu-icon icon-settings" />, text: 'Configuración', badge: null, hasArrow: true }
    ],
    vet: [
      { id: 2, icon: <MessageCircle className="menu-icon icon-consultations" />, text: 'Consultas', badge: 5, hasArrow: true },
      { id: 3, icon: <Star className="menu-icon icon-reviews" />, text: 'Reseñas', badge: null, hasArrow: true },
      { id: 4, icon: <Shield className="menu-icon icon-certifications" />, text: 'Certificaciones', badge: null, hasArrow: true }
    ]
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <RoleSelector 
        currentRole={currentRole} 
        onRoleChange={handleRoleChange} 
      />
      
      <div className="profile-container">
        <ProfileCard 
          userInfo={userInfo}
          isEditing={isEditing}
          onInputChange={handleInputChange}
          onEditToggle={handleEditToggle}
        />
        
        <WelcomeSection 
          userName={userInfo.name}
          menuItems={menuConfig[currentRole]}
        />
      </div>
      
      <style jsx>{`
        .user-profile { 
          min-height: 100vh; 
          background: #ECF2F9; 
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
        
        @media (max-width: 640px) {
          .user-profile {
            padding: 15px;
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