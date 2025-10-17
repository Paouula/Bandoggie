import React, { useEffect, useState } from "react";
import useFetchProducts from "../../../hooks/Products/useFetchProducts";
import useFetchUsers from "../../../hooks/Clients/useFetchUsers";
import useFetchEmployees from "../../../hooks/Employees/useFetchEmployees";
import "./Graphics.css";
import { Toaster } from "react-hot-toast";

const Graphics = () => {
  const { products, loading: loadingProducts } = useFetchProducts();
  const { handleGetClientes, handleGetVets } = useFetchUsers();
  const { handleGetEmployees } = useFetchEmployees();

  const [clients, setClients] = useState([]);
  const [vets, setVets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Obtener todos los datos en paralelo
      const [clientsData, vetsData, employeesData] = await Promise.all([
        handleGetClientes(),
        handleGetVets(),
        handleGetEmployees()
      ]);

      setClients(clientsData || []);
      setVets(vetsData || []);
      setEmployees(employeesData || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estadísticas
  const stats = {
    totalProducts: products.length,
    wholesaleClients: clients.filter(c => c.client_type === 'wholesale' || c.client_type === 'mayorista').length,
    retailClients: clients.filter(c => c.client_type === 'retail' || c.client_type === 'minorista').length,
    employees: employees.length
  };

  const totalClients = stats.wholesaleClients + stats.retailClients;
  const wholesalePercentage = totalClients > 0 
    ? Math.round((stats.wholesaleClients / totalClients) * 100) 
    : 0;
  const retailPercentage = totalClients > 0 
    ? Math.round((stats.retailClients / totalClients) * 100) 
    : 0;

  // Estado de carga
  if (loading || loadingProducts) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando estadísticas...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
            <Toaster position="top-right" />
      <div className="dashboard-wrapper">
        
        {/* Header */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">Estadísticas generales</h2>
          <button className="refresh-button" onClick={loadData}>
             Actualizar
          </button>
        </div>

        {/* Grid de cards - Primera fila */}
        <div className="cards-row">
          
          {/* Card 1 - Total Productos */}
          <div className="card card-orange">
            <h2 className="card-title">Total Productos</h2>
            <p className="card-subtitle">Inventario actual</p>
            <h3 className="card-number">{stats.totalProducts}</h3>
          </div>

          
          {/* Card 4 - Empleados */}
          <div className="card card-blue">
            <h2 className="card-title">Empleados</h2>
            <p className="card-subtitle">empleados activos</p>
            <h3 className="card-number">{stats.employees}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphics;