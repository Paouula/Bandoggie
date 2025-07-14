import { Routes, Route, Navigate } from "react-router-dom";
import AboutUS from "../pages/Public/AboutUs/AboutUs";
import Reviews from "../pages/Private/Reviews/Reviews";
import Product from "../pages/Private/Products/Products";
import Employee from "../pages/Private/Employee/Employee.jsx";
import Clients from "../pages/Private/Clients/Clients.jsx";
import Main from "../pages/Public/MainPage/MainPage.jsx";
import Register from "../components/RegisterModal/Register.jsx";
import RequestCode from "../pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "../pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "../pages/Public/PasswordRecovery/newPassword.jsx";
import PrivateNavBar from "../components/Private/NavBar/NavBar.jsx";


function Navegation() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mainpage" replace />} />
      <Route path="/mainpage" element={<Main />} />
      <Route path="/register" element={<Register />} />
      <Route path="/request-code" element={<RequestCode />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/Product" element={<Product />} />
      <Route path="/Reviews" element={<Reviews />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Clients" element={<Clients />} />
      <Route path="/AboutUs" element={<AboutUS />} />
      <Route path="/private" element={<PrivateNavBar />} />
      <Route path="*" element={<Navigate to="/mainpage" />} />
    </Routes>

  );
}


export default Navegation;