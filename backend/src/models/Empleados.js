import { Schema, model } from "mongoose";

const EmpleadosSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
        type: String,
      },
    
    phone: {
        type: String,
        require: true,
      },

    birthday: {
      type: Date,
      require: true,
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      require: true,
    },

    hireDate: {
      type: String,
    },
    
    dui: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("empleados", EmpleadosSchema);