// hooks/useAuth.js
import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL base de tu API
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

  // Función para obtener el token
  const getAuthToken = () => {
    return localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  };

  // Función para verificar si el token es válido
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Token inválido");
      }

      const userData = await response.json();
      return userData;
    } catch (err) {
      console.error("Error verifying token:", err);
      return null;
    }
  };

  // Función para cargar el estado de autenticación
  const loadAuthState = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Verificar si el token es válido
      const userData = await verifyToken(token);
      
      if (userData) {
        setIsAuthenticated(true);
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          userType: userData.userType || "Cliente"
        });
      } else {
        // Token inválido, limpiar
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Error loading auth state:", err);
      setError("Error al verificar la sesión");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión
  const login = async (credentials, rememberMe = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      
      // Guardar token
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("authToken", data.token);

      // Actualizar estado
      setIsAuthenticated(true);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        userType: data.user.userType || "Cliente"
      });

      return true;
    } catch (err) {
      console.error("Error logging in:", err);
      setError(err.message || "Error al iniciar sesión");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true);

    try {
      const token = getAuthToken();
      
      if (token) {
        // Opcional: notificar al servidor del logout
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }).catch(err => console.error("Error notifying server of logout:", err));
      }

      // Limpiar tokens y estado
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      setIsAuthenticated(false);
      setUser(null);
      setError(null);

    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar el estado de autenticación
  const refreshAuth = () => {
    loadAuthState();
  };

  // Cargar estado inicial
  useEffect(() => {
    loadAuthState();
  }, []);

  // Escuchar cambios en localStorage para sincronizar entre pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "authToken") {
        loadAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    refreshAuth
  };
};

export default useAuth;