//Array de metodos (C R U D)
const categoriesControllers = {};
import categoriesModel from "../models/Categories.js";

// SELECT
categoriesControllers.getcategorias = async (req, res) => {
  const categories = await categoriesModel.find();
  res.json(categories);
};

// INSERT
categoriesControllers.createcategorias = async (req, res) => {
  const { nameCategory } = req.body;
  const newCategory = new categoriesModel({ nameCategory });
  await newCategory.save();
  res.json({ message: "Categoria Guardada" });
};

// DELETE
categoriesControllers.deletecategorias = async (req, res) => {
const deleteCategory = await categoriesModel.findByIdAndDelete(req.params.id);
  if (!deleteCategory) {
    return res.status(404).json({ message: "Categorias no se encuentran" });
  }
  res.json({ message: "Categoria Eliminada" });
};

// UPDATE
categoriesControllers.updatecategorias = async (req, res) => {
  // Solicito todos los valores
  const { nameCategory } = req.body;
  // Actualizo
  await categoriesModel.findByIdAndUpdate(
    req.params.id,
    {
        nameCategory
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Categoria Actualizada" });
};

export default categoriesControllers;