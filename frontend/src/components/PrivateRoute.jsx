import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Ruta pública protegida (solo NO empleados)
export const PrivateRoute = () => {
  const { user, isEmployee, loadingUser } = useAuth();

  if (loadingUser) return null; // o un loader visual si prefieres

  // Si está autenticado Y es empleado, redirige a admin
  if (user && isEmployee()) {
    return <Navigate to="/admin/productos" replace />;
  }

  // Si no es empleado o no está autenticado, permite acceso
  return <Outlet />;
};

// Ruta privada para empleados (área admin)
export const EmployeeRoute = () => {
  const { user, isEmployee, loadingUser } = useAuth();

  if (loadingUser) return null;

  // Si no está autenticado
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si está autenticado pero no es empleado
  if (!isEmployee()) {
    return <Navigate to="/mainPage" replace />;
  }

  // Si es empleado, permite acceso
  return <Outlet />;
};
