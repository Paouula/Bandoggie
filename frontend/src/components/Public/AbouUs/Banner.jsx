import React from 'react';
import DogAboutUs from '../../../img/AboutUs/DogAboutUs.png';

const Banner = () => {
  return (
    <>
      <div className="aboutus-container">
        <div className="aboutus-banner">
          <h1>
            Sobre<br />Nosotros
          </h1>
          <p>
            Diseñamos bandanas para perros que<br />
            combinan estilo, calidad y confort.
          </p>
          <img src={DogAboutUs} alt="DogAboutUs" className="DogAboutUs" />
        </div>
      </div>

      <style jsx>{`
        .aboutus-banner {
          background-color: #fef08a;
          border-radius: 2rem;
          padding: 5rem 2rem 6rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: auto;
          max-width: 1200px;
          margin: 2rem auto;
          text-align: right;
          position: relative;
          overflow: hidden;
          z-index: 0;
          font-family: 'Poppins', sans-serif;
        }

        .aboutus-banner h1,
        .aboutus-banner p {
          position: relative;
          z-index: 2;
        }

        .aboutus-banner h1 {
          font-family: 'Baloo Bhaijaan 2', sans-serif; 
          font-size: 6rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .aboutus-banner p {
          color: #333;
          font-size: 1.2rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 0 2.5rem;
          text-align: right;
        }

        .DogAboutUs {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 0.8 !important;
          z-index: 1;
          pointer-events: none;
          border-radius: 0 0 2rem 2rem;
        }

        @media (max-width: 768px) {
          .aboutus-banner {
            padding: 4rem 1.5rem 5rem;
            text-align: center;
          }

          .aboutus-banner h1 {
            font-size: 3rem;
            text-align: center;
          }

          .aboutus-banner p {
            font-size: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default Banner;