import React from 'react';
import MisionDog from '../../../img/AboutUs/MisionDog.png';

const MissionCard = () => {
  return (
    <>
      <div className="mission-container">
        <div className="mission-card">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Misión</h2>
              <p>
              En Huellitas Pet Shop, nuestra misión es ofrecer productos y servicios de primera calidad que mejoren la 
              vida de las mascotas, respaldados por una asesoría cercana y experta. Nos esforzamos por ser un puente entre los cuidadores 
              —dueños, clínicas veterinarias y groomers— Inspirados por valores como el compromiso y ternura: tratamos a cada mascota 
              como si fuera nuestra. Con calidad y confiabilidad, brindamos productos que tus aliados de cuidado pueden recomendar 
              con confianza. Colaboración profesional: trabajamos de la mano con veterinarios y groomers para asegurar que cada 
              peludo reciba lo mejor.Nuestro enfoque busca fortalecer la comunidad pet‑friendly, promoviendo el cuidado informado, 
              responsable y lleno de cariño.
              </p>
            </div>
            <div className="mission-image">
              <div className="dog-placeholder">
                <img src={MisionDog} alt="Mission Dog" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mission-container {
          display: flex;
          justify-content: flex-start;
        }

        .mission-card {
          border-radius: 2rem;
          padding: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 280px;
          width: 70%;
          max-width: 600px;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          align-items: center;
        }

        .mission-text {
          padding: 2.5rem;
          padding-right: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .mission-text h2 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .mission-text p {
          font-size: 1rem;
          line-height: 1.6;
          color: #374151;
          font-weight: 500;
        }

        .mission-image {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dog-placeholder {
          width: 100%;
          max-width: 200px;
          height: auto;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .dog-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }

        @media (max-width: 768px) {
          .mission-container {
            justify-content: center;
          }

          .mission-card {
            width: 100%;
          }

          .mission-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }

          .mission-text {
            padding: 2rem;
            order: 2;
          }

          .mission-text h2 {
            font-size: 2rem;
          }

          .mission-image {
            order: 1;
            padding: 1.5rem;
          }

          .dog-placeholder {
            width: 150px;
            height: 150px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default MissionCard;