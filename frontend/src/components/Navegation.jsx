// Navegation.jsx
import React, { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

// NavBars
import Nav from "../components/Public/NavBar/NavBar.jsx";
import AuthenticatedNavBar from "../components/Public/NavBar/NavBar.jsx";
import PrivateNavBar from "../components/Private/NavBar/NavBar.jsx";

//Footer
import Footer from "../components/Footer/Footer.jsx";

// Componentes Públicos
import AboutUS from "../pages/Public/AboutUs/AboutUs.jsx";
import MainPage from "../pages/Public/MainPage/MainPage.jsx";
import Holidays from "../pages/Public/Holidays/ChristmasHoliday.jsx";
import Halloween from "../pages/Public/HalloweenHoliday/HalloweenHoliday.jsx";
import Valentine from "../pages/Public/ValentineHoliday/ValentineHoliday.jsx";
import Patriotic from "../pages/Public/PatrioticHoliday/PatrioticHoliday.jsx";  
import NewYear from "../pages/Public/NewYearHoliday/NewYearHoliday.jsx";
import Birthday from "../pages/Public/BirthdayHoliday/BirthdayHoliday.jsx";
import Register from "../components/RegisterModal/Register.jsx";
import RequestCode from "../pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "../pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "../pages/Public/PasswordRecovery/newPassword.jsx";
import Profile from "../pages/Public/Profile/Profile.jsx";
import LoginModal from "../components/LoginModal/Login.jsx";

//Paginas de productos sitio público
import Bandanas from "../pages/Public/Bandanas/Bandanas.jsx";
import Collars from "../pages/Public/Collars/Collars.jsx";
import Accessories from "../pages/Public/Accessories/Accessories.jsx";
import SelectedProduct from "../pages/Public/SelectedProduct/SelectedProduct.jsx";

// Componentes privados
import Home from "../pages/Private/MainPage/MainPage.jsx";
import Productos from "../pages/Private/Products/Products.jsx";
import Reseñas from "../pages/Private/Reviews/Reviews.jsx";
import Empleados from "../pages/Private/Employee/Employee.jsx";
import Clientes from "../pages/Private/Clients/Clients.jsx";
import Graphics from "../pages/Private/Graphics/Graphics.jsx";

// Rutas protegidas
import { PrivateRoute, EmployeeRoute } from "./PrivateRoute.jsx";

// Layout para empleados
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
        <Route path="graphics" element={<Graphics/>}/>
      </Routes>
    </div>
  </>
);

// Manejo dinámico del NavBar
function NavBarHandler({ currentPath, user }) {
  const authRoutes = [
    "/verification-code",
    "/request-code",
    "/verify-code",
    "/new-password",
    "/reviews",
  ];

  const adminRoutes = ["/admin"];

  const shouldHideNav = authRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );

  const isAdminRoute = adminRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (shouldHideNav || isAdminRoute) return null;
  if (!user) return <Nav />;
  if (user.userType === "employee") return null;
  if (user.userType === "vet" || user.userType === "client")
    return <AuthenticatedNavBar />;
  return <Nav />;
}

function Navegation() {
  const { user, loadingUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");

  // Esperar a que se cargue el usuario antes de continuar
  if (loadingUser) return null;

  // Redirección automática solo si se entra por "/"
  useEffect(() => {
    if (!user || location.pathname !== "/") return;

    if (user.userType === "employee") {
      navigate("/admin/productos");
    } else if (user.userType === "vet" || user.userType === "client") {
      navigate("/mainPage");
    }
  }, [user, navigate, location.pathname]);

  return (
    <>
      <NavBarHandler currentPath={currentPath} user={user} />
      <Routes>
        {/* Rutas de autenticación */}
        <Route path="/register" element={<Register />} />
        <Route path="/request-code" element={<RequestCode />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Inicio / Login */}
        <Route
          path="/"
          element={
            user?.userType === "employee" ? (
              <Navigate to="/admin/productos" replace />
            ) : user ? (
              <Navigate to="/mainPage" replace />
            ) : (
              <MainPage />
            )
          }
        />

        {/* Rutas públicas publicas */}
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/bandanas" element={<Bandanas />} />
        <Route path="/collars" element={<Collars />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/products/:id" element={<SelectedProduct />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/halloween" element={<Halloween />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/patriotic" element={<Patriotic />} />
        <Route path="/newyear" element={<NewYear />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/profile" element={<Profile />} />
      

        {/* Área privada para empleados */}
        <Route element={<EmployeeRoute />}>
          <Route path="/admin/*" element={<EmployeeLayout />} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/mainPage" replace />} />
      </Routes>

      <>
      .<Footer /></>
      </>
    
  );
}

export default Navegation;
