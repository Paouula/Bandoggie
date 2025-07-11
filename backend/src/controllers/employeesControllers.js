import employeesModel from '../models/Employees.js'
import bcryptjs from "bcryptjs";

const employeesControllers = {};

employeesControllers.get = async (req, res) => {
    try {
        const getEmployees = await employeesModel.find()

        console.log({ getEmployees })

        res.json({ getEmployees })

    } catch (error) {
        res.status(500).json({ message: "Error al obtener datos: " + error });
    }
}

employeesControllers.post = async (req, res) => {
    try {
        const {
            nameEmployees,
            email,
            phoneEmployees,
            dateOfBirthday,
            addressEmployees,
            password,
            hireDateEmployee,
            duiEmployees
        } = req.body;

        const passwordHash = await bcryptjs.hash(password, 10)

        let existingEmployees = await employeesModel.findOne({ email });
        if (existingEmployees) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const newEmployees = await employeesModel({
            nameEmployees,
            email,
            phoneEmployees,
            dateOfBirthday,
            addressEmployees,
            password: passwordHash,
            hireDateEmployee,
            duiEmployees
        })

        await newEmployees.save()

        console.log(newEmployees);

        res.status(500).json({ message: "Se ha registrado el nuevo empleado correctamente" })

    } catch (error) {
        res.status(500).json({ message: "Error al insertar los datos: " + error });
    }
}

employeesControllers.put = async (req, res) => {
    try {
        const {
            id,
            nameEmployees,
            email,
            phoneEmployees,
            dateOfBirthday,
            addressEmployees,
            password,
            hireDateEmployee,
            duiEmployees
        } = req.body;

        const existing = await employeesModel.findOne({ email });

        if (existing && existing._id.toString() !== id) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const passwordHash = await bcryptjs.hash(password, 10)

        const updateEmployees = await employeesModel.findByIdAndUpdate(req.params.id, {
            nameEmployees,
            email,
            phoneEmployees,
            dateOfBirthday,
            addressEmployees,
            password: passwordHash,
            hireDateEmployee,
            duiEmployees
        }, { new: true })

        console.log(updateEmployees);

        res.status(200).json({ message: "Empleado actualizado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al actualizar los datos: " + error });
    }
}

employeesControllers.delete = async (req, res) => {
    try {
        const deleteEmployee = await employeesControllers.findByIdAndDelete(req.params.id)

        console.log(deleteEmployee)

        res.status(200).json({ message: "Empleado eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el empleado: " + error });
    }
}

export default employeesControllers;