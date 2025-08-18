import React from "react";
import { Package, Eye } from "lucide-react";
import "./OrderCardMainPage.css";

const OrderCard = ({ order, onView }) => {
  return (
    <div className="order-card">
      <div className="order-card-header">
        <span className="order-status">{order.status}</span>
        <span className="order-date">
          Pedido n° {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="order-card-products">
        {order.products.slice(0, 2).map((p) => (
          <div key={p._id} className="product-placeholder">
            <Package />
          </div>
        ))}
      </div>

      <div className="order-card-info">
        <p className="product-name">
          Cliente: {order.idClient?.name || "Desconocido"}
        </p>
        <p className="product-units">
          Total productos: {order.products.length}
        </p>
        <p className="product-units">Total: ${order.total}</p>
      </div>

      <button onClick={() => onView(order._id)} className="btn-view">
        <Eye /> Ver más
      </button>
    </div>
  );
};


export default OrderCard;
