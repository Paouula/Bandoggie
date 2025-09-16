import React from "react";
import ProductCard from "../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListHalloweenProducts = ({ HalloweenProducts }) => {
  console.log("Bandanas que llegan al componente:", HalloweenProducts);

  return (
    <div className="product-grid">
        {Array.isArray(HalloweenProducts) && HalloweenProducts.length > 0 ? (
            HalloweenProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de halloween disponibles</p>
        )}
        </div>

  );
};

export default ListHalloweenProducts;
