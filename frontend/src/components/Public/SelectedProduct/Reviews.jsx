import React, { useState } from "react";
import { User, Star, Plus, Minus, Image as ImageIcon } from "lucide-react";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
  const [expandedReview, setExpandedReview] = useState(null);

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));

  if (!reviews || reviews.length === 0) {
    return <p>¡Aún no hay reseñas para este producto!</p>;
  }

  return (
    <div className="reviews">
      <div className="review-header">
      <p className="review-tittle">Comentarios y reseñas</p>
      </div>
      {reviews.map((review) => (
        <div key={review._id} className="review">
          {/* Cabecera */}
          <div className="review-user">
            <User size={20} />
            <h4>
              {review.idClient?.name || "Usuario"} {/* si backend popula */}
            </h4>
            <span>
              {new Date(review.publicationDate).toLocaleDateString("es-ES")}
            </span>
          </div>

          {/* Estrellas */}
          <div className="review-stars">
            {renderStars(review.qualification)}
          </div>

          {/* Comentario */}
          <p>{review.comment}</p>

          {/* Galería de imágenes opcional */}
          {review.designImages && review.designImages.length > 0 && (
            <div className="review-images">
              {review.designImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Imagen reseña ${idx + 1}`}
                  className="review-image"
                />
              ))}
            </div>
          )}

          {/* Botón expandir/ocultar */}
          {expandedReview === review._id ? (
            <button onClick={() => setExpandedReview(null)}>
              <Minus size={14} /> Ocultar
            </button>
          ) : (
            <button onClick={() => setExpandedReview(review._id)}>
              <Plus size={14} /> Leer más
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
