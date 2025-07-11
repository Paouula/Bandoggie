const CartController = {};

import Cart from "../models/Cart.js";
import mongoose from "mongoose";

// Obtener todos los carritos
CartController.getAll = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate('idProducts')
            .populate('idClients');
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching carts", error });
    }
};

// Obtener carrito por ID
CartController.getById = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
            .populate('idProducts')
            .populate('idClients');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// Crear un nuevo carrito
CartController.create = async (req, res) => {
    try {
        const { idProducts, idClients, name, productquantity, price } = req.body;
        const newCart = new Cart({
            idProducts,
            idClients,
            name,
            productquantity,
            price
        });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Error creating cart", error });
    }
};

// Actualizar un carrito
CartController.update = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid cart ID" });
        }
        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json({ message: "Cart updated successfully", updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
};

// Eliminar un carrito
CartController.delete = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid cart ID" });
        }
        const deletedCart = await Cart.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json({ message: "Cart deleted successfully", deletedCart });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cart", error });
    }
};

export default CartController;