import ordersModel from "../models/orders.js";

// Array de funciones vacías
const ordersController = {};

// Select
ordersController.getOrder = async (req, res) => {
  try {
    const orders = await ordersModel.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Insert
ordersController.createOrder = async (req, res) => {
  try {
    //Solicitar los datos
    const { idClients, listProducts, dateOrders, idProduct, addressClient, subTotal, total } = req.body;

    if (total < 0) {
      return res.status(400).json({ message: "Insert valid values" });
    }

    //Guardamos en la base de datos
    const newOrder = new ordersModel({ idClients, listProducts, dateOrders, idProduct, addressClient, subTotal, total });
    await newOrder.save();

    res.status(200).json({ message: "Order saved" });
  } catch (error) {
    console.log("error" + error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export default ordersController;