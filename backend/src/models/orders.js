import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  idCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: false // 🆕 Hacer opcional para órdenes de invitados
  },
  customerEmail: {
    type: String,
    required: true, // 🆕 Agregar campo obligatorio
    trim: true,
    lowercase: true
  },
  customerName: {
    type: String,
    required: true, // 🆕 Agregar campo obligatorio
    trim: true
  },
  addressClient: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['transferencia', 'efectivo'],
    required: true,
    lowercase: true
  },
  isGuest: {
    type: Boolean,
    default: false // 🆕 Identificar órdenes de invitados
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);