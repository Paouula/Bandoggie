import {Schema, model} from "mongoose";

const ReviewsSchema = new Schema({
    qualification: {
        type: Number,
        require: true
    },
    Coment: {
        type: String,
        require: true
    },
    publicationDate: {
        type : Date,
        default : Date.now
    },
    imagen1: {
        type: String,
    },
     imagen2: {
        type: String,
    },
     imagen3: {
        type: String,
    },
    idClients: {
        type: Schema.Types.ObjectId,
        ref: "Clients",
        require: true
    },
    idProducts: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        require: true
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Reviews", ReviewsSchema)