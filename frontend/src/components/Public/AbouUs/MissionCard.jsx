import React from 'react';
import MisionDog from '../../../img/AboutUs/MisionDog.png';

const MissionCard = () => {
  return (
    <>
      <div className="mission-container">
        <div className="mission-card">
          <div className="mission-content">
            <div className="mission-text">
              <div className="mission-header">
                <h2>Misión</h2>
              </div>
              <p className="mission-description">
                En Huellitas Pet Shop, nuestra misión es ofrecer productos y servicios de primera calidad que mejoren la 
                vida de las mascotas, respaldados por una asesoría cercana y experta. Nos esforzamos por ser un puente entre los cuidadores, 
                dueños, clínicas veterinarias y groomers. Inspirados por valores como el compromiso y ternura: tratamos a cada mascota 
                como si fuera nuestra. Con calidad y confiabilidad, brindamos productos que tus aliados de cuidado pueden recomendar 
                con confianza. Colaboración profesional: trabajamos de la mano con veterinarios y groomers para asegurar que cada 
                peludo reciba lo mejor.Nuestro enfoque busca fortalecer la comunidad pet‑friendly, promoviendo el cuidado informado, 
                responsable y lleno de cariño.
              </p>
              
              <div className="mission-stats">
                <div className="stat-item">
                  <span className="stat-number">5k+</span>
                  <span className="stat-label">Mascotas Felices</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Productos Vendidos</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">22+</span>
                  <span className="stat-label">Años Experiencia</span>
                </div>
              </div>
            </div>
            
            <div className="mission-image">
              <div className="image-container">
                <img src={MisionDog} alt="Mission Dog" />
                <div className="floating-elements">
                  <div className="floating-dot dot-1"></div>
                  <div className="floating-dot dot-2"></div>
                  <div className="floating-dot dot-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mission-container {
          display: flex;
          justify-content: center;
          padding: 2rem;
        }

        .mission-card {
          border-radius: 2rem;
          padding: 2rem;
          overflow: hidden;
          width: 100%;
          max-width: 1200px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          position: relative;
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          min-height: 500px;
          align-items: stretch;
          position: relative;
          gap: 2rem;
        }

        .mission-text {
          padding: 2rem;
          color: #1f2937;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .mission-header {
          margin-bottom: 1.5rem;
        }

        .mission-text h2 {
          font-size: 3rem;
          font-weight: bold;
          margin: 0;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .mission-description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          opacity: 0.95;
          font-weight: 400;
        }

        .mission-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1rem;
          justify-content: flex-end;
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

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.85;
          font-weight: 500;
        }

        .mission-image {
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
          background: rgba(255, 107, 53, 0.3);
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        /* Background pattern */
        .mission-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0.05;
          background-image: radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.2) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 50%);
        }

        @media (max-width: 768px) {
          .mission-container {
            padding: 1rem;
          }

          .mission-card {
            padding: 1.5rem;
          }

          .mission-content {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 1rem;
          }

          .mission-text {
            padding: 1rem;
            order: 2;
            text-align: center;
          }

          .mission-text h2 {
            font-size: 2.5rem;
          }

          .mission-stats {
            justify-content: center;
            gap: 1.5rem;
          }

          .mission-image {
            order: 1;
            padding: 1rem;
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

        .mission-stats {
          flex-direction: row;
          gap: 1.5rem;
          align-items: flex-start;
          justify-content: center;
        }

        .stat-item {
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default MissionCard;