import React from "react";
import ProductCard from "../../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListPatrioticProducts = ({ PatrioticProducts }) => {
  console.log("Productos que llegan al componente:", PatrioticProducts);

  return (
    <div className="product-grid">
        {Array.isArray(PatrioticProducts) && PatrioticProducts.length > 0 ? (
            PatrioticProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de navidad disponibles</p>
        )}
        </div>

  );
};

export default ListPatrioticProducts;
