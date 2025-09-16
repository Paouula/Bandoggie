import React from "react";
import OrderCard from "./MainOrdersCards/OrderCardMainPage.jsx";

const ListOrders = ({ carts, onView }) => {
  return (
    <div className="orders-grid">
     {Array.isArray(carts) && carts.length > 0 ? (
  carts.map((cart) => (
    <OrderCard
      key={cart._id}
      order={cart}
      onView={onView}
    />
  ))
) : (
  <p>No hay pedidos disponibles</p>
)}


    </div>
  );
};

export default ListOrders;
