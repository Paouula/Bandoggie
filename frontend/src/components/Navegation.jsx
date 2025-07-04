import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Public/MainPage/MainPage";
import AboutUS from "../pages/Public/AboutUs/AboutUs";
import Reviews from "../pages/Private/Reviews/Reviews";
import Product from "../pages/Private/Products/Products";

function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/AboutUs" element={<AboutUS />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Reviews" element={<Reviews />} />
    </Routes>
  );
}

export default Navegation;
