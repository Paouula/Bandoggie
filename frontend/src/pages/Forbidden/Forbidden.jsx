function Forbidden() {
    return (
      <div>
        {/* CSS Styles */}
        <style jsx>{`
          .forbidden-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom right, #fef3c7, #fed7aa, #fecaca);
            color: #7c2d12;
            padding: 0 1rem;
            position: relative;
            overflow: hidden;
          }
  
          .bg-element-1 {
            position: absolute;
            top: 2.5rem;
            left: 2.5rem;
            width: 8rem;
            height: 8rem;
            background-color: rgba(252, 165, 165, 0.3);
            border-radius: 50%;
          }
  
          .bg-element-2 {
            position: absolute;
            bottom: 5rem;
            right: 5rem;
            width: 10rem;
            height: 10rem;
            background-color: rgba(254, 215, 170, 0.3);
            border-radius: 50%;
          }
  
          .bg-element-3 {
            position: absolute;
            top: 33.333333%;
            right: 25%;
            width: 6rem;
            height: 6rem;
            background-color: rgba(254, 202, 202, 0.3);
            border-radius: 50%;
          }
  
          .content-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            max-width: 28rem;
            text-align: center;
            position: relative;
            z-index: 10;
          }
  
          .error-title {
            font-size: 3.75rem;
            line-height: 1;
            font-weight: 700;
            background: linear-gradient(to right, #f97316, #ef4444, #dc2626);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
  
          .message-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
  
          .message-title {
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: #dc2626;
          }
  
          .message-text {
            color: #a16207;
            line-height: 1.625;
          }
  
          .back-button {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: linear-gradient(to right, #fed7aa, #fde68a);
            color: #92400e;
            font-weight: 600;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            text-decoration: none;
            transform: scale(1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
  
          .back-button:hover {
            background: linear-gradient(to right, #fdba74, #fcd34d);
            transform: scale(1.05);
          }
  
          @media (max-width: 640px) {
            .error-title {
              font-size: 3rem;
            }
            
            .content-container {
              gap: 1.5rem;
            }
            
            .bg-element-1,
            .bg-element-2,
            .bg-element-3 {
              width: 4rem;
              height: 4rem;
            }
          }
        `}</style>
  
        {/* Component HTML */}
        <div className="forbidden-container">
          {/* Subtle background elements */}
          <div className="bg-element-1"></div>
          <div className="bg-element-2"></div>
          <div className="bg-element-3"></div>
          
          <div className="content-container">
            {/* 403 Text with gradient */}
            <h2 className="error-title">403</h2>
            
            {/* Message */}
            <div className="message-section">
              <h3 className="message-title">
                ¡Woof! Acceso denegado
              </h3>
              <p className="message-text">
                No tienes los permisos necesarios para acceder a esta página.
              </p>
            </div>
            
            {/* Button */}
            <a 
              className="back-button"
              href="/"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  export default Forbidden;