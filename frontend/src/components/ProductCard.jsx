import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <>
      <style>{`
        /* Grid contenedor */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 8px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        /* Mobile First - Muy pequeño */
        @media (max-width: 320px) {
          .product-grid {
            padding: 4px;
            gap: 4px;
          }
        }

        /* Mobile - Pequeño */
        @media (min-width: 321px) and (max-width: 480px) {
          .product-grid {
            padding: 6px;
            gap: 6px;
          }
        }

        /* Mobile - Mediano */
        @media (min-width: 481px) and (max-width: 640px) {
          .product-grid {
            padding: 8px;
            gap: 8px;
          }
        }

        /* Tablet - Pequeño */
        @media (min-width: 641px) and (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 12px;
            gap: 10px;
          }
        }

        /* Tablet - Mediano */
        @media (min-width: 769px) and (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 16px;
            gap: 12px;
          }
        }

        /* Desktop - Pequeño */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .product-grid {
            grid-template-columns: repeat(4, 1fr);
            padding: 20px;
            gap: 16px;
          }
        }

        /* Desktop - Grande */
        @media (min-width: 1281px) {
          .product-grid {
            grid-template-columns: repeat(5, 1fr);
            padding: 24px;
            gap: 20px;
          }
        }

        /* Tarjeta de producto */
        .product-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: white;
          overflow: hidden;
          transition: transform 0.2s ease;
          padding: 8px;
          width: 100%;
          min-width: 0;
        }

        .product-card:hover {
          transform: scale(1.01);
        }

        /* Responsive para padding de las tarjetas */
        @media (min-width: 481px) {
          .product-card {
            padding: 12px;
            border-radius: 10px;
          }
        }

        @media (min-width: 769px) {
          .product-card {
            padding: 16px;
            border-radius: 12px;
          }
        }

        .product-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        /* Responsive para las imágenes */
        @media (max-width: 480px) {
          .product-image img {
            height: 120px;
          }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          .product-image img {
            height: 150px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .product-image img {
            height: 180px;
          }
        }

        .product-info {
          padding: 4px 0;
          text-align: left;
        }

        @media (min-width: 481px) {
          .product-info {
            padding: 8px 0;
          }
        }

        @media (min-width: 769px) {
          .product-info {
            padding: 12px 0;
          }
        }

        .product-name {
          font-size: 0.75rem;
          font-weight: 500;
          color: #111827;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        @media (min-width: 481px) {
          .product-name {
            font-size: 0.875rem;
            margin-bottom: 6px;
          }
        }

        @media (min-width: 769px) {
          .product-name {
            font-size: 1rem;
            line-height: 1.4;
          }
        }

        .product-price {
          font-size: 0.875rem;
          font-weight: 700;
          color: #111827;
        }

        @media (min-width: 481px) {
          .product-price {
            font-size: 1rem;
          }
        }

        @media (min-width: 769px) {
          .product-price {
            font-size: 1.125rem;
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

// Componente de ejemplo para mostrar el grid completo
const ProductGrid = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "Blusa Y2K de Manga Campanada",
      price: "$8.59",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "Camiseta casual de cuadros Y2K",
      price: "$7.52",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "Bandolera de Mujer en Marrón",
      price: "$14.39",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      name: "Top de protección solar casual",
      price: "$10.42",
      image: "/api/placeholder/200/200"
    },
    {
      id: 5,
      name: "Pantalones amplios casuales",
      price: "$15.99",
      image: "/api/placeholder/200/200"
    },
    {
      id: 6,
      name: "Zapatillas deportivas verdes",
      price: "$24.99",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <div className="product-grid">
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;