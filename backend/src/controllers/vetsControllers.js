import VetModel from "../models/Vets.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const vetControllers = {};

// 🟢 Obtener todos los veterinarias
vetControllers.get = async (req, res) => {
  try {
    const vets = await VetModel.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener veterinarios", error });
  }
};

//  Actualizar un veterinarias
vetControllers.put = async (req, res) => {
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
      },
      { new: true }
    );

    res.json({ message: "Veterinario actualizado con éxito", updatedVet });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar veterinario", error });
  }
};

// 🔴 Eliminar un veterinarias
vetControllers.delete = async (req, res) => {
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

export default vetControllers;
