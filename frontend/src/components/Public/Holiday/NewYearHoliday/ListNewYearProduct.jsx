import React from "react";
import ProductCard from "../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListNewYearProducts = ({ NewYearProducts }) => {
  console.log("Productos que llegan al componente:", NewYearProducts);

  return (
    <div className="product-grid">
        {Array.isArray(NewYearProducts) && NewYearProducts.length > 0 ? (
            NewYearProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de navidad disponibles</p>
        )}
        </div>

  );
};

export default ListNewYearProducts;
