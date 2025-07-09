const productsController = {};
import productsModel from "../models/Products.js";

//SELECT
productsController.getProduct = async (req, res) => {
   try {
       const products = await productsModel.find()
           .populate('idHolidayProduct', 'nameHoliday')
           .populate('idCategory', 'nameCategory')
       res.json(products)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
}

//SELECT BY ID
productsController.getProductById = async (req, res) => {
   try {
       const product = await productsModel.findById(req.params.id)
           .populate('idHolidayProduct', 'nameHoliday')
           .populate('idCategory', 'nameCategory')
       
       if (!product) {
           return res.status(404).json({ message: "Product not found" })
       }
       
       res.json(product)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
}

//INSERT
productsController.insertProduct = async (req, res) => {
    try {
        const { nameProduct, price, description, image, designImages, idHolidayProduct, idCategory } = req.body;
        
        console.log("Datos recibidos:", { nameProduct, price, description, image, designImages, idHolidayProduct, idCategory });
        
        // Validación adicional del lado del controlador
        if (!designImages || !Array.isArray(designImages)) {
            return res.status(400).json({ 
                message: "El campo designImages es requerido y debe ser un array" 
            });
        }
        
        if (designImages.length < 3) {
            return res.status(400).json({ 
                message: "Se requieren mínimo 3 imágenes de diseño" 
            });
        }
        
        if (designImages.length > 10) {
            return res.status(400).json({ 
                message: "Máximo 10 imágenes de diseño permitidas" 
            });
        }
        
        const newProduct = new productsModel({ 
            nameProduct, 
            price, 
            description, 
            image, 
            designImages,
            idHolidayProduct, 
            idCategory 
        })
        const savedProduct = await newProduct.save()
        
        // Populate el producto recién creado antes de responder
        const populatedProduct = await productsModel.findById(savedProduct._id)
            .populate('idHolidayProduct', 'nameHoliday')
            .populate('idCategory', 'nameCategory')
        
        res.status(201).json({
            message: "Product saved successfully",
            product: populatedProduct
        })
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: error.message })
    }
}

//DELETE
productsController.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productsModel.findByIdAndDelete(req.params.id)
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        res.json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//UPDATE
productsController.updateProduct = async (req, res) => {
    try {
        const { nameProduct, price, description, image, designImages, idHolidayProduct, idCategory } = req.body;
        
        // Validación de designImages si se proporciona en la actualización
        if (designImages !== undefined) {
            if (!Array.isArray(designImages)) {
                return res.status(400).json({ 
                    message: "El campo designImages debe ser un array" 
                });
            }
            
            if (designImages.length < 3) {
                return res.status(400).json({ 
                    message: "Se requieren mínimo 3 imágenes de diseño" 
                });
            }
            
            if (designImages.length > 10) {
                return res.status(400).json({ 
                    message: "Máximo 10 imágenes de diseño permitidas" 
                });
            }
        }
        
        const updatedProduct = await productsModel.findByIdAndUpdate(
            req.params.id,
            { nameProduct, price, description, image, designImages, idHolidayProduct, idCategory }, 
            { new: true, runValidators: true }
        ).populate('idHolidayProduct', 'nameHoliday')
         .populate('idCategory', 'nameCategory')
        
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        
        res.json({
            message: "Product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//SELECT BY CATEGORY
productsController.getProductsByCategory = async (req, res) => {
    try {
        const products = await productsModel.find({ idCategory: req.params.categoryId })
            .populate('idHolidayProduct', 'nameHoliday')
            .populate('idCategory', 'nameCategory')
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//SELECT BY HOLIDAY
productsController.getProductsByHoliday = async (req, res) => {
    try {
        const products = await productsModel.find({ idHolidayProduct: req.params.holidayId })
            .populate('idHolidayProduct', 'nameHoliday')
            .populate('idCategory', 'nameCategory')
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default productsController;