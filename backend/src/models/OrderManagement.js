/**
  Modelo de OrderManagement (Gestión Interna de Órdenes tipo Kanban)
  Este modelo representa las tareas/órdenes internas del sistema Kanban
  
  Campos:
    titulo - Nombre de la tarea/orden
    descripcion - Descripción detallada (opcional)
    estado - Estado actual (pendiente, en_proceso, completado, cancelado)
    prioridad - Nivel de prioridad
    fechaLimite - Fecha límite para completar
    asignadoA - Persona asignada a la tarea
    orden - Número de orden dentro de cada columna (para ordenamiento visual)
*/

import { Schema, model } from "mongoose";

const OrderManagementSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
    maxlength: [200, "El título no puede exceder 200 caracteres"]
  },

  descripcion: {
    type: String,
    default: "",
    maxlength: [1000, "La descripción no puede exceder 1000 caracteres"]
  },

  estado: {
    type: String,
    enum: {
      values: ["pendiente", "en_proceso", "completado", "cancelado"],
      message: "El estado debe ser 'pendiente', 'en_proceso', 'completado' o 'cancelado'"
    },
    default: "pendiente"
  },

  prioridad: {
    type: String,
    enum: {
      values: ["baja", "media", "alta", "urgente"],
      message: "La prioridad debe ser 'baja', 'media', 'alta' o 'urgente'"
    },
    default: "media"
  },

  fechaLimite: {
    type: Date,
    required: false
  },

  asignadoA: {
    type: String,
    trim: true,
    default: ""
  },

  orden: {
    type: Number,
    default: 0,
    min: [0, "El orden no puede ser negativo"]
  }
}, {
  timestamps: true  // Crea automáticamente createdAt y updatedAt
});

// Índices para mejorar el rendimiento de las consultas
OrderManagementSchema.index({ estado: 1, orden: 1 });
OrderManagementSchema.index({ createdAt: -1 });
OrderManagementSchema.index({ prioridad: 1 });

export default model("OrderManagement", OrderManagementSchema);