import React from 'react';
import './ProductCardPublic.css';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/products/${product._id}`);
  };
  
  return (
    <div className="public-product-card-wrapper cursor-pointer" onClick={handleClick}>
      <div className="public-product-image-container">
        <img src={product.image} alt={product.nameProduct} />
      </div>
      <div className="public-product-info-wrapper">
        <h3 className="public-product-name-text">{product.nameProduct}</h3>
        <p className="public-product-price-text">Desde ${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;