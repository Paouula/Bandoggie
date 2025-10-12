// controllers/cleanupController.js
import clientsModel from "../models/client.js";
import VetModel from "../models/Vets.js";

export const deleteUnverifiedUsers = async () => {
  try {
    const result = await Promise.all([
      clientsModel.deleteMany({ emailVerified: false, createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      VetModel.deleteMany({ emailVerified: false, createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
    ]);

    console.log(`🧹 Usuarios no verificados eliminados: ${result.reduce((acc, r) => acc + r.deletedCount, 0)}`);
  } catch (error) {
    console.error("Error al eliminar usuarios no verificados:", error);
  }
};
