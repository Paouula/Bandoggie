import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Public/MainPage/MainPage";
import AboutUS from "../pages/Public/AboutUs/AboutUs";
import Holiday from "../../../frontend/src/pages/Public/Holidays/ChristmasHoliday";

function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/AboutUs" element={<AboutUS />} />
      <Route path="/Holiday" element={<Holiday />} /> 
    </Routes>
  );
}

export default Navegation;
