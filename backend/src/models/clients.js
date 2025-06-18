import {Schema, model} from 'mongoose';

const clientSchema = new Schema({
    name:{
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
    }
}, {
    timestamps: true,
    strict: true
})

export default model('Clients', clientSchema);