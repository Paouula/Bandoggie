import React, { useState } from 'react';
import { Camera, Package, MessageCircle, Star, ChevronRight } from 'lucide-react';
import './Profile.css'; // Importar el archivo CSS

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Mirian Morales',
    email: 'mirianmorales@gmail.com',
    birthDate: '24/05/1997',
    phone: '7456-9421',
    password: '••••••••••••'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const menuItems = [
    {
      id: 1,
      icon: <Package className="menu-icon icon-orders" />,
      text: 'Tus pedidos',
      badge: null,
      hasArrow: true
    },
    {
      id: 2,
      icon: <MessageCircle className="menu-icon icon-messages" />,
      text: 'Mensajes',
      badge: 2,
      hasArrow: true
    },
    {
      id: 3,
      icon: <Star className="menu-icon icon-reviews" />,
      text: 'Reseñas',
      badge: null,
      hasArrow: true
    }
  ];

  return (
    <div className="user-profile">
      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src="/api/placeholder/120/120" 
                alt="Profile Avatar" 
                className="avatar-image"
              />
              <div className="camera-icon">
                <Camera size={16} />
              </div>
            </div>
          </div>

          <form className="profile-form">
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="form-input"
                readOnly={!isEditing}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="form-input"
                readOnly={!isEditing}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="text"
                  value={userInfo.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="form-input"
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="form-input"
                  readOnly={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                value={userInfo.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="form-input"
                readOnly={!isEditing}
              />
            </div>

            <button 
              type="button" 
              onClick={handleEdit}
              className="edit-button"
            >
              {isEditing ? 'Guardar' : 'Editar'}
            </button>
          </form>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <h1 className="welcome-title">Mirian Morales</h1>
          <p className="welcome-subtitle">¡Bienvenido/a a tu perfil!</p>
          <p className="welcome-description">
            Aquí podrás gestionar tus datos, ver tus pedidos y 
            personalizar tus productos favoritos.
          </p>
          <p className="welcome-description">
            Gracias por confiar en nosotros para consentir a tu mejor 
            amigo.
          </p>

          <div className="menu-options">
            {menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-left">
                  {item.icon}
                  <span className="menu-text">{item.text}</span>
                </div>
                <div className="menu-item-right">
                  {item.badge && (
                    <span className="menu-badge">{item.badge}</span>
                  )}
                  {item.hasArrow && (
                    <ChevronRight className="menu-arrow" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;