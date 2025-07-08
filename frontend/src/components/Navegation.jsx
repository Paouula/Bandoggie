import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Public/MainPage/MainPage";
import AboutUS from "../pages/Public/AboutUs/AboutUs";
import Holiday from "../../../frontend/src/pages/Public/Holidays/ChristmasHoliday";
import HalloweenHoliday from '../../../frontend/src/pages/Public/HalloweenHoliday/HalloweenHoliday';
import ValentineHoliday from '../../../frontend/src/pages/Public/ValentineHoliday/ValentineHoliday';     
import PatrioticHoliday from '../../../frontend/src/pages/Public/PatrioticHoliday/PatrioticHoliday';     
import NewYearHoliday from '../../../frontend/src/pages/Public/NewYearHoliday/NewYearHoliday'; 
import BirthdayHoliday from '../../../frontend/src/pages/Public/BirthdayHoliday/BirthdayHoliday';       

function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/AboutUs" element={<AboutUS />} />
      <Route path="/Holiday" element={<Holiday />} /> 
      <Route path="/HalloweenHoliday" element={<HalloweenHoliday />} /> 
      <Route path="/ValentineHoliday" element={<ValentineHoliday />} /> 
      <Route path="/PatrioticHoliday" element={<PatrioticHoliday />} /> 
      <Route path="/NewYearHoliday" element={<NewYearHoliday />} /> 
      <Route path="/BirthdayHoliday" element={<BirthdayHoliday />} /> 
    </Routes>
  );
}

export default Navegation;
