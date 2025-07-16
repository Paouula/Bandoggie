import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { useEffect } from "react";

// Componentes públicos
import AboutUS from "../pages/Public/AboutUs/AboutUs.jsx";
import MainPage from "../pages/Public/MainPage/MainPage.jsx"; // Cambié Main por Inicio
import Bandanas from "../pages/Public/Bandanas/Bandanas.jsx";
// import Collares from "../pages/Public/Collares/Collares.jsx";
// import Accesorios from "../pages/Public/Accesorios/Accesorios.jsx";
import Holidays from "../pages/Public/Holidays/ChristmasHoliday.jsx";
import Register from "../components/RegisterModal/Register.jsx";
import RequestCode from "../pages/Public/PasswordRecovery/RequestCode.jsx";
import VerifyCode from "../pages/Public/PasswordRecovery/verifyCode.jsx";
import NewPassword from "../pages/Public/PasswordRecovery/newPassword.jsx";
import LoginModal from "../components/LoginModal/Login.jsx";

// Componentes privados (solo employee)
import Productos from "../pages/Private/Products/Products.jsx"; 
import Reseñas from "../pages/Private/Reviews/Reviews.jsx"; 
import Empleados from "../pages/Private/Employee/Employee.jsx"; 
import Clientes from "../pages/Private/Clients/Clients.jsx";
import PrivateNavBar from "../components/Private/NavBar/NavBar.jsx";

// Rutas protegidas
import { PrivateRoute, EmployeeRoute } from "./PrivateRoute.jsx";

// Layout para rutas de employee con navbar privado
const EmployeeLayout = () => {
    return (
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
};

function Navegation() {
    const { authCokie, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authCokie && user) {
            // Solo redirigir employees al área admin después del login
            if (user.userType === 'employee') {
                navigate("/admin/productos");
            }
            // Vet y client pueden ir a inicio si vienen del login
            else {
                navigate("/mainPage");
            }
        }
    }, [authCokie, user, navigate]);

    return (
        <Routes>
            {/* Rutas de autenticación - disponibles para todos */}
            <Route path="/register" element={<Register />} />
            <Route path="/request-code" element={<RequestCode />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/new-password" element={<NewPassword />} />
            
            {/* Ruta de login/inicio */}
            <Route 
                path="/" 
                element={
                    authCokie && user?.userType === 'employee' ? 
                        <Navigate to="/admin/productos" replace /> : 
                        <LoginModal />
                } 
            />
            
            {/* Rutas públicas - solo para usuarios NO employees */}
            <Route element={<PrivateRoute />}>
                <Route path="/mainPage" element={<MainPage />} />
                <Route path="/bandanas" element={<Bandanas />} />
               {/* <Route path="/collares" element={<Collares />} />
                <Route path="/accesorios" element={<Accesorios />} /> */}
                <Route path="/holidays" element={<Holidays />} />
                <Route path="/aboutus" element={<AboutUS />} /> 
            </Route>
            
            {/* Rutas privadas solo para employees */}
            <Route element={<EmployeeRoute />}>
                <Route path="/admin/*" element={<EmployeeLayout />} />
            </Route>
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/mainPage" replace />} />
        </Routes>
    );
}

export default Navegation;