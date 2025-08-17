import React from 'react';
import './ProductCardPublic.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.nameProduct} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.nameProduct}</h3>
        <p className="product-price">Desde ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
