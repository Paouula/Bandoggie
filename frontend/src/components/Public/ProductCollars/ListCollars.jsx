import React from "react";
import ProductCard from "../PublicCardProduct/ProductCardPublic.jsx"; 

const ListCollars = ({ Collars }) => {
  console.log("Collars que llegan al componente:", Collars);

  return (
    <div className="product-grid">
        {Array.isArray(Collars) && Collars.length > 0 ? (
            Collars.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay collars disponibles</p>
        )}
        </div>

  );
};

export default ListCollars;
