import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import useFetchLogin from "../hooks/Login/UseFetchLogin.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authCokie, setAuthCokie] = useState(null);
    const { handleLogin } = useFetchLogin();
    
    const Login = async (email, password) => {
        try {
            const data = await handleLogin(email, password);
            
            // Guardamos el token si viene en la respuesta
            if (data.token) {
                localStorage.setItem("authToken", data.token);
                setAuthCokie(data.token);
            }
            
            // Guardamos el tipo de usuario que viene del backend
            const userData = {
                email: data.user?.email || email,
                userType: data.userType || 'client' // employee, vet, client
            };
            
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            return { 
                success: true,
                message: data.message,
                userType: data.userType 
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = async () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setAuthCokie(null);
        setUser(null);
    };

    // Funciones para verificar tipos de usuario
    const isEmployee = () => {
        return user?.userType === 'employee';
    };

    const isVet = () => {
        return user?.userType === 'vet';
    };

    const isClient = () => {
        return user?.userType === 'client';
    };

    const isPublicUser = () => {
        return user?.userType === 'vet' || user?.userType === 'client';
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("user");

        if (token) {
            setAuthCokie(token);
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
                authCokie,
                setAuthCokie,
                isEmployee, // Corregido: era isAdmin
                isVet,
                isClient,
                isPublicUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);