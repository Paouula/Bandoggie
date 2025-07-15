import React from 'react';
import VisionDog from '../../img/AboutUs/VisionDog.png';

const VisionCard = () => {
  return (
    <>
      <div className="vision-container">
        <div className="vision-card">
          <div className="vision-content">
            <div className="vision-image">
              <div className="dog-placeholder">
                <img src={VisionDog} alt="Vision Dog" />
              </div>
            </div>
            <div className="vision-text">
              <h2>Visión</h2>
              <p>
                Ser una marca reconocida de productos para perros, reconocida por su diseño innovador, comprometida con la calidad y brindando una atención personalizada, consolidándonos como la primera opción para los amantes de las mascotas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vision-container {
          display: flex;
          justify-content: flex-end;
        }

        .vision-card {
          border-radius: 2rem;
          padding: 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 280px;
          width: 70%;
          max-width: 600px;
          background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
        }

        .vision-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100%;
          align-items: center;
        }

        .vision-text {
          padding: 2.5rem;
          padding-left: 1.5rem;
          order: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .vision-text h2 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #1f2937;
        }

        .vision-text p {
          font-size: 1rem;
          line-height: 1.6;
          color: #374151;
        }

        .vision-image {
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          order: 1;
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
          .vision-container {
            justify-content: center;
          }

          .vision-card {
            width: 100%;
          }

          .vision-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            text-align: center;
          }

          .vision-text {
            padding: 2rem;
            order: 2;
          }

          .vision-text h2 {
            font-size: 2rem;
          }

          .vision-image {
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

export default VisionCard;