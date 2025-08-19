import React from "react";
import ProductCard from "../../PublicCardProduct/ProductCardPublic.jsx"; 

const ListBirthdayProducts= ({ BirthdayProducts }) => {
  console.log("Productos que llegan al componente:", BirthdayProducts);

  return (
    <div className="product-grid">
        {Array.isArray(BirthdayProducts) && BirthdayProducts.length > 0 ? (
            BirthdayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))
        ) : (
            <p>No hay productos de navidad disponibles</p>
        )}
        </div>

  );
};

export default ListBirthdayProducts;
