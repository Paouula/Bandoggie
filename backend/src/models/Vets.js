import { Schema, model } from "mongoose";

const vetSchema = new Schema({
    nameVet:{
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
    password: {
        type: String,
        required: true,
        trim: true
    },
    locationVet: {
        type: String,
        required: true,
        trim: true
    },
    nitVet: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
},{
    timestamps: true,
    strict: true
})

export default model('Vet', vetSchema);