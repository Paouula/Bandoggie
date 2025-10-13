//Import mongoose y config
import mongoose from "mongoose";
import { config } from "./src/config.js";

export const connectDB = async () => {
  // 2- Conecto la base de datos
  try {
    await mongoose.connect(config.db.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // 3- Creo una constante que es igual a la conexion
    const connection = mongoose.connection;

    connection.once("open", () => {
      console.log("✅ DB is connected");
    });

    connection.on("disconnected", () => {
      console.log("⚠️ DB is disconnected");
    });

    connection.on("error", (error) => {
      console.error("❌ Error found: " + error);
    });

    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
