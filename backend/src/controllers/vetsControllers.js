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



  try {
    const existingVet = await VetModel.findById(id);
    if (!existingVet) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    const updateData = {};

    if (nameVet !== undefined) updateData.nameVet = nameVet;
    if (email !== undefined) updateData.email = email;
    if (locationVet !== undefined) updateData.locationVet = locationVet;
    if (nitVet !== undefined) updateData.nitVet = nitVet;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "vets",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      updateData.image = uploadResult.secure_url;
    }

    if (password !== undefined) {
      updateData.password = await bcryptjs.hash(password, 10);
    }

    const existingNitVet = await VetModel.findOne({ nitVet, _id: { $ne: id } });
    if (existingNitVet) {
      return res.status(400).json({ message: "El NIT ya está en uso por otra veterinaria" });
    }

    const updatedVet = await VetModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: false }
    );

    res.json({ message: "Veterinario actualizado con éxito", updatedVet });
  } catch (error) {
    console.error("Error al actualizar veterinario:", error);
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
