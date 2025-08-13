import jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import vetModel from '../models/Vets.js';
import clientsModel from '../models/Clients.js';
import { config } from '../config.js';
import cloudinary from 'cloudinary';
import sendVerificationEmail from '../utils/verificationCode.js';
import { register } from 'module';

const registerController = {};

// Configurar Cloudinary con las credenciales de la config
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

registerController.register = async (req, res) => {
  const { name, email, phone, birthday, password } = req.body;
  let imgUrl = "";

  // No dejes que falte dato esencial, que eso es fallo grande
  if (!name || !email || !phone || !birthday || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos obligatorios para el registro." });
  }

  // Revisa que el correo tenga forma decente, no vale cualquier cosa
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido." });
  }

  // La contraseña ha de tener por lo menos 8 caracteres para ser decente
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres." });
  }

  try {
    // Aquí buscamos si ya hay alguien con este correo, no vaya a ser duplicado
    const existingClient = await clientsModel.findOne({ email });
    const existingEmail = await vetModel.findOne({ email });
    if (existingClient || existingEmail) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Ciframos la contraseña para guardarla bien segura
    const passwordHash = await bcryptjs.hash(password, 10);

    // Si vino foto, la subimos a la nube con Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }

    // Creamos el cliente con todo en orden y guardamos en la base
    const newClient = new clientsModel({
      name,
      email,
      phone,
      birthday,
      password: passwordHash,
      image: imgUrl,
    });
    await newClient.save();

    // Generamos un código para que verifique su correo
    const verificationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();

    // Firmamos token con el código y correo, que dure dos horas
    const token = jsonwebtoken.sign(
      { email, verificationCode, role: "client" },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    // Guardamos el token en cookie para que el cliente lo use luego
    res.cookie("VerificationToken", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      // secure: true, // en producción con HTTPS habilita esto
    });

    // Mandamos correo con el código para que verifique
    await sendVerificationEmail(email, verificationCode);

    // Avisamos que todo salió bien y que revise su correo
    res
      .status(201)
      .json({
        message:
          "Cliente registrado exitosamente, verifica tu correo electrónico para completar el registro.",
      });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Error en el registro", error });
  }
};



export default registerController;
