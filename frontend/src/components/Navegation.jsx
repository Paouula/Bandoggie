// Navegation.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

//  NavBars
import Nav from "../components/Public/NavBar/NavBar.jsx";
import AuthenticatedNavBar from "../components/Public/NavBar/NavBar.jsx";
import PrivateNavBar from "../components/Private/NavBar/NavBar.jsx";

//  Componentes Públicos
import AboutUS from "../pages/Public/AboutUs/AboutUs.jsx";
import MainPage from "../pages/Public/MainPage/MainPage.jsx";
import Bandanas from "../pages/Public/Bandanas/Bandanas.jsx";
import Holidays from "../pages/Public/Holidays/ChristmasHoliday.jsx";
import Register from "../components/RegisterModal/Register.jsx";
import RequestCode from "../pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "../pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "../pages/Public/PasswordRecovery/newPassword.jsx";
import LoginModal from "../components/LoginModal/Login.jsx";

//  Componentes Privados (solo employee)
import Productos from "../pages/Private/Products/Products.jsx";
import Reseñas from "../pages/Private/Reviews/Reviews.jsx";
import Empleados from "../pages/Private/Employee/Employee.jsx";
import Clientes from "../pages/Private/Clients/Clients.jsx";

// 🔒 Rutas protegidas
import { PrivateRoute, EmployeeRoute } from "./PrivateRoute.jsx";

// 🧱 Layout privado con NavBar del empleado
const EmployeeLayout = () => (
  <>
    <PrivateNavBar />
    <div className="admin-content">
      <Routes>
        <Route path="productos" element={<Productos />} />
        <Route path="reseñas" element={<Reseñas />} />
        <Route path="empleados" element={<Empleados />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="*" element={<Navigate to="/admin/productos" replace />} />
      </Routes>
    </div>
  </>
);

// Handler para decidir qué NavBar mostrar
function NavBarHandler({ currentPath }) {
  const { authCokie, user } = useAuth();

  const authRoutes = [
    "/verification-code",
    "/request-code",
    "/verify-code",
    "/new-password",
    "/reviews",
  ];

  const adminRoutes = ["/admin"];

  const shouldHideNav = authRoutes.some(route =>
    currentPath === route || currentPath.startsWith(route + "/")
  );

  const isAdminRoute = adminRoutes.some(route =>
    currentPath.startsWith(route)
  );

  if (shouldHideNav || isAdminRoute) return null;
  if (!authCokie || !user) return <Nav />;
  if (user.userType === "employee") return null;
  if (user.userType === "vet" || user.userType === "client") return <AuthenticatedNavBar />;
  return <Nav />;
}

function Navegation() {
  const { authCokie, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  //  Redirecciones después del login
  useEffect(() => {
    if (authCokie && user) {
      if (user.userType === "employee") {
        navigate("/admin/productos");
      } else {
        navigate("/mainPage");
      }
    }
  }, [authCokie, user, navigate]);

  return (
    <>
      <NavBarHandler currentPath={currentPath} />
      <Routes>
        {/* Rutas de autenticación públicas */}
        <Route path="/register" element={<Register />} />
        <Route path="/request-code" element={<RequestCode />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Ruta de inicio/login */}
        <Route
          path="/"
          element={
            authCokie && user?.userType === "employee" ? (
              <Navigate to="/admin/productos" replace />
            ) : (
              <LoginModal />
            )
          }
        />

        {/* Rutas públicas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/bandanas" element={<Bandanas />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/aboutus" element={<AboutUS />} />
        </Route>

        {/* Área privada para empleados */}
        <Route element={<EmployeeRoute />}>
          <Route path="/admin/*" element={<EmployeeLayout />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/mainPage" replace />} />
      </Routes>
    </>
  );
}

export default Navegation;
