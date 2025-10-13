import app from "./app.js";
import cron from "node-cron";
import { deleteUnverifiedUsers } from "./src/controllers/cleanupControllers.js";
import { connectDB } from "./database.js";
import { config } from "./src/config.js";

async function main() {
  try {
    // Conectar base de datos y esperar a que esté lista
    await connectDB();

    // Programar la tarea CRON (una vez la BD esté conectada)
    cron.schedule("0 0 * * *", async () => {
      console.log(" Ejecutando limpieza diaria de usuarios no verificados...");
      await deleteUnverifiedUsers();
    });

    // Iniciar servidor
    app.listen(config.server.port, () => {
      console.log(`🚀 Server running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
}

main();
