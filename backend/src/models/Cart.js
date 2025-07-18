import {Schema, model} from "mongoose";

const CartSchema = new Schema({
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
    idClients: {
        type: Schema.Types.ObjectId,
        ref: "Clients",
        require: true
    },
    name: {
        type: String,
        require: true
    },
    productquantity: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true
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