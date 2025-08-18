import React, { useState } from "react";
import { User, Star, Plus, Minus } from "lucide-react";
import ReviewForm from "../../../components/Public/SelectedProduct/ReviewsForm/ReviewForm.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";
import { toast } from "react-hot-toast";
import "./Reviews.css";

const Reviews = ({ reviews, productId }) => {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));

  const handleAddReviewClick = () => {
    if (!user) {
      toast.error("¡Debes iniciar sesión para dejar una reseña!", {
        id: "login-required",
      });
      return;
    }
    setShowForm((prev) => !prev); // Alternar mostrar/ocultar formulario
  };

  return (
    <div className="reviews">
      <div className="review-header">
        <button
          className="toggle-reviews-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minus size={19} /> : <Plus size={19} />}
        </button>
        <p className="review-title">Comentarios y reseñas</p>
      </div>

      {expanded && (
        <div className="review-body">
          {/* Mostrar reseñas */}
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="review">
                <div className="review-user">
                  <User size={20} />
                  <h4>{review.idClient?.name || "Usuario"}</h4>
                  <span>
                    {new Date(review.publicationDate).toLocaleDateString(
                      "es-ES"
                    )}
                  </span>
                </div>

                <div className="review-stars">{renderStars(review.qualification)}</div>

                <p>{review.comment}</p>

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
              </div>
            ))
          ) : (
            <p>¡Aún no hay reseñas para este producto!</p>
          )}

          {/* Botón Agregar reseña */}
          <div className="add-review-wrapper">
            <button className="btn-add-review" onClick={handleAddReviewClick}>
              {showForm ? "Cancelar" : "Agregar reseña"}
            </button>

            {showForm && <ReviewForm productId={productId} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
