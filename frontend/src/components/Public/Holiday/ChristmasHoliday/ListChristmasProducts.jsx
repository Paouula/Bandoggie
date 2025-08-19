import React from "react";
import ProductCard from "../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListChristmasProducts = ({ ChristmasProducts }) => {
  console.log("Bandanas que llegan al componente:", ChristmasProducts);

  return (
    <div className="product-grid">
        {Array.isArray(ChristmasProducts) && ChristmasProducts.length > 0 ? (
            ChristmasProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de navidad disponibles</p>
        )}
        </div>

  );
};

export default ListChristmasProducts;
