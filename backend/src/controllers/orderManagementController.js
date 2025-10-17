import mongoose from "mongoose";
import Order from "../models/orders.js";
import Cart from "../models/Cart.js";
import OrderManagement from "../models/OrderManagement.js";

const OrderController = {};

// ========== ÓRDENES DE CLIENTES (Order) ==========

// Obtener todas las órdenes de clientes
OrderController.getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('idClient', 'name email phone')
      .populate('products.idProduct', 'name price category image')
      .sort({ orden: 1, createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener los pedidos", 
      error: error.message 
    });
  }
};

// Obtener una orden por ID
OrderController.getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('idClient', 'name email phone')
      .populate('products.idProduct', 'name price category image');
    
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener la orden", 
      error: error.message 
    });
  }
};

// Crear orden desde carrito
OrderController.createFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { metodoPago, direccionEnvio, notas, prioridad, fechaEstimadaEntrega } = req.body;

    const cart = await Cart.findById(cartId).populate('products.idProduct');
    
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    const orderData = {
      idCart: cartId,
      idClient: cart.idClient,
      products: cart.products,
      total: cart.total,
      metodoPago,
      direccionEnvio,
      notas,
      prioridad: prioridad || 'media',
      fechaEstimadaEntrega
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(201).json({ 
      message: "Orden creada exitosamente", 
      data: newOrder 
    });
  } catch (error) {
    res.status(400).json({ 
      message: "Error al crear la orden", 
      error: error.message 
    });
  }
};

// Actualizar orden
OrderController.update = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ 
      message: "Error al actualizar la orden", 
      error: error.message 
    });
  }
};

// Eliminar orden
OrderController.delete = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    
    if (!deletedOrder) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    
    res.status(200).json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ 
      message: "Error al eliminar la orden", 
      error: error.message 
    });
  }
};

// ========== ÓRDENES INTERNAS / KANBAN (OrderManagement) ==========

// Crear orden interna (tarea Kanban)
OrderController.crearOrdenInterna = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Debug
    
    const nuevaOrden = new OrderManagement(req.body);
    await nuevaOrden.save();
    
    console.log(' Orden creada:', nuevaOrden); // Debug
    
    res.status(201).json({ 
      message: "Orden creada exitosamente", 
      data: nuevaOrden 
    });
  } catch (error) {
    console.error(' Error al crear orden:', error); // Debug
    res.status(400).json({ 
      message: "Error al crear la orden", 
      error: error.message 
    });
  }
};

// Obtener todas las órdenes internas
OrderController.obtenerOrdenesInternas = async (req, res) => {
  try {
    console.log(' Obteniendo órdenes internas...'); // Debug
    
    const ordenes = await OrderManagement.find().sort({ orden: 1, createdAt: -1 });
    
    console.log(` Órdenes encontradas: ${ordenes.length}`); // Debug
    
    res.status(200).json(ordenes);
  } catch (error) {
    console.error('Error al obtener órdenes:', error); // Debug
    res.status(500).json({ 
      message: "Error al obtener las órdenes",
      error: error.message 
    });
  }
};

// Actualizar orden interna
OrderController.actualizarOrdenInterna = async (req, res) => {
  try {
    console.log('Actualizando orden:', req.params.id, req.body); // Debug
    
    const ordenActualizada = await OrderManagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!ordenActualizada) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    
    console.log('Orden actualizada:', ordenActualizada); // Debug
    
    res.status(200).json(ordenActualizada);
  } catch (error) {
    console.error('Error al actualizar orden:', error); // Debug
    res.status(400).json({ 
      message: "Error al actualizar la orden", 
      error: error.message 
    });
  }
};

// Eliminar orden interna
OrderController.eliminarOrdenInterna = async (req, res) => {
  try {
    console.log('Eliminando orden:', req.params.id); // Debug
    
    const ordenEliminada = await OrderManagement.findByIdAndDelete(req.params.id);
    
    if (!ordenEliminada) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    
    console.log('Orden eliminada'); // Debug
    
    res.status(200).json({ message: "Orden eliminada exitosamente" });
  } catch (error) {
    console.error('Error al eliminar orden:', error); // Debug
    res.status(500).json({ 
      message: "Error al eliminar la orden",
      error: error.message 
    });
  }
};

export default OrderController;