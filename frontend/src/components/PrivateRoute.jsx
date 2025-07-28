import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Ruta para sitio público - solo usuarios NO autenticados o autenticados que NO sean employees
export const PrivateRoute = () => {
    const { authCookie, isEmployee } = useAuth();
    
    // Si está autenticado Y es employee, redirige al área admin
    if (authCookie && isEmployee()) {
        return <Navigate to="/admin/productos" replace />;
    }
    
    // Si no está autenticado O está autenticado pero no es employee, permite acceso
    return <Outlet />;
};

// Ruta para employees - área privada/admin (requiere autenticación y ser employee)
export const EmployeeRoute = () => {
    const { authCookie, isEmployee } = useAuth();
    
    // Si no está autenticado, redirige al login
    if (!authCookie) {
        return <Navigate to="/" replace />;
    }
    
    // Si está autenticado pero no es employee, redirige a la página pública
    if (!isEmployee()) {
        return <Navigate to="/inicio" replace />;
    }
    
    // Si es employee, permite el acceso
    return <Outlet />;
};