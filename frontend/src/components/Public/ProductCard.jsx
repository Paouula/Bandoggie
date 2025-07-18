import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <>
      <style>{`
       /* Grid contenedor */
       .product-grid {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         gap: 16px;
         padding: 16px;
         max-width: 1280px;
         margin: 0 auto;
       }

       @media (max-width: 480px) {
         .product-grid {
           padding: 8px 12px;
           gap: 12px;
         }
       }

       @media (min-width: 1024px) {
         .product-grid {
           grid-template-columns: repeat(4, 1fr);
         }
       }

       /* Tarjeta de producto */
       .product-card {
         border: 1px solid #e5e7eb;
         border-radius: 12px;
         background-color: white;
         overflow: hidden;
         transition: transform 0.2s ease;
         padding: 16px;
         width: 100%;
         box-sizing: border-box;
       }

       .product-card:hover {
         transform: scale(1.01);
       }

       .product-image {
         width: 100%;
         display: flex;
         justify-content: center;
         align-items: center;
         margin-bottom: 16px;
       }

       .product-image img {
         width: 100%;
         max-width: 200px;
         height: 200px;
         object-fit: cover;
         border-radius: 8px;
         display: block;
       }

       /* Responsive para móviles */
       @media (max-width: 480px) {
         .product-card {
           padding: 12px;
         }
         
         .product-image img {
           max-width: 140px;
           height: 140px;
         }
         
         .product-image {
           margin-bottom: 12px;
         }
       }

       /* Responsive para tablets */
       @media (max-width: 768px) and (min-width: 481px) {
         .product-image img {
           max-width: 180px;
           height: 180px;
         }
       }

       .product-info {
         padding: 0;
         text-align: left;
       }

       .product-name {
         font-size: 1rem;
         font-weight: 500;
         color: #111827;
         margin-bottom: 6px;
         line-height: 1.4;
       }

       .product-price {
         font-size: 1.125rem;
         font-weight: 700;
         color: #111827;
       }

       /* Responsive para textos en móviles */
       @media (max-width: 480px) {
         .product-name {
           font-size: 0.875rem;
         }
         
         .product-price {
           font-size: 1rem;
         }
       }
      `}</style>

      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{product.price}</p>
        </div>
      </div>
    </>

    
  );
};

export default ProductCard;
