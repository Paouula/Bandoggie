import VetModel from "../models/Vets.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js"
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const vetsControllers = {};

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

//  Obtener todos los veterinarias
vetsControllers.get = async (req, res) => {
  try {
    const vets = await VetModel.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener veterinarios", error });
  }
};

//  Actualizar un veterinario
vetsControllers.put = async (req, res) => {
  const { id } = req.params;
  const { nameVet, email, password, locationVet, nitVet } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!nameVet || !email || !locationVet || !nitVet) {
    return res.status(400).json({ message: "Faltan datos obligatorios para actualizar" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  if (password && password.length < 8) {
    return res.status(400).json({ message: "La contraseña es muy corta" });
  }

  try {
    const existingVet = await VetModel.findById(id);
    if (!existingVet) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    let imageUrl = existingVet.image;

    // Si hay nueva imagen, se sube a Cloudinary
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "vets",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = uploadResult.secure_url;
    }

    const passwordHash = password
      ? await bcryptjs.hash(password, 10)
      : existingVet.password;

    const updatedVet = await VetModel.findByIdAndUpdate(
      id,
      {
        nameVet,
        email,
        password: passwordHash,
        locationVet,
        nitVet,
        image: imageUrl,
      },
      { new: true }
    );

    res.json({ message: "Veterinario actualizado con éxito", updatedVet });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar veterinario", error });
  }
};


// Eliminar un veterinarias
vetsControllers.delete = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID inválido para eliminar" });
  }

  try {
    const deletedVet = await VetModel.findByIdAndDelete(id);

    if (!deletedVet) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    res.json({ message: "Veterinario eliminado con éxito", deletedVet });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar veterinario", error });
  }
};

export default vetsControllers;
