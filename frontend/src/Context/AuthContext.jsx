import React, { createContext, useContext, useState, useEffect } from "react";
import useFetchLogin from "../hooks/Login/useFetchLogin.js";
import { API_FETCH_JSON } from "../config.js";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const endpoint = ["login", "logout", "auth/pending-verification"];
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(true);
  const [verificationInfo, setVerificationInfo] = useState({
    email: "",
    role: "",
  });

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

      // Limpiar información de verificación al hacer login exitoso
      localStorage.removeItem("verificationInfo");
      setVerificationInfo({ email: "", role: "" });

      return {
        success: true,
        message: data.message,
        userType: userData.userType,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

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
    localStorage.removeItem("verificationInfo");
    setUser(null);
    setVerificationInfo({ email: "", role: "" });
    setPendingVerification(false);
  };

  //  Función para actualizar verificationInfo de forma persistente
  const updateVerificationInfo = (info) => {
    setVerificationInfo(info);
    localStorage.setItem("verificationInfo", JSON.stringify(info));
  };

  //  Función para limpiar verificationInfo
  const clearVerificationInfo = () => {
    setVerificationInfo({ email: "", role: "" });
    localStorage.removeItem("verificationInfo");
    setPendingVerification(false);
  };

  useEffect(() => {
    //  Recuperar usuario del localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        toast.error(
          error.message ||
            "Error al parsear el usuario guardado en el localStorage"
        );
        localStorage.removeItem("user");
      }
    }

    //  Recuperar verificationInfo del localStorage
    const storedVerificationInfo = localStorage.getItem("verificationInfo");
    if (storedVerificationInfo) {
      try {
        const verificationData = JSON.parse(storedVerificationInfo);
        console.log(
          " VerificationInfo recuperado del localStorage:",
          verificationData
        );
        setVerificationInfo(verificationData);
      } catch (error) {
        console.error(
          " Error al parsear verificationInfo del localStorage:",
          error
        );
        localStorage.removeItem("verificationInfo");
      }
    }

    //  Verificar autenticación con el backend
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
          toast.success("Usuario autentificado");
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Si el usuario está autenticado, limpiar verificationInfo
          if (storedVerificationInfo) {
            clearVerificationInfo();
          }
        }
      })
      .catch((err) => {
        toast.error("Usuario no autentificado: ".err.message);
      })
      .finally(() => {
        setLoadingUser(false);
      });

    //  Verificar estado de verificación pendiente
    API_FETCH_JSON(endpoint[2], {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (typeof res === "object") {
          return res;
        }
        if (res.json) {
          return res.json();
        }
        return res;
      })
      .then((data) => {
        console.log("Verificación pendiente:", data);

        const hasPendingVerification = data.pending || false;
        setPendingVerification(hasPendingVerification);

        // Si no hay verificación pendiente pero tenemos verificationInfo guardado, limpiarlo
        if (!hasPendingVerification && storedVerificationInfo) {
          console.log("No hay verificación pendiente");
          clearVerificationInfo();
        }

        // Si hay verificación pendiente pero no tenemos verificationInfo, es un caso edge
        if (hasPendingVerification && !storedVerificationInfo) {
          console.warn(
            "No se han encontrado los datos de verificacion necesarios"
          );
          toast.error(
            "No se han encontrado los datos de verificacion necesarios"
          );
        }
      })
      .catch((error) => {
        console.error("Error al obtener estado de verificación: ", error);
        toast.error(
          "Error al obtener estado de verificación: ", error
        );

        setPendingVerification(false);
      })
      .finally(() => {
        setLoadingVerification(false);
      });
  }, []);

  // Muestrar los cambios en verificationInfo
  useEffect(() => {}, [verificationInfo]);

  //  Muestrar los cambios en pendingVerification
  useEffect(() => {}, [pendingVerification]);

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
        setLoadingVerification,
        verificationInfo,
        setVerificationInfo,
        updateVerificationInfo,
        clearVerificationInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
