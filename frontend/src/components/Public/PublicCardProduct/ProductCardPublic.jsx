import React from 'react';
import './ProductCardPublic.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card-public cursor-pointer" onClick={handleClick}>
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
