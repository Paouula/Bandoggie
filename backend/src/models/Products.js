import {Schema, model} from "mongoose";

const ProductsSchema = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    designImages: {
        type: [String],
        validate: [
            {
                validator: function(images) {
                    return images.length >= 3;
                },
                message: 'Se requieren mínimo 3 imágenes de diseño'
            },
            {
                validator: function(images) {
                    return images.length <= 10;
                },
                message: 'Máximo 10 imágenes de diseño permitidas'
            }
        ],
        required: true
    },

    idHolidayProduct: {
        type: Schema.Types.ObjectId,
        ref: "Holiday",
        required: true
    },
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Products", ProductsSchema)