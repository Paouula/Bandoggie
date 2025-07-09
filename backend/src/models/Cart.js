import {Schema, model} from "mongoose";

const CartSchema = new Schema({
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    idClients: {
        type: Schema.Types.ObjectId,
        ref: "Client",
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
    
}, {
    timestamps: true,
    strict: false
})

export default model("Cart", CartSchema)