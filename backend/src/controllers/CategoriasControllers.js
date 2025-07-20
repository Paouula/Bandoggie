const CategoriasControllers = {};
import CategoriasModel from "../models/Categorias.js";
import mongoose from "mongoose";

// ✅ Obtener todas las categorías
CategoriasControllers.getcategorias = async (req, res) => {
  try {
    const categorias = await CategoriasModel.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};

// ✅ Crear una nueva categoría
CategoriasControllers.createcategorias = async (req, res) => {
  try {
    const { nameCategory } = req.body;

    // Validación: campo obligatorio
    if (!nameCategory || nameCategory.trim() === "") {
      return res.status(400).json({ message: "El campo nameCategory es obligatorio" });
    }

    // Validación: evitar duplicados
    const existe = await CategoriasModel.findOne({ nameCategory: nameCategory.trim() });
    if (existe) {
      return res.status(409).json({ message: "La categoría ya existe" });
    }

    const newCategoria = new CategoriasModel({ nameCategory: nameCategory.trim() });
    await newCategoria.save();
    res.status(201).json({ message: "Categoría guardada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la categoría", error });
  }
};

// ✅ Eliminar una categoría
CategoriasControllers.deletecategorias = async (req, res) => {
  try {
    const { id } = req.params;

    // Validación: ID válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const categoriaEliminada = await CategoriasModel.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

// ✅ Actualizar una categoría
CategoriasControllers.updatecategorias = async (req, res) => {
  try {
    const { id } = req.params;
    const { nameCategory } = req.body;

    // Validaciones
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    if (!nameCategory || nameCategory.trim() === "") {
      return res.status(400).json({ message: "El campo nameCategory es obligatorio" });
    }

    // Validación: evitar duplicado en otra categoría
    const existe = await CategoriasModel.findOne({ nameCategory: nameCategory.trim(), _id: { $ne: id } });
    if (existe) {
      return res.status(409).json({ message: "Ya existe otra categoría con ese nombre" });
    }

    const categoriaActualizada = await CategoriasModel.findByIdAndUpdate(
      id,
      { nameCategory: nameCategory.trim() },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la categoría", error });
  }
};

export default CategoriasControllers;
