import clientsModel from "../models/Clients.js";
import Employees from "../models/Employees.js";
import VetModel from "../models/Vets.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import validator from "validator";

const loginController = {};

// Este es el encargado de verificar si el usuario puede entrar al sistema
loginController.login = async (req, res) => {
  const { email, password } = req.body;

  // Validamos que nos envíen un correo y una contraseña, nada de vacíos
  if (!email || !validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Correo electrónico inválido o faltante" });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({
      message:
        "La contraseña es obligatoria y debe tener al menos 8 caracteres",
    });
  }

  try {
    let userFound = null;
    let userType = null;

    // Busca primero en empleados
    userFound = await Employees.findOne({ email });
    if (userFound) {
      userType = "employee";
    }

    // Si no es empleado, busca en veterinarios
    if (!userFound) {
      userFound = await VetModel.findOne({ email });
      if (userFound) {
        userType = "vet";
      }
    }

    // Si no es veterinario, busca en clientes
    if (!userFound) {
      userFound = await clientsModel.findOne({ email });
      if (userFound) {
        userType = "client";
      }
    }

    // Si no se encuentra el usuario en ningún modelo
    if (!userFound) {
      return res
        .status(400)
        .json({ message: "No se ha podido encontrar al usuario" });
    }

    // Comprobamos que la contraseña que enviaron sea la misma que la guardada
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Si todo está bien, creamos un token para que pueda usar el sistema
    jsonwebtoken.sign(
      { user: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          // Si hay fallo creando el token, avisamos que algo no salió bien
          return res.status(500).json({ message: "Error al generar el token" });
        }

        // Ponemos el token en una cookie segura para que el cliente lo guarde
        res.cookie("authToken", token, {
          httpOnly: true, // Ahora la cookie es invisible para JavaScript
          sameSite: "lax",
          secure: false,
        });

        // Finalmente, decimos que el login fue exitoso y enviamos qué tipo de usuario es
        return res.status(200).json({
          message: "Login exitoso",
          userType,
          user: {
            _id: userFound._id,
            email: userFound.email,
            name: userFound.name,
            userType: userType // Agregar userType aquí también
          },
        });
      }
    );
  } catch (error) {
    // Si algo inesperado pasa, lo registramos y avisamos al cliente
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener datos del usuario autenticado - VERSIÓN CORREGIDA
loginController.getAuthenticatedUser = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    let user = null;

    // Buscar usuario según su tipo
    if (decoded.userType === "employee") {
      user = await Employees.findById(decoded.user).select('-password');
    } else if (decoded.userType === "vet") {
      user = await VetModel.findById(decoded.user).select('-password');
    } else if (decoded.userType === "client") {
      user = await clientsModel.findById(decoded.user).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear objeto de respuesta base
    const userResponse = {
      _id: user._id,
      email: user.email,
      userType: decoded.userType,
      image: user.image || ""
    };

    // Mapear campos específicos según el tipo de usuario
    if (decoded.userType === "client") {
      userResponse.name = user.name || "";
      userResponse.phone = user.phone || "";
      userResponse.address = user.address || ""; // Clientes pueden no tener dirección en DB
      // Convertir fecha de birthday si existe
      if (user.birthday) {
        const date = new Date(user.birthday);
        userResponse.birthday = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      } else {
        userResponse.birthday = "";
      }
    }

    if (decoded.userType === "vet") {
      userResponse.name = user.nameVet || user.name || ""; // Veterinarios usan 'nameVet'
      userResponse.phone = user.phone || ""; // Veterinarios pueden no tener teléfono
      userResponse.address = user.address || ""; // Veterinarios pueden no tener dirección separada
      userResponse.locationVet = user.locationVet || "";
      userResponse.nitVet = user.nitVet || "";
    }

    if (decoded.userType === "employee") {
      userResponse.name = user.name || "";
      userResponse.phone = user.phone || "";
      userResponse.address = user.address || "";
    }

    return res.status(200).json({
      user: userResponse,
    });
  } catch (error) {
    console.error("Error en getAuthenticatedUser:", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Actualizar datos del perfil - VERSIÓN CORREGIDA
loginController.updateProfile = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    let user = null;

    // Datos base que se pueden actualizar
    const { name, email, phone, address, birthday, locationVet, nitVet } = req.body;
    
    let updateData = { name, email, phone, address };

    // Agregar campos específicos según el tipo de usuario
    if (decoded.userType === "client" && birthday) {
      updateData.birthday = birthday;
    }

    if (decoded.userType === "vet") {
      if (locationVet) updateData.locationVet = locationVet;
      if (nitVet) updateData.nitVet = nitVet;
    }

    // Eliminamos campos vacíos o undefined
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null || updateData[key] === '') {
        delete updateData[key];
      }
    });

    // Validar email si se está actualizando
    if (updateData.email && !validator.isEmail(updateData.email)) {
      return res.status(400).json({ message: "Correo electrónico inválido" });
    }

    // Actualizar según el tipo de usuario
    if (decoded.userType === "employee") {
      user = await Employees.findByIdAndUpdate(
        decoded.user, 
        updateData, 
        { new: true, runValidators: true }
      ).select('-password');
    } else if (decoded.userType === "vet") {
      user = await VetModel.findByIdAndUpdate(
        decoded.user, 
        updateData, 
        { new: true, runValidators: true }
      ).select('-password');
    } else if (decoded.userType === "client") {
      user = await clientsModel.findByIdAndUpdate(
        decoded.user, 
        updateData, 
        { new: true, runValidators: true }
      ).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crear respuesta con todos los campos necesarios
    const userResponse = {
      _id: user._id,
      email: user.email,
      userType: decoded.userType,
      image: user.image || ""
    };

    // Mapear campos específicos según el tipo de usuario
    if (decoded.userType === "client") {
      userResponse.name = user.name || "";
      userResponse.phone = user.phone || "";
      userResponse.address = user.address || "";
      // Convertir fecha de birthday si existe
      if (user.birthday) {
        const date = new Date(user.birthday);
        userResponse.birthday = date.toISOString().split('T')[0];
      } else {
        userResponse.birthday = "";
      }
    }

    if (decoded.userType === "vet") {
      userResponse.name = user.nameVet || user.name || "";
      userResponse.phone = user.phone || "";
      userResponse.address = user.address || "";
      userResponse.locationVet = user.locationVet || "";
      userResponse.nitVet = user.nitVet || "";
    }

    if (decoded.userType === "employee") {
      userResponse.name = user.name || "";
      userResponse.phone = user.phone || "";
      userResponse.address = user.address || "";
    }

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error en updateProfile:", error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Error de validación", 
        details: error.message 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "El email ya está en uso por otro usuario" 
      });
    }
    
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

// Logout
loginController.logout = async (req, res) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    });
    
    return res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error);
    return res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

export default loginController;