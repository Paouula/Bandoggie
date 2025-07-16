import { model, Schema } from "mongoose";

const salesSchema = new Schema({
    product: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true 
    },
    customer: {
        type: String,
        required: true
    },
    total: {
        type: Number, 
        required: true, 
        min: 0 
    }
}, {
    timestamps: true, 
    strict: false
});

// Índices 
salesSchema.index({ category: 1 });
salesSchema.index({ product: 1 });
salesSchema.index({ customer: 1 });
salesSchema.index({ createdAt: 1 });

export default model("Sales", salesSchema);