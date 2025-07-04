// ListProducts.jsx
import React from 'react';
import CardProduct from '../Products/CardProduct.jsx';

const ListProducts = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ListProducts;
