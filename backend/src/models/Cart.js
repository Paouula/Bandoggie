import {Schema, model} from "mongoose";

const CartSchema = new Schema({
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    idClients: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    name: {
        type: String,
        require: true
    },
    productquantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL'],
    },
    
    namedog: {
        type: String,
    },
    
}, {
    timestamps: true,
    strict: false
})

export default model("Cart", CartSchema)