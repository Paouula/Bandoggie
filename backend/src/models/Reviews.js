import { Schema, model } from "mongoose";

const ReviewsSchema = new Schema({
  qualification: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date,
    default: Date.now
  },

  designImages: {
    type: [String],
    validate: [
      {
        validator: function (images) {
          if (!images || images.length === 0) return true;
          return images.length >= 1;
        },
        message: "Se requieren mínimo 1 imágenes de diseño si se incluyen"
      },
      {
        validator: function (images) {
          if (!images || images.length === 0) return true;
          return images.length <= 5;
        },
        message: "Máximo 5 imágenes de diseño permitidas"
      }
    ]
  },

  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Formato de correo inválido"]
  },

  idProduct: {
    type: Schema.Types.ObjectId,
    ref: "Products",
    required: true
  },

  isVerifieldReview: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict: false
});

export default model("Reviews", ReviewsSchema);
