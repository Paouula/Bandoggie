const clientsControllers = {};

import clientsModel from "../models/Clients.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret,
  });

  
clientsControllers.get = async (req, res) => {
  try {
    const clients = await clientsModel.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients", error });
  }
};

clientsControllers.post = async (req, res) => {
  const { name, email, phone, birthday, password } = req.body;
  let imgUrl = "";
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imgUrl = result.secure_url;
    }
    const newClient = new clientsModel({
      name,
      email,
      phone,
      birthday,
      password,
      image: imgUrl,
    });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Error creating client", error });
  }
};

clientsControllers.put = async (req, res) => {
  const { name, email, phone, birthday, password } = req.body;
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid client ID" });
      }
    let imgUrl = "";
    
    const existingClient = await clientsModel.findById(id);
    if(!existingClient) {
        return res.status(404).json({ message: "Client not found" });
    }
    if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "png", "jpeg"],
          });
          imgUrl = result.secure_url;
        } catch (error) {
          console.error("Error al subir imagen:", error);
          return res.status(500).json({ error: "Error al subir la imagen" });
        }
      }
      const passwordHash = await bcryptjs.hash(password, 10);

      const updatedClient = await clientsModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          phone,
          birthday,
          password: passwordHash || existingClient.password,
          image: imgUrl || existingClient.image, 
        },
        { new: true }
      );
      res.json ({ message: "Client updated successfully", updatedClient });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Error updating client", error });
  }
};

clientsControllers.delete = async (req, res) => {
    const { id } = req.params;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid client ID" });
        }
        
        const deletedClient = await clientsModel.findByIdAndDelete(id);
        if (!deletedClient) {
        return res.status(404).json({ message: "Client not found" });
        }
        
        res.json({ message: "Client deleted successfully", deletedClient });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ message: "Error deleting client", error });
    }
}

export default clientsControllers;
