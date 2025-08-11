import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Employee.css";
import Loading from "../../../components/LoadingScreen/LoadingScreen.jsx";
import EquipoEmp from "../../../img/Empleados/EquipoEmp.png";
import LineaDivisora from "../../../components/LineaDivisora.jsx";
import ListEmployees from "../../../components/Private/Employees/ListEmployees.jsx";
import BannerPrivate from "../../../components/Private/BannerPrivate/BannerPrivate.jsx";
import AgregarButton from "../../../components/Private/AgregarButton.jsx";
import Paginacion from "../../../components/Pagination.jsx";
import RegisterEmployee from "../../../components/Private/Employees/RegisterEmployees.jsx";
import useFetchEmployees from "../../../hooks/Employees/useFetchEmployees.js";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../../Context/AuthContext.jsx";
import Modal from "../../../components/Modal/Modal.jsx";
import Button from "../../../components/Button/Button.jsx";

const EmployeesInterface = () => {
  // estados
  const [modalOpen, setModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // hook custom para crud
  const {
    handleGetEmployees,
    handlePostEmployee,
    handlePutEmployee,
    handleDeleteEmployee,
  } = useFetchEmployees();

  const { user } = useAuth();

  // carga empleados
  const loadEmployees = async () => {
    setLoading(true);
    try {
      const data = await handleGetEmployees();
      setEmployees(data || []);
    } catch (error) {
      toast.error("Error al cargar los empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // abrir modal agregar
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  // abrir modal editar
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  // cerrar modal agregar/editar
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  // confirmar borrar: aquí sólo abre el modal con empleado seleccionado
  const confirmDeleteEmployee = (employee) => {
    if (!user) {
      toast.error("Usuario no autenticado");
      return;
    }

    // Ajusta la comparación según estructura real (aquí comparo email)
    if (employee.email === user.email) {
      toast.error("No puedes eliminar tu propio perfil");
      return;
    }

    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  // cerrar modal borrar
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  // guardar empleado (editar o crear)
  const handleSaveEmployee = async (employeeData) => {
    setLoading(true);
    try {
      if (editingEmployee) {
        await handlePutEmployee(editingEmployee._id, employeeData);
        //toast.success("Empleado actualizado");
      } else {
        await handlePostEmployee(employeeData);
        //toast.success("Empleado creado");
      }
      await loadEmployees();
      handleCloseModal();
    } catch (error) {
      toast.error("Error al guardar empleado");
    } finally {
      setLoading(false);
    }
  };

  // borrar empleado
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await handleDeleteEmployee(id);
      //toast.success("Empleado eliminado");
      setShowDeleteModal(false);
      setSelectedEmployee(null);
      await loadEmployees();
    } catch (error) {
      toast.error("Error al eliminar empleado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay" style={{ zIndex: 1000 }}>
          <Loading message="Cargando los Empleados..." />
        </div>
      )}

      {showDeleteModal && selectedEmployee && (
        <Modal
          title="Eliminar empleado"
          onClose={handleCloseDeleteModal}
          actions={
            <>
              <Button onClick={() => handleDelete(selectedEmployee._id)}>
                Eliminar
              </Button>
              <Button onClick={handleCloseDeleteModal}>Cancelar</Button>
            </>
          }
        >
          <p>
            ¿Estás seguro de que deseas eliminar a{" "}
            <strong>{selectedEmployee.nameEmployees}</strong>?
          </p>
        </Modal>
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="banner-private-container">
        <BannerPrivate
          title="Empleados"
          subtitle="Listado de los empleados registrados"
          mainImage={EquipoEmp}
        />
      </div>

      <LineaDivisora />

      <div className="employees-container">
        <AgregarButton onClick={handleAddEmployee} />

        <div className="employees-stats">
          <p>Total de empleados: {employees.length}</p>
          {loading && <span className="loading-text">Actualizando...</span>}
        </div>

        <ListEmployees
          employees={employees}
          onEdit={handleEditEmployee}
          onDelete={confirmDeleteEmployee}
          currentUserEmail={user?.email}
        />

        <Paginacion />
      </div>

      {modalOpen && (
        <RegisterEmployee
          onClose={handleCloseModal}
          employeeToEdit={editingEmployee}
          onSave={handleSaveEmployee}
        />
      )}
    </>
  );
};

export default EmployeesInterface;
