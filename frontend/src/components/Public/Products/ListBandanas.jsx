// components/Public/Products/ListBandanas.jsx
import React from "react";
import ProductCard from "./PublicCardProduct/ProductCardPublic.jsx"; 

const ListBandanas = ({ Bandanas }) => {
  console.log("Bandanas que llegan al componente:", Bandanas);

  return (
    <div className="product-grid">
        {Array.isArray(Bandanas) && Bandanas.length > 0 ? (
            Bandanas.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay bandanas disponibles</p>
        )}
        </div>

  );
};

export default ListBandanas;
