/*
    Campos:
        idClients,
        listProducts,
        dateOrders,
        idProduct,
        addressClient,
        subTotal,
        total
*/

import {Schema, model} from "mongoose";

const OrdersSchema = new Schema({

    idClients: {
        type: Schema.Types.ObjectId,
        ref: "Clients",
        require: true
    },

    listProducts: {
        type: String,
        require: true
    },

    dateOrders: {
        type: Date,
        require: true
    },

     idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },

    addressClient: {
        type: String,
        require: true
    },

    subTotal: {
        type: Number,
        require: true
    },
    
    total: {
        type: Number,
        require: true
    },
    
}, {
    timestamps: true,
    strict: false
})

export default model("Orders", OrdersSchema)