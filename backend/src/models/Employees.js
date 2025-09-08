import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    nameEmployees: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // 👈 recomendable para login
        trim: true
    },
    phoneEmployees: {
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    addressEmployees: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    hireDateEmployee: {
        type: Date,
        required: true,
        trim: true
    },
    duiEmployees: {
        type: String,
        required: true,
        trim: true
    },

    //Seguridad para intentos fallidos
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Employees", employeeSchema);
