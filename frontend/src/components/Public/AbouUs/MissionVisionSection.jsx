import React from 'react';
import MissionCard from '../AbouUs/MissionCard';
import VisionCard from '../AbouUs/VisionCard';

const MissionVisionSection = () => {
  return (
    <>
      <section className="mission-vision-section">
        <div className="mission-vision-container">
          <MissionCard />
          <VisionCard />
        </div>
      </section>

      <style jsx>{`
        .mission-vision-section {
          padding: 4rem 1.5rem;
          background-color: #f9fafb;
        }

        .mission-vision-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        @media (max-width: 768px) {
          .mission-vision-container {
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default MissionVisionSection;