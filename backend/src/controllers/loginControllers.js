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
            email: userFound.email,
            name: userFound.name,
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

// Obtener datos del usuario autenticado
loginController.getAuthenticatedUser = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    let user = null;

    if (decoded.userType === "employee") {
      user = await Employees.findById(decoded.user);
    } else if (decoded.userType === "vet") {
      user = await VetModel.findById(decoded.user);
    } else if (decoded.userType === "client") {
      user = await clientsModel.findById(decoded.user);
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone || "",
        address: user.address || "",
        userType: decoded.userType,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

// Actualizar datos del perfil
loginController.updateProfile = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    let user = null;

    // Datos que se pueden actualizar
    const { name, email, phone, address } = req.body;
    const updateData = { name, email, phone, address };

    // Eliminamos campos vacíos (para no sobreescribir con undefined)
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (decoded.userType === "employee") {
      user = await Employees.findByIdAndUpdate(decoded.user, updateData, {
        new: true,
      });
    } else if (decoded.userType === "vet") {
      user = await VetModel.findByIdAndUpdate(decoded.user, updateData, {
        new: true,
      });
    } else if (decoded.userType === "client") {
      user = await clientsModel.findByIdAndUpdate(decoded.user, updateData, {
        new: true,
      });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone || "",
        address: user.address || "",
        userType: decoded.userType,
      },
    });
  } catch (error) {
    console.error("Error en updateProfile:", error);
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

export default loginController;
