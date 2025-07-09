import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Private/Clients/Clients.jsx";
import AboutUS from "../pages/Public/AboutUs/AboutUs";
import Review from "../pages/Private/Reviews/Reviews.jsx"

function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/Review" element={<Review />} />
    </Routes>
  );
}

export default Navegation;