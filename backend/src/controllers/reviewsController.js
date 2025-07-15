const reviewsController = {};
import reviewsModel from "../models/reviews.js";

//SELECT - Obtener todas las reseñas
reviewsController.getReviews = async (req, res) => {
   try {
       const reviews = await reviewsModel.find()
           .populate('idClients', 'nameClient emailClient')
           .populate('idProducts', 'nameProduct price')
           .sort({ publicationDate: -1 }) // Ordenar por fecha más reciente
       res.json(reviews)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
}

//SELECT BY ID - Obtener reseña por ID
reviewsController.getReviewById = async (req, res) => {
   try {
       const review = await reviewsModel.findById(req.params.id)
           .populate('idClients', 'nameClient emailClient')
           .populate('idProducts', 'nameProduct price')
       
       if (!review) {
           return res.status(404).json({ message: "Review not found" })
       }
       
       res.json(review)
   } catch (error) {
       res.status(500).json({ message: error.message })
   }
}

//INSERT - Crear nueva reseña
reviewsController.insertReview = async (req, res) => {
    try {
        const { qualification, Coment, imagen1, imagen2, imagen3, idClients, idProducts } = req.body;
        
        console.log("Datos recibidos:", { qualification, Coment, imagen1, imagen2, imagen3, idClients, idProducts });
        
        // Validaciones adicionales
        if (qualification < 1 || qualification > 5) {
            return res.status(400).json({ 
                message: "La calificación debe estar entre 1 y 5" 
            });
        }
        
        const newReview = new reviewsModel({ 
            qualification,
            Coment,
            imagen1,
            imagen2,
            imagen3,
            idClients,
            idProducts
        })
        const savedReview = await newReview.save()
        
        // Populate la reseña recién creada antes de responder
        const populatedReview = await reviewsModel.findById(savedReview._id)
            .populate('idClients', 'nameClient emailClient')
            .populate('idProducts', 'nameProduct price')
        
        res.status(201).json({
            message: "Review saved successfully",
            review: populatedReview
        })
    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ message: error.message })
    }
}

//DELETE - Eliminar reseña
reviewsController.deleteReview = async (req, res) => {
    try {
        const deletedReview = await reviewsModel.findByIdAndDelete(req.params.id)
        
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" })
        }
        
        res.json({message: "Review deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//UPDATE - Actualizar reseña
reviewsController.updateReview = async (req, res) => {
    try {
        const { qualification, Coment, imagen1, imagen2, imagen3, idClients, idProducts } = req.body;
        
        // Validación de calificación si se proporciona
        if (qualification !== undefined && (qualification < 1 || qualification > 5)) {
            return res.status(400).json({ 
                message: "La calificación debe estar entre 1 y 5" 
            });
        }
        
        const updatedReview = await reviewsModel.findByIdAndUpdate(
            req.params.id,
            { qualification, Coment, imagen1, imagen2, imagen3, idClients, idProducts }, 
            { new: true, runValidators: true }
        ).populate('idClients', 'nameClient emailClient')
         .populate('idProducts', 'nameProduct price')
        
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" })
        }
        
        res.json({
            message: "Review updated successfully",
            review: updatedReview
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//SELECT BY PRODUCT - Obtener reseñas por producto
reviewsController.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await reviewsModel.find({ idProducts: req.params.productId })
            .populate('idClients', 'nameClient emailClient')
            .populate('idProducts', 'nameProduct price')
            .sort({ publicationDate: -1 })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//SELECT BY CLIENT - Obtener reseñas por cliente
reviewsController.getReviewsByClient = async (req, res) => {
    try {
        const reviews = await reviewsModel.find({ idClients: req.params.clientId })
            .populate('idClients', 'nameClient emailClient')
            .populate('idProducts', 'nameProduct price')
            .sort({ publicationDate: -1 })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//SELECT BY QUALIFICATION - Obtener reseñas por calificación
reviewsController.getReviewsByQualification = async (req, res) => {
    try {
        const qualification = parseInt(req.params.qualification);
        
        if (qualification < 1 || qualification > 5) {
            return res.status(400).json({ 
                message: "La calificación debe estar entre 1 y 5" 
            });
        }
        
        const reviews = await reviewsModel.find({ qualification: qualification })
            .populate('idClients', 'nameClient emailClient')
            .populate('idProducts', 'nameProduct price')
            .sort({ publicationDate: -1 })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//STATISTICS - Obtener estadísticas de reseñas por producto
reviewsController.getProductReviewStats = async (req, res) => {
    try {
        const stats = await reviewsModel.aggregate([
            { $match: { idProducts: req.params.productId } },
            {
                $group: {
                    _id: "$idProducts",
                    totalReviews: { $sum: 1 },
                    averageRating: { $avg: "$qualification" },
                    ratings: {
                        $push: {
                            rating: "$qualification",
                            count: 1
                        }
                    }
                }
            },
            {
                $project: {
                    totalReviews: 1,
                    averageRating: { $round: ["$averageRating", 2] },
                    ratingDistribution: {
                        $arrayToObject: {
                            $map: {
                                input: [1, 2, 3, 4, 5],
                                as: "rating",
                                in: {
                                    k: { $toString: "$$rating" },
                                    v: {
                                        $size: {
                                            $filter: {
                                                input: "$ratings",
                                                cond: { $eq: ["$$this.rating", "$$rating"] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);
        
        if (stats.length === 0) {
            return res.json({
                totalReviews: 0,
                averageRating: 0,
                ratingDistribution: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
            });
        }
        
        res.json(stats[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export default reviewsController;