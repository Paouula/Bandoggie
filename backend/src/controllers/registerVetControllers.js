import vetModel from '../models/Vets.js';
import clientsModel from '../models/client.js';
import { config } from '../config.js';
import cloudinary from 'cloudinary';
import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import sendVerificationEmail from '../utils/verificationCode.js';

const registerVetController = {};

// Configurar Cloudinary con las credenciales de la config
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// Aquí se registra el veterinario, pero ojo, antes valida que los datos no estén vacíos ni mal formados
registerVetController.register = async (req, res) => {
  const { nameVet, email, password, locationVet, nitVet } = req.body;
  let imageUrl = "";

  // No dejes que falte dato esencial, que eso es fallo grande

  if (!nameVet || !email || !password || !locationVet || !nitVet) {
    return res
      .status(400)
      .json({ message: "Faltan datos obligatorios para el registro" });
  }

  // Revisa que el correo tenga forma decente, no vale cualquier cosa
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  // La contraseña ha de tener por lo menos 8 caracteres para ser decente
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  try {
    // Aquí buscamos si ya hay alguien con este correo, no vaya a ser duplicado
    const existingVet = await vetModel.findOne({ email });
    const existingEmail = await clientsModel.findOne({ email });
    if (existingVet || existingEmail) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Ciframos la contraseña para guardarla bien segura
    const passwordHash = await bcryptjs.hash(password, 10);

    // Si hay imagen en la petición, se sube a Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "vets",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = uploadResult.secure_url;
    }

    //Creamos el nuevo cliente con todo en orden y lo guardamos en mongoDB
    const newVet = new vetModel({
      nameVet,
      email,
      password: passwordHash,
      locationVet,
      nitVet,
      image: imageUrl, // Se guarda la URL de la imagen si fue cargada
    });
    await newVet.save();

    // Generamos un código para que verifique su correo
    const verificationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();
    const token = jsonwebtoken.sign(
      { email, verificationCode, role: "vet" },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    // Firmamos token con el código y correo, que dure dos horas
    res.cookie("VerificationToken", token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });

    // Mandamos correo con el código para que verifique
    await sendVerificationEmail(email, verificationCode);

    // Avisamos que todo salió bien y que revise su correo
    res.status(201).json({
      message:
        "Veterinario registrado, verifica tu correo para activar la cuenta.",
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Error en el registro", error });
  }
};


export default registerVetController;
