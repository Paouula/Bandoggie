import React, { createContext, useContext, useState, useEffect } from "react";
import useFetchLogin from "../hooks/Login/useFetchLogin.js";
import { API_FETCH_JSON } from "../config.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const endpoint = ["login", "logout", "auth/pending-verification"];
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(true);

  const { handleLogin } = useFetchLogin();

  const Login = async (email, password) => {
    try {
      const data = await handleLogin(email, password); // backend guarda la cookie

      // Guardar datos de usuario si vienen del login
      const userData = {
        email: data.user?.email || email,
        userType: data.userType,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return {
        success: true,
        message: data.message,
        userType: userData.userType,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /*  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };
*/

  const logout = async () => {
    try {
      API_FETCH_JSON(`${endpoint[1]}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error en logout:", error);
    }

    localStorage.removeItem("user");
    setUser(null);
  };

  // Funciones de tipo de usuario
  /*useEffect(() => {
    API_FETCH_JSON(`${endpoint}/auth/me`, {
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autenticado");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        setUser(null);
      })
  }, []);*/

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    API_FETCH_JSON(`${endpoint[0]}/auth/me`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No autenticado");
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch((err) => {
        // console.warn("Fallo en login/auth/me:", err.message);
      })
      .finally(() => {
        setLoadingUser(false);
      });

    API_FETCH_JSON(endpoint[2], {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("Respuesta completa de API_FETCH_JSON:", res);
        if (typeof res === "object") {
          return res;
        }
        if (res.json) {
          return res.json();
        }
        return res;
      })
      .then((data) => {
        console.log("Pending verification data:", data);
        setPendingVerification(data.pending);
      })
      .catch((error) => {
        console.error("Error al obtener estado de verificación:", error);
        setPendingVerification(false);
      })
      .finally(() => {
        //Marcar que terminó la carga de verificación
        setLoadingVerification(false);
      });
  }, []);

  const isEmployee = () => user?.userType === "employee";
  const isVet = () => user?.userType === "vet";
  const isClient = () => user?.userType === "client";
  const isPublicUser = () => isVet() || isClient();

  return (
    <AuthContext.Provider
      value={{
        user,
        Login,
        logout,
        isEmployee,
        isVet,
        isClient,
        isPublicUser,
        pendingVerification,
        setPendingVerification,
        loadingVerification,
        setLoadingVerification
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
