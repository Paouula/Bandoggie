import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationHoliday = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const holidayRouteNames = {
    '/': 'Inicio',
    '/holidays': 'Navidad',
    '/halloween': 'Halloween',
    '/valentine': 'San Valentín',
    '/patriotic': 'Días Patrios',
    '/newyear': 'Año Nuevo',
    '/birthday': 'Cumpleaños'
  };

  const holidayMenuOptions = [
    { name: 'Navidad', route: '/holidays' },
    { name: 'Halloween', route: '/halloween' },
    { name: 'San Valentín', route: '/valentine' },
    { name: 'Días Patrios', route: '/patriotic' },
    { name: 'Año Nuevo', route: '/newyear' },
    { name: 'Cumpleaños', route: '/birthday' }
  ];

  const getBreadcrumbItems = () => {
    const currentPath = location.pathname;
    const holidayPaths = Object.keys(holidayRouteNames).filter(path => path !== '/');

    if (holidayPaths.includes(currentPath)) {
      return ['Inicio', holidayRouteNames[currentPath]];
    }

    return [];
  };

  const breadcrumbItems = getBreadcrumbItems();
  const currentHolidayPage = holidayRouteNames[location.pathname] || '';

  const navigateToHolidayPage = (route) => {
    if (route !== location.pathname) {
      navigate(route);
    }
  };

  const handleBreadcrumbNavigation = (label) => {
    if (label === 'Inicio') {
      navigate('/');
    } else {
      const targetRoute = Object.keys(holidayRouteNames).find(
        key => holidayRouteNames[key] === label
      );
      if (targetRoute && targetRoute !== location.pathname) {
        navigate(targetRoute);
      }
    }
  };

  return (
    <>
      <style>{`
        .header {
          background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%) !important;
          padding: 16px !important;
        }

        .holiday-menu {
          display: flex !important;
          flex-wrap: wrap !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          max-width: 1200px !important;
          margin: 0 auto !important;
          padding: 0 16px !important;
        }

        .menu-item {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          padding: 8px 12px !important;
          font-size: 14px !important;
          color: #6b7280 !important;
          transition: color 0.2s ease !important;
          cursor: pointer !important;
          user-select: none !important;
          border: none !important;
          background: none !important;
          text-decoration: none !important;
        }

        .menu-item:hover {
          color: #f97316 !important;
        }

        .menu-item.active {
          color: #f97316 !important;
          font-weight: 500 !important;
        }

        .menu-icon {
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
        }

        .menu-text {
          font-size: 14px !important;
          font-weight: inherit !important;
        }

        .menu-separator {
          margin: 0 4px !important;
          color: #9ca3af !important;
          font-size: 12px !important;
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 8px !important;
          }

         .holiday-menu {
      display: flex !important;
      flex-wrap: nowrap !important;           /* ❗ Importante: evita que se dividan en varias filas */
      overflow-x: auto !important;            /* ❗ Agrega scroll si no caben */
      -webkit-overflow-scrolling: touch !important;
      white-space: nowrap !important;         /* ❗ Fuerza todos los elementos en línea */
      align-items: center !important;
      justify-content: flex-start !important;
      gap: 8px !important;
      padding: 0 16px !important;
      margin: 0 auto !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
      max-width: 100% !important;
    }

          .holiday-menu::-webkit-scrollbar {
            display: none !important;
          }

          .menu-item {
            flex-shrink: 0 !important;
            padding: 8px 12px !important;
            font-size: 13px !important;
            white-space: nowrap !important;
          }

          .menu-text {
            font-size: 13px !important;
          }

          .menu-icon {
            font-size: 14px !important;
          }

          .menu-separator {
            flex-shrink: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .header {
            padding: 10px 4px !important;
          }

          .holiday-menu {
            padding: 8px 8px !important;
            margin: 0 4px !important;
          }

          .menu-item {
            padding: 6px 10px !important;
            gap: 4px !important;
          }

          .menu-text {
            font-size: 12px !important;
          }

          .menu-icon {
            font-size: 14px !important;
          }

          .menu-separator {
            margin: 0 2px !important;
            font-size: 10px !important;
          }
        }
      `}</style>

      <div className="header">
        <div className="holiday-menu">
          {holidayMenuOptions.map((menuOption, index) => {
            const isActive = location.pathname === menuOption.route;

            return (
              <React.Fragment key={menuOption.name}>
                <button
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => navigateToHolidayPage(menuOption.route)}
                  type="button"
                >
                  <span className="menu-icon">{menuOption.icon}</span>
                  <span className="menu-text">{menuOption.name}</span>
                </button>
                {index < holidayMenuOptions.length - 1 && (
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
