import { useState } from 'react';
import './OrderManagement.css';
import useFetchOrderManagement from '../../../hooks/OrderManagement/useFetchOrderMangagemnet';

// Componente StatusTareas
const StatusTareas = ({ tareas, status, color, handleDrop, handleDragOver, handleDragStart }) => {
  const statusNames = {
    todo: 'Pendiente',
    indev: 'En Proceso',
    done: 'Completado',
  };

  const tareasFiltradas = tareas.filter((tarea) => tarea.estado === status);

  return (
    <div
      className="status-column"
      onDrop={(e) => handleDrop(e, status)}
      onDragOver={handleDragOver}
      style={{ borderColor: color }}
    >
      <h3 className="status-title" style={{ color }}>
        {statusNames[status]} ({tareasFiltradas.length})
      </h3>

      {tareasFiltradas.map((tarea) => (
        <div
          key={tarea.id}
          className="tarea-card"
          draggable
          onDragStart={(e) => handleDragStart(e, tarea.id)}
          style={{ borderLeftColor: color }}
        >
          <p className="tarea-nombre">{tarea.nombre}</p>
        </div>
      ))}
    </div>
  );
};

// Componente Principal OrderManagement
function OrderManagement() {
  const [tareas, setTareas] = useState([
    { id: 1, nombre: 'Realizar 5 bandanas de estampando navideño', estado: 'todo' },
    { id: 2, nombre: 'Realizar un collar talla S de color rosa', estado: 'todo' },
    { id: 3, nombre: 'Realizar una bandana floreada talla XL', estado: 'indev' },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState('');

  const registrarTarea = () => {
    if (nuevaTarea.trim() === '') {
      alert('Debes escribir el nombre de la tarea');
      return;
    }
    setTareas([
      ...tareas,
      { id: tareas.length + 1, nombre: nuevaTarea, estado: 'todo' },
    ]);
    setNuevaTarea('');
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    const id = e.dataTransfer.getData('id');
    setTareas(
      tareas.map((tarea) =>
        tarea.id === Number(id) ? { ...tarea, estado: newStatus } : tarea
      )
    );
  };

  return (
    <div className="order-management-container">
      <h1 className="main-title">Sistema de Gestión de Pedidos</h1>

      <div className="nueva-tarea-section">
        <h2>Nueva Pedido:</h2>
        <div className="input-group">
          <input
            type="text"
            className="tarea-input"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Escribe el nombre de la tarea"
            onKeyPress={(e) => e.key === 'Enter' && registrarTarea()}
          />
          <button onClick={registrarTarea} className="btn-registrar">
            Registrar Pedido
          </button>
        </div>
      </div>

      <div>
        <h2>Estado de Pedidos:</h2>
        <div className="status-grid">
          <StatusTareas
            tareas={tareas}
            status="todo"
            color="#b0b0b0"
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
          />
          <StatusTareas
            tareas={tareas}
            status="indev"
            color="#5653e4"
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
          />
          <StatusTareas
            tareas={tareas}
            status="done"
            color="#529e2c"
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;