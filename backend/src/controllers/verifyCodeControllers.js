import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import clientsModel from '../models/Clients.js';
import vetModel from '../models/Vets.js';
import { config } from '../config.js';
import sendVerificationEmail from '../utils/verificationCode.js'

const verifyCodeControllers = {};

//Parte del controlador que gestiona el envio del codigo de verificacion
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

//Controlador que gestiona el reenvio del codigo de verificacion
verifyCodeControllers.resend = async (req, res) => {
  const { email, role } = req.body

  if (!email || !role) {
    return res.status(400).json({ message: "Correo y rol son requeridos" })
  }

  try {
    let user;
    if (role === 'client') {
      user = await clientsModel.findOne({ email })
    } else if (role === 'vet') {
      user = await vetModel.findOne({ email })
    } else {
      return res.status(400).json({ message: "Usuario no valido" })
    }

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" })
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "El correo ya está verificado." });
    }

    const verificationCode = crypto.randomBytes(3).toString("hex").toUpperCase();

    const token = jsonwebtoken.sign(
      { email, verificationCode, role },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("VerificationToken", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({ message: "Nuevo código enviado al correo." });

  } catch (error) {
    res.status(500).json({ message: "Error al reenviar el código.", error });
  }
}

export default verifyCodeControllers;
