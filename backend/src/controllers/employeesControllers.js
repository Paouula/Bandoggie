import employeesModel from "../models/Employees.js";
import bcryptjs from "bcryptjs";

const employeesControllers = {};

// Obtener todos los empleados
employeesControllers.get = async (req, res) => {
  try {
    const employees = await employeesModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos: " + error });
  }
};

// Registrar nuevo empleado (con validaciones internas)
employeesControllers.post = async (req, res) => {
  try {
    const {
      nameEmployees,
      email,
      phoneEmployees,
      dateOfBirth,
      addressEmployees,
      password,
      hireDateEmployee,
      duiEmployees,
    } = req.body;

    const errors = [];

    // Nombre (solo letras y espacios)
    if (!nameEmployees || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/.test(nameEmployees)) {
      errors.push("Nombre inválido");
    }

    // Correo (estructura básica)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Correo electrónico inválido");
    }

    // Teléfono (formato 1111-1111)
    if (!phoneEmployees || !/^\d{4}-\d{4}$/.test(phoneEmployees)) {
      errors.push("Teléfono inválido (formato 1111-1111)");
    }

    // Fecha de nacimiento válida y mayor de edad
    if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
      errors.push("Fecha de nacimiento inválida");
    } else {
      const birthYear = new Date(dateOfBirth).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear < 18) errors.push("El empleado debe ser mayor de edad");
    }

    // Dirección
    if (!addressEmployees || addressEmployees.trim().length < 5) {
      errors.push("Dirección obligatoria");
    }

    // Contraseña
    if (!password || password.length < 8 || password.length > 30) {
      errors.push("Contraseña entre 8 y 30 caracteres");
    }

    // Fecha de contratación
    if (!hireDateEmployee || isNaN(Date.parse(hireDateEmployee))) {
      errors.push("Fecha de contratación inválida");
    }

    // DUI
    if (!duiEmployees || !/^\d{8}-\d{1}$/.test(duiEmployees)) {
      errors.push("DUI inválido (formato 12345678-9)");
    }

    // Si hay errores, se detiene
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(", ") });
    }

    // Verificar si el correo ya existe
    const exists = await employeesModel.findOne({ email });
    if (exists) return res.status(400).json({ message: "El usuario ya existe" });

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crear empleado
    const newEmployee = new employeesModel({
      nameEmployees,
      email,
      phoneEmployees,
      dateOfBirth,
      addressEmployees,
      password: passwordHash,
      hireDateEmployee,
      duiEmployees,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Empleado registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al insertar datos: " + error });
  }
};

// Actualizar empleado (solo valida que los campos no estén vacíos)
employeesControllers.put = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const body = req.body;

    // Verificar existencia
    const existingEmployee = await employeesModel.findById(idToUpdate);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    const updateData = {};

    // Validar que los campos enviados no estén vacíos o nulos
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        updateData[key] = value;
      }
    }

    // Si hay contraseña, la encripta
    if (body.password && body.password.trim() !== "") {
      updateData.password = await bcryptjs.hash(body.password, 10);
    }

    // Si no hay datos válidos que actualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No se enviaron campos válidos para actualizar" });
    }

    const updatedEmployee = await employeesModel.findByIdAndUpdate(
      idToUpdate,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Empleado actualizado correctamente",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ message: "Error al actualizar datos: " + error });
  }
};

// Eliminar empleado
employeesControllers.delete = async (req, res) => {
  try {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar empleado: " + error });
  }
};

export default employeesControllers;
