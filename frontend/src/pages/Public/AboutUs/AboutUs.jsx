import React from 'react';
import Banner from '../../../components/Public/AbouUs/Banner';
import { Toaster } from 'react-hot-toast';
import MissionVisionSection from '../../../components/Public/AbouUs/MissionVisionSection';
import FAQSection from '../../../components/Public/AbouUs/FAQSection';

const AboutUs = () => {
  return (
    <>
          <Toaster position="top-right" />
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