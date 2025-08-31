import React from "react";
import ProductCard from "../../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListValentinesProducts = ({ ValentinesProducts }) => {
  console.log("Productos que llegan al componente:", ValentinesProducts);

  return (
    <div className="product-grid">
        {Array.isArray(ValentinesProducts) && ValentinesProducts.length > 0 ? (
            ValentinesProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de san valentín disponibles</p>
        )}
        </div>

  );
};

export default ListValentinesProducts;
