import React, { createContext, useContext, useState, useEffect } from "react";
import useFetchLogin from "../hooks/Login/UseFetchLogin.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCookie, setAuthCookie] = useState(null); 
  const { handleLogin } = useFetchLogin();

  const Login = async (email, password) => {
    try {
      const data = await handleLogin(email, password);

      // Guardamos el token si viene en la respuesta
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setAuthCookie(data.token);
      }

      // Guardamos los datos del usuario
      const userData = {
        email: data.user?.email || email,
        userType: data.user?.userType || "client", // Ajustado: extraído desde data.user
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

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthCookie(null);
    setUser(null);
  };

  // Funciones de tipo de usuario
  const isEmployee = () => user?.userType === "employee";
  const isVet = () => user?.userType === "vet";
  const isClient = () => user?.userType === "client";
  const isPublicUser = () => isVet() || isClient();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");

    if (token) {
      setAuthCookie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        Login,
        logout,
        authCookie,
        setAuthCookie,
        isEmployee,
        isVet,
        isClient,
        isPublicUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
