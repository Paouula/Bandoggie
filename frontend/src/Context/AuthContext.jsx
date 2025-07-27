import React, { createContext, useContext, useState, useEffect } from "react";
import useFetchLogin from "../hooks/Login/UseFetchLogin.js";
import Cookies from "js-cookie"; // <-- Importa js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCookie, setAuthCookie] = useState(null);
  const { handleLogin } = useFetchLogin();

  const Login = async (email, password) => {
    try {
      const data = await handleLogin(email, password);

      // Guarda el token en la cookie
      if (data.token) {
        Cookies.set("authToken", data.token, { expires: 7 }); // 7 días, ajusta si quieres
        setAuthCookie(data.token);
      }

      // Guarda los datos del usuario en localStorage
      const userData = {
        email: data.user?.email || email,
        userType: data.user?.userType || "client",
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
    Cookies.remove("authToken");
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
    const token = Cookies.get("authToken");
    const savedUser = localStorage.getItem("user");

    console.log("Token:", token, "savedUser:", savedUser); // <-- Aquí

    if (token) {
      setAuthCookie(token);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        console.log("AuthContext -> setUser:", JSON.parse(savedUser)); // <-- Aquí
      } else {
        // Si solo tienes el token, pide el usuario al backend
        fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("AuthContext -> fetched user:", data.user); // <-- Aquí
          })
          .catch(() => setUser(null));
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
