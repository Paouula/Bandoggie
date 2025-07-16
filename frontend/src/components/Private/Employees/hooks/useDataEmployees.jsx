import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const useDataEmployees = () => {
  const ApiEmployees = "http://localhost:4000/api/empleados";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [isssNumber, setIsssNumber] = useState("");
  const [errorEmpleado, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const cleanData = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setDui("");
    setAddress("");
    setBirthdate("");
    setHireDate("");
    setIsssNumber("");
    setId("");
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  // Función para crear un nuevo empleado
  const handleSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !name ||
      !lastName ||
      !email ||
      !telephone ||
      !dui ||
      !address ||
      !birthdate ||
      !hireDate ||
      !isssNumber
    ) {
      setError("Todos los campos son obligatorios");
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    // Validar que la contraseña sea requerida al crear
    if (!password) {
      setError("La contraseña es requerida");
      toast.error('La contraseña es requerida');
      setLoading(false);
      return;
    }

    try {
      const employeeData = {
        name,
        lastName,
        email,
        telephone,
        dui,
        address,
        birthdate,
        hireDate,
        isssNumber,
        password,
      };

      const response = await fetch(ApiEmployees, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Hubo un error al registrar el empleado");
      }

      const data = await response.json();
      toast.success('Empleado registrado exitosamente');
      setSuccess("Empleado registrado correctamente");
      cleanData();
      await fetchData(); // Asegurar que se actualice la lista
      
      // Llamar callback para cerrar modal
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      toast.error(error.message || 'Ocurrió un error al registrar el empleado');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los datos de los empleados
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(ApiEmployees);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Empleados obtenidos:", data);
      
      // Asegurar que data sea un array
      if (Array.isArray(data)) {
        setEmployees(data);
      } else if (data && Array.isArray(data.employees)) {
        setEmployees(data.employees);
      } else if (data && Array.isArray(data.data)) {
        setEmployees(data.data);
      } else {
        console.warn("Estructura de datos inesperada:", data);
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Error al cargar los empleados');
      setError(error.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEmployee = async (employeeId) => {
    if (!employeeId) {
      toast.error('ID de empleado no válido');
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${ApiEmployees}/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar el empleado");
      }

      toast.success('Empleado eliminado exitosamente');
      await fetchData(); // Recargar la lista
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(error.message || 'Error al eliminar el empleado');
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = (dataEmployee) => {
    if (!dataEmployee || !dataEmployee._id) {
      toast.error('Datos del empleado no válidos');
      return;
    }

    setId(dataEmployee._id);
    setName(dataEmployee.name || "");
    setLastName(dataEmployee.lastName || "");
    setEmail(dataEmployee.email || "");
    setTelephone(dataEmployee.telephone || "");
    setDui(dataEmployee.dui || "");
    setAddress(dataEmployee.address || "");
    setBirthdate(dataEmployee.birthdate || "");
    setHireDate(dataEmployee.hireDate || "");
    setIsssNumber(dataEmployee.isssNumber || "");
    setPassword(""); // No prellenar la contraseña
    setIsEditing(true);
    setError(null);
    setSuccess(null);
    setActiveTab("form");
  };

  const handleUpdate = async (e, onSuccess) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!id) {
      setError("ID del empleado no encontrado");
      toast.error('ID del empleado no encontrado');
      setLoading(false);
      return;
    }

    if (
      !name ||
      !lastName ||
      !email ||
      !telephone ||
      !dui ||
      !address ||
      !birthdate ||
      !hireDate ||
      !isssNumber
    ) {
      setError("Todos los campos son obligatorios");
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const updatedEmployee = {
        name,
        lastName,
        email,
        telephone,
        dui,
        address,
        birthdate,
        hireDate,
        isssNumber,
      };

      // Solo incluir password si se proporcionó
      if (password) {
        updatedEmployee.password = password;
      }

      const response = await fetch(`${ApiEmployees}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el empleado");
      }

      toast.success('Empleado actualizado exitosamente');
      setSuccess("Empleado actualizado correctamente");
      cleanData();
      setActiveTab("list");
      await fetchData(); // Recargar la lista
      
      // Llamar callback para cerrar modal
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      toast.error(error.message || 'Error al actualizar el empleado');
    } finally {
      setLoading(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    telephone,
    setTelephone,
    dui,
    setDui,
    address,
    setAddress,
    birthdate,
    setBirthdate,
    hireDate,
    setHireDate,
    isssNumber,
    setIsssNumber,
    errorEmpleado,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    employees,
    setEmployees,
    isEditing,
    setIsEditing,
    cleanData,
    handleSubmit,
    fetchData,
    deleteEmployee,
    updateEmployee,
    handleUpdate,
  };
};

export default useDataEmployees;