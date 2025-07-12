//Array de metodos (C R U D)
const EmpleadosControllers = {};
import EmpleadosModel from "../models/Empleados.js";

// SELECT
EmpleadosControllers.getempleados = async (req, res) => {
  const employee = await EmpleadosModel.find();
  res.json(employee);
};

// INSERT
EmpleadosControllers.createempleados = async (req, res) => {
  try {
    //1-Pido todos los valores
    const {
      name,
      email,
      phone,
      birthday,
      address,
      password,
      hiredate,
      dui,
    } = req.body;

    if(!dui){
      return res.status(500).json({message: "Necesita un dui"})
    }

    if(edad < 18){
      return res.status(500).json({message: "Error debe ser mayor de edad"})
    }

    //2- Guardo los valores en la base de datos
    const newempleado = new EmpleadosModel({
        name,
        email,
        phone,
        birthday,
        address,
        password,
        hiredate,
        dui,
    });
    await newempleado.save();
    res.status(200).json({ message: "Empleado Guardado" });
  } catch (error) {

    res.status(500).json({message: "error internal server error"+error})
  }
};

// DELETE
EmpleadosControllers.deleteempleados = async (req, res) => {
  const deleteempleados = await EmpleadosModel.findByIdAndDelete(req.params.id);
  if (!deleteempleados) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "Empleado Eliminado" });
};

// UPDATE
EmpleadosControllers.updateempleados = async (req, res) => {
  // Solicito todos los valores
  const {
    name,
    email,
    phone,
    birthday,
    address,
    password,
    hiredate,
    dui,
  } = req.body;
  // Actualizo
  await empleadosModel.findByIdAndUpdate(
    req.params.id,
    {
        name,
        email,
        phone,
        birthday,
        address,
        password,
        hiredate,
        dui,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Empleado Actualizado" });
};

export default EmpleadosControllers;