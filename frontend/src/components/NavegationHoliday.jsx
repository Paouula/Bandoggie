import React from 'react';

const NavigationHoliday = ({ breadcrumbs, currentPage, onNavigate }) => {
  const handleItemClick = (item, index) => {
    // Solo navegar si no es el elemento activo
    if (item !== currentPage && onNavigate) {
      onNavigate(item, index);
    }
  };

  return (
    <>
      <style>{`
        /* Header Styles */
        .header {
          background-color: white;
          padding: 8px 16px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: center;
          overflow-x: auto;
        }

        .breadcrumbs {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #6b7280;
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

        @media (max-width: 640px) {
          .breadcrumbs {
            font-size: 13px;
            gap: 4px;
          }

          .header {
            padding: 8px 12px;
          }

          .breadcrumb-separator {
            margin: 0 6px;
          }
        }
      `}</style>

      <div className="header">
        <div className="breadcrumbs">
          {breadcrumbs.map((item, index) => {
            const isActive = item === currentPage;
            const isClickable = !isActive && onNavigate;
            
            return (
              <React.Fragment key={`${item}-${index}`}>
                <span 
                  className={`breadcrumb-item ${isActive ? 'active' : ''} ${isClickable ? 'clickable' : ''}`}
                  onClick={() => handleItemClick(item, index)}
                >
                  {item}
                </span>
                {index < breadcrumbs.length - 1 && (
                  <span className="breadcrumb-separator">▸</span>
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