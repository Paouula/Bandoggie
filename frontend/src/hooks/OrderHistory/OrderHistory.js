import React, { useState, useEffect } from "react";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // Estado para guardar pedidos
  const [loading, setLoading] = useState(true); // Estado para mostrar "Cargando..."

  useEffect(() => {
    // Simulación de llamada a una API o backend
    setTimeout(() => {
      const fakeOrders = [
        {
          id: "ORD-001",
          date: "2025-08-05",
          status: "Entregado",
          total: 59.99,
          items: [
            { name: "Bandana Roja", qty: 1, price: 19.99 },
            { name: "Bandana Azul", qty: 2, price: 20.00 },
          ],
        },
        {
          id: "ORD-002",
          date: "2025-07-22",
          status: "En camino",
          total: 39.99,
          items: [
            { name: "Bandana Verde", qty: 1, price: 19.99 },
            { name: "Bandana Negra", qty: 1, price: 20.00 },
          ],
        },
      ];

      setOrders(fakeOrders);
      setLoading(false);
    }, 1500); // Simula tiempo de respuesta
  }, []);

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  return (
    <div className="order-history">
      <h1>Historial de Pedidos</h1>
      {orders.length === 0 ? (
        <p>No tienes pedidos aún.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h2>Pedido #{order.id}</h2>
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Estado:</strong> {order.status}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <h3>Productos:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.qty} x {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
