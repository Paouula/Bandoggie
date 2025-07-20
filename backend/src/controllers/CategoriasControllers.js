const CategoriasControllers = {};
import CategoriasModel from "../models/Categorias.js";

// SELECT - Obtener todas las categorías
CategoriasControllers.getcategorias = async (req, res) => {
  try {
    const categorias = await CategoriasModel.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};

// INSERT - Crear nueva categoría
CategoriasControllers.createcategorias = async (req, res) => {
  try {
    const { nameCategory } = req.body;

    // Validación básica
    if (!nameCategory || nameCategory.trim() === "") {
      return res.status(400).json({ message: "El campo nameCategory es obligatorio" });
    }

    const newCategoria = new CategoriasModel({ nameCategory });
    await newCategoria.save();
    res.json({ message: "Categoría guardada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la categoría", error });
  }
};

// DELETE - Eliminar categoría por ID
CategoriasControllers.deletecategorias = async (req, res) => {
  try {
    const categoriaEliminada = await CategoriasModel.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

// UPDATE - Actualizar categoría por ID
CategoriasControllers.updatecategorias = async (req, res) => {
  try {
    const { nameCategory } = req.body;

    // Validación
    if (!nameCategory || nameCategory.trim() === "") {
      return res.status(400).json({ message: "El campo nameCategory es obligatorio" });
    }

    const categoriaActualizada = await CategoriasModel.findByIdAndUpdate(
      req.params.id,
      { nameCategory },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la categoría", error });
  }
};

export default CategoriasControllers;
