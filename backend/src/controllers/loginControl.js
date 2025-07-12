import ClientsModel from "../models/Clients.js";
import VetModel from "../models/Vets.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound;
    let userType;

    // Buscar en clientes
    userFound = await ClientsModel.findOne({ email });
    if (userFound) {
      userType = "client";
    } else {
      // Buscar en veterinarios
      userFound = await VetModel.findOne({ email });
      if (userFound) {
        userType = "vet";
      }
    }

    if (!userFound) {
      return res.status(400).json({ message: "No se ha podido encontrar al usuario" });
    }

    // Verificar contraseña
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    jsonwebtoken.sign(
      { user: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          return res.status(500).json({ message: "Error al generar el token" });
        }

        res.cookie("authToken", token, {
          httpOnly: true,
          sameSite: "lax",
          // secure: true // activa en producción con HTTPS
        });

        return res.status(200).json({
          message: "Login exitoso",
          userType
        });
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default loginController;
