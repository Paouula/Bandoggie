import mongoose, { Schema, model } from "mongoose";

const vetSchema = new Schema(
  {
    nameVet: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    locationVet: {
      type: String,
      required: true,
      trim: true,
    },
    nitVet: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    emailVerified: { 
      type: Boolean, 
      default: false 
    },

    // Segurdad para intentos fallidos
    loginAttempts: { 
      type: Number, 
      default: 0 
    },
    lockUntil: { 
      type: Date 
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Evita el OverwriteModelError si ya está declarado
export default mongoose.models.Vet || model("Vet", vetSchema);
