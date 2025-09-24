import React from 'react';
import VisionDog from '../../../img/AboutUs/VisionDog.png';

const VisionCard = () => {
  return (
    <>
      <div className="vision-container">
        <div className="vision-card">
          <div className="vision-content">
            <div className="vision-image">
              <div className="image-container">
                <img src={VisionDog} alt="Vision Dog" />
                <div className="floating-elements">
                  <div className="floating-dot dot-1"></div>
                  <div className="floating-dot dot-2"></div>
                  <div className="floating-dot dot-3"></div>
                </div>
              </div>
            </div>
            
            <div className="vision-text">
              <div className="vision-header">
                <h2>Visión</h2>
              </div>
              <p className="vision-description">
                Miramos al futuro con el propósito de ser el aliado integral líder para dueños de mascotas, clínicas 
                veterinarias y centros de grooming en nuestra región. Queremos ser reconocidos por nuestra 
                variedad destacada de productos (alimentos, accesorios, higiene, juguetes).Facilitadores del 
                bienestar animal, apoyando el trabajo de clínicas y groomers con materiales confiables. Un espacio 
                donde la experiencia humana, profesional y afectiva se entrelaza.Aspiramos a ser ese punto de encuentro 
                que nutre no solo a las mascotas, sino también a quienes las cuidan día a día.
              </p>
              
              <div className="mission-stats">
                <div className="stat-item">
                  <span className="stat-number-space">-</span>
                  <span className="stat-label">Mascotas Felices</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Multiples</span>
                  <span className="stat-label">Productos Vendidos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number-space">-</span>
                  <span className="stat-label">Años Experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vision-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }

        .vision-card {
          border-radius: 2rem;
          padding: 2rem;
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
          position: relative;
        }

        .vision-content {
          display: grid;
          grid-template-columns: 350px 1fr;
          min-height: 500px;
          align-items: stretch;
          position: relative;
          gap: 2rem;
        }

        .vision-image {
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          position: relative;
        }

        .image-container {
          position: relative;
          width: 100%;
          max-width: 280px;
          height: auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .image-container img {
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: cover;
          border-radius: 2rem;
          z-index: 2;
          position: relative;
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .floating-dot {
          position: absolute;
          border-radius: 50%;
          background: rgba(219, 39, 119, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        .dot-1 {
          width: 60px;
          height: 60px;
          top: 20%;
          right: 10%;
          animation-delay: 0s;
        }

        .dot-2 {
          width: 40px;
          height: 40px;
          bottom: 30%;
          left: 5%;
          animation-delay: 1s;
        }

        .dot-3 {
          width: 30px;
          height: 30px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .vision-text {
          padding: 2rem;
          color: #1f2937;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .vision-header {
          margin-bottom: 1.5rem;
        }

        .vision-text h2 {
          font-size: 3rem;
          font-weight: bold;
          margin: 0;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .vision-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.95;
          font-weight: 500;
        }

        .vision-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          justify-content: flex-start;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stat-number-space {
          font-size: 1.5rem;
          font-weight: bold;
          color: #66666600;;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.85;
          font-weight: 500;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        /* Background pattern */
        .vision-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          background-image: radial-gradient(circle at 20% 80%, rgba(219, 39, 119, 0.2) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(219, 39, 119, 0.15) 0%, transparent 50%);
        }

        @media (max-width: 768px) {
          .vision-container {
            padding: 1rem;
          }

          .vision-card {
            padding: 1.5rem;
          }

          .vision-content {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 1rem;
          }

          .vision-image {
            order: 1;
            padding: 1rem;
          }

          .vision-text {
            padding: 1rem;
            order: 2;
            text-align: center;
          }

          .vision-text h2 {
            font-size: 2.5rem;
          }

          .vision-stats {
            flex-direction: row;
            gap: 1.5rem;
            align-items: flex-start;
            justify-content: center;
          }

          .image-container {
            max-width: 250px;
            height: 300px;
          }

          .dot-1 {
            width: 40px;
            height: 40px;
          }

          .dot-2 {
            width: 30px;
            height: 30px;
          }

          .dot-3 {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .vision-text {
            padding: 1rem;
          }

          .vision-text h2 {
            font-size: 2rem;
          }

          .vision-stats {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }

          .stat-item {
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default VisionCard;