/*
    Campos:
        name,
        email,
        phone,
        birthday,
        password,
        image
*/

import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    emailVerified: { 
        type: Boolean, 
        default: false 
    },

    // Seuridad para intentos fallidos
    loginAttempts: { 
        type: Number, 
        default: 0 
    },
    lockUntil: { 
        type: Date 
    }
}, {
    timestamps: true,
    strict: true
});

export default model('Clients', clientSchema);


