import mongoose from 'mongoose';

const { Schema } = mongoose;

// ✅ Esquema del carrito con idClient OPCIONAL
const cartSchema = new Schema(
  {
    idClient: {
      type: Schema.Types.ObjectId,
      ref: 'Clients',  // ✅ Debe coincidir con tu modelo
      required: false,
      default: null,
      validate: {
        validator: function(v) {
          // Si se proporciona un valor, debe ser un ObjectId válido o null
          return v === null || v === undefined || mongoose.Types.ObjectId.isValid(v);
        },
        message: 'ID de cliente inválido'
      }
    },
    products: [
      {
        idProduct: {
          type: Schema.Types.ObjectId,
          ref: 'Products',  // ✅ Debe coincidir con tu modelo
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'La cantidad debe ser al menos 1'],
        },
        subtotal: {
          type: Number,
          required: true,
          min: [0, 'El subtotal no puede ser negativo'],
        },
        talla: {
          type: String,
          enum: ['XS', 'S', 'M', 'L'],  // ✅ Exactamente como en tu esquema
          required: false,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: [0, 'El total no puede ser negativo'],
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Paid'],
        message: "El estado del pedido debe ser 'Pending' o 'Paid'"
      },
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Índices para mejorar el rendimiento de las consultas
cartSchema.index({ idClient: 1, status: 1 });
cartSchema.index({ status: 1 });
cartSchema.index({ createdAt: -1 });

// Middleware pre-save para validar que haya al menos un producto
cartSchema.pre('save', function(next) {
  if (!this.products || this.products.length === 0) {
    next(new Error('El carrito debe tener al menos un producto'));
  } else {
    next();
  }
});

// Middleware pre-save para recalcular el total automáticamente
cartSchema.pre('save', function(next) {
  if (this.products && this.products.length > 0) {
    this.total = this.products.reduce((sum, product) => sum + product.subtotal, 0);
  }
  next();
});

// Método para verificar si el carrito pertenece a un invitado
cartSchema.methods.isGuestCart = function() {
  return this.idClient === null || this.idClient === undefined;
};

// Método para obtener información del tipo de usuario
cartSchema.methods.getCustomerType = function() {
  return this.isGuestCart() ? 'INVITADO' : 'REGISTRADO';
};

// Método virtual para contar productos en el carrito
cartSchema.virtual('totalItems').get(function() {
  return this.products.reduce((sum, product) => sum + product.quantity, 0);
});

// Asegurar que los virtuals se incluyan en JSON
cartSchema.set('toJSON', { virtuals: true });
cartSchema.set('toObject', { virtuals: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;