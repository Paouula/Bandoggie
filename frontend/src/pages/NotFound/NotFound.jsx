function NotFound() {
    return (
      <div>
        {/* CSS Styles */}
        <style jsx>{`
          .not-found-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(to bottom right, #f3e8ff, #dbeafe, #e0e7ff);
            color: #1f2937;
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
            background-color: rgba(251, 207, 232, 0.3);
            border-radius: 50%;
          }
  
          .bg-element-2 {
            position: absolute;
            bottom: 5rem;
            right: 5rem;
            width: 10rem;
            height: 10rem;
            background-color: rgba(191, 219, 254, 0.3);
            border-radius: 50%;
          }
  
          .bg-element-3 {
            position: absolute;
            top: 33.333333%;
            right: 25%;
            width: 6rem;
            height: 6rem;
            background-color: rgba(254, 240, 138, 0.3);
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
            background: linear-gradient(to right, #fb7185, #f472b6, #c084fc);
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
            color: #8b5cf6;
          }
  
          .message-text {
            color: #6b7280;
            line-height: 1.625;
          }
  
          .back-button {
            display: inline-block;
            padding: 0.75rem 2rem;
            background: linear-gradient(to right, #fda4af, #f9a8d4);
            color: #374151;
            font-weight: 600;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            text-decoration: none;
            transform: scale(1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
  
          .back-button:hover {
            background: linear-gradient(to right, #fb7185, #f472b6);
            transform: scale(1.05);
          }
  
          @media (max-width: 640px) {
            .error-title {
              font-size: 450px;
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
        <div className="not-found-container">
          {/* Subtle background elements */}
        
          
          <div className="content-container">
            {/* 404 Text with gradient */}
            <h2 className="error-title">404</h2>
            
            {/* Message */}
            <div className="message-section">
              <h3 className="message-title">
                ¡Woof! Página no encontrada
              </h3>
              <p className="message-text">
                La página que buscas no existe o ha sido eliminada.
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
  
  export default NotFound;