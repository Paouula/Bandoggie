import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationHoliday = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Definir las rutas y sus nombres para el breadcrumb y navegación
  const routeMap = {
    '/': 'Inicio',
    '/Holiday': 'Navidad',
    '/HalloweenHoliday': 'Halloween',
    '/ValentineHoliday': 'San Valentín',
    '/PatrioticHoliday': 'Días Patrios',
    '/NewYearHoliday': 'Año Nuevo',
    '/BirthdayHoliday': 'Cumpleaños'
  };

  // Categorías principales de fiestas
  const holidayCategories = [
    { name: 'Navidad', route: '/Holiday' },
    { name: 'Halloween', route: '/HalloweenHoliday' },
    { name: 'San Valentín', route: '/ValentineHoliday' },
    { name: 'Días Patrios', route: '/PatrioticHoliday' },
    { name: 'Año Nuevo', route: '/NewYearHoliday' },
    { name: 'Cumpleaños', route: '/BirthdayHoliday' }
  ];

  // Generar breadcrumbs basado en la ruta actual
  const generateBreadcrumbs = () => {
    const currentPath = location.pathname;
    
    // Solo mostrar breadcrumbs si estamos en una página Holiday
    const holidayRoutes = ['/Holiday', '/HalloweenHoliday', '/ValentineHoliday', '/PatrioticHoliday', '/NewYearHoliday', '/BirthdayHoliday'];
    
    if (holidayRoutes.includes(currentPath)) {
      return ['Inicio', routeMap[currentPath]];
    }
    
    return [];
  };

  const breadcrumbs = generateBreadcrumbs();
  const currentPage = routeMap[location.pathname] || '';

  // Función para manejar la navegación
  const handleNavigate = (route) => {
    if (route !== location.pathname) {
      navigate(route);
    }
  };

  const handleBreadcrumbClick = (item, index) => {
    if (item === 'Inicio') {
      navigate('/');
    } else {
      const routePath = Object.keys(routeMap).find(key => routeMap[key] === item);
      if (routePath && routePath !== location.pathname) {
        navigate(routePath);
      }
    }
  };

  return (
    <>
      <style>{`
        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
          padding: 16px;
          border-bottom: 2px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .breadcrumbs {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 16px;
        }

        .breadcrumb-item {
          transition: color 0.2s ease;
          user-select: none;
        }

        .breadcrumb-item.clickable {
          cursor: pointer;
        }

        .breadcrumb-item.clickable:hover {
          color: #f97316;
        }

        .breadcrumb-item.active {
          color: #f97316;
          font-weight: 500;
          cursor: default;
        }

        .breadcrumb-separator {
          margin: 0 8px;
          color: #9ca3af;
        }

        /* Holiday Menu Navigation */
        .holiday-menu {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 8px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 14px;
          color: #6b7280;
          transition: color 0.2s ease;
          cursor: pointer;
          user-select: none;
          border: none;
          background: none;
          text-decoration: none;
        }

        .menu-item:hover {
          color: #f97316;
        }

        .menu-item.active {
          color: #f97316;
          font-weight: 500;
        }

        .menu-icon {
          font-size: 16px;
          display: flex;
          align-items: center;
        }

        .menu-text {
          font-size: 14px;
          font-weight: inherit;
        }

        .menu-separator {
          margin: 0 4px;
          color: #9ca3af;
          font-size: 12px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .header {
            padding: 12px 8px;
          }

          .holiday-menu {
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            gap: 8px;
            padding: 8px 12px;
            scrollbar-width: none;
            -ms-overflow-style: none;
            margin: 0 8px;
          }

          .holiday-menu::-webkit-scrollbar {
            display: none;
          }

          .menu-item {
            flex-shrink: 0;
            padding: 8px 12px;
            font-size: 13px;
            white-space: nowrap;
          }

          .menu-text {
            font-size: 13px;
          }

          .menu-icon {
            font-size: 14px;
          }

          .menu-separator {
            flex-shrink: 0;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 10px 4px;
          }

          .holiday-menu {
            padding: 8px 8px;
            margin: 0 4px;
          }

          .menu-item {
            padding: 6px 10px;
            gap: 4px;
          }

          .menu-text {
            font-size: 12px;
          }

          .menu-icon {
            font-size: 14px;
          }

          .menu-separator {
            margin: 0 2px;
            font-size: 10px;
          }
        }
      `}</style>

      <div className="header">
        {/* Holiday Menu Navigation */}
        <div className="holiday-menu">
          {holidayCategories.map((category, index) => {
            const isActive = location.pathname === category.route;
            
            return (
              <React.Fragment key={category.name}>
                <button
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavigate(category.route)}
                >
                  <span className="menu-icon">{category.icon}</span>
                  <span className="menu-text">{category.name}</span>
                </button>
                {index < holidayCategories.length - 1 && (
                  <span className="menu-separator">▸</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavigationHoliday;