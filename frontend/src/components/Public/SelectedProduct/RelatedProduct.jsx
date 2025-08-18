import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) return null;

  return (
    <>
    <div className="related-products">
      <h2 className="title">Productos relacionados 🐾</h2>
      <div className="related-grid">
        {products.map((p) => (
          <div
            key={p._id}
            className="related-card"
            onClick={() => navigate(`/products/${p._id}`)}
          >
            <img src={p.image} alt={p.nameProduct} />
            <div className="info">
              <h3>{p.nameProduct}</h3>
              <p>${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style jsx>{`
        .related-products {
        margin-top: 50px;
        font-family: 'Inter';
      }

      .related-products .title {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #CB8E45 !important;
      }

      .related-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 20px;
      }

      .related-card {
        cursor: pointer;
        border: 1px solid #ddd;
        border-radius: 10px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .related-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .related-card img {
        width: 100%;
        height: 160px;
        object-fit: cover;
      }

      .related-card .info {
        padding: 10px;
      }

      .related-card .info h3 {
        font-size: 16px;
        margin: 0 0 6px 0;
        font-weight: 500;
      }

      .related-card .info p {
        font-size: 14px;
        color: #1B1B1B;
        margin: 0;
        font-weight: bold;
        font-family: 'Inter'
      }

      `}</style>

    </>
  );
};

export default RelatedProducts;
