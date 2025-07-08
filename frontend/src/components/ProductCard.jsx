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
            padding: 8px 12px; /* Menor padding lateral */
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
        }

        .product-card:hover {
          transform: scale(1.01);
        }

        .product-image img {
          width: 200px;
          height: 200px;
           
          margin-left: 20px;
          display: block;
          object-fit: cover;
        }

        .product-info {
          padding: 16px;
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