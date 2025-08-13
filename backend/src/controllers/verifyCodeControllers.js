import jsonwebtoken from 'jsonwebtoken';
import clientsModel from '../models/Clients.js';
import vetModel from '../models/Vets.js';
import { config } from '../config.js';

const verifyCodeControllers = {};

verifyCodeControllers.verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  const token = req.cookies.VerificationToken;

  if (!token) {
    return res.status(401).json({ message: "Token no encontrado." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Código de verificación incorrecto." });
    }

    const { email, role } = decoded;

    let updatedUser;
    if (role === "client") {
      updatedUser = await clientsModel.findOneAndUpdate(
        { email },
        { emailVerified: true },
        { new: true }
      );
    } else if (role === "vet") {
      updatedUser = await vetModel.findOneAndUpdate(
        { email },
        { emailVerified: true },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Tipo de usuario inválido." });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.clearCookie("VerificationToken", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Correo verificado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Token inválido o expirado.", error });
  }
};

export default verifyCodeControllers;
