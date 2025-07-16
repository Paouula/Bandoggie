import React from 'react';
import Banner from '../../../components/Public/BannerHoliday';
import MissionVisionSection from '../../../components/Public/AbouUs/MissionVisionSection';
import FAQSection from '../../../components/Public/AbouUs/FAQSection';

const AboutUs = () => {
  return (
    <>
      <div className="aboutus-wrapper">
        <Banner />
        <MissionVisionSection />
        <FAQSection />
      </div>

      <style jsx>{`
        .aboutus-wrapper {
          width: 100%;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default AboutUs;