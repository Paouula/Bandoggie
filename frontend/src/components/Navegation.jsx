import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Public/MainPage/MainPage";
import AboutUS from "../pages/Public/AboutUs/AboutUs";

function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/AboutUs" element={<AboutUS />} />
    </Routes>
  );
}

export default Navegation;
