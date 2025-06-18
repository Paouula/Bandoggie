import ClientsModel from "../models/Clients.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar solo en clientes
        const userFound = await ClientsModel.findOne({ email });
        if (!userFound) {
            console.log("No se ha podido encontrar al usuario");
            return res.status(400).json({ message: "No se ha podido encontrar al usuario" });
        }

        // Verificar contraseña
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar token
        jsonwebtoken.sign(
            { user: userFound._id, userType: "client" },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (error, token) => {
                if (error) return res.status(500).json({ message: "Error en el login" });

                res.cookie("authToken", token, {
                    httpOnly: true,
                    sameSite: "lax", // o 'none' si usas https y frontend en otro dominio
                    // secure: true, // solo en producción con https
                });
                res.json({ message: "Login exitoso" });
            }
        );
    } catch (error) {
        return res.status(400).json({ message: "El email o la contraseña son incorrectos" });
    }
};

export default loginController;
