//Importo el archivo app.js
import app from "./app.js"
import cron from "node-cron";


import { deleteUnverifiedUsers } from "./src/controllers/cleanupControllers.js";


//Importar el archivo de conexión de la base de datos 
import "./database.js";

//Importo el archivo config 
import { config } from "./src/config.js";

cron.schedule("15 21 * * *", async () => {
  console.log("Ejecutando limpieza diaria de usuarios no verificados...");
  await deleteUnverifiedUsers();
});

//Luego creo una función que ejecuta el servidor 
async function main() {
    app.listen(config.server.port);
    console.log("Server running: " + config.server.port);
}

//Ejecuto la función
main();