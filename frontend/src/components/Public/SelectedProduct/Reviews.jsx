import React, { useState, useEffect } from "react";
import { User, Star, Plus, Minus } from "lucide-react";
import ReviewForm from "../../../components/Public/SelectedProduct/ReviewsForm/ReviewForm.jsx";
import { useAuth } from "../../../Context/AuthContext.jsx";
import useFetchReviews from "../../../hooks/ReviewUser/useFetchReviews.js";
import "./Reviews.css";

const Reviews = ({ productId }) => {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loginMessage, setLoginMessage] = useState(""); 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { handleGetVerifyReviews } = useFetchReviews();

  // Cargar reviews verificadas al montar el componente
  useEffect(() => {
    loadVerifiedReviews();
  }, []);

  const loadVerifiedReviews = async () => {
    try {
      setLoading(true);
      const data = await handleGetVerifyReviews();
      // Filtrar solo las reviews del producto actual
      const productReviews = data.filter(review => 
        review.idProduct?._id === productId || review.idProduct === productId
      );
      setReviews(productReviews);
    } catch (error) {
      console.error("Error al cargar reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  /* control del rating de estrellas */
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "star-filled" : "star-empty"}
      />
    ));

  const handleAddReviewClick = () => {
    if (!user || !user.email) {
      setLoginMessage("¡Debes iniciar sesión para dejar una reseña!");
      return;
    }
    setLoginMessage("");
    setShowForm((prev) => !prev);
  };

  const handleReviewSubmitted = () => {
    setShowForm(false);
    // Recargar reviews después de un tiempo
    setTimeout(() => {
      loadVerifiedReviews();
    }, 2000);
  };

  return (
    <div className="reviews">
      <div className="review-header">
        <button
          type="button"
          className="toggle-reviews-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <Minus size={19} /> : <Plus size={19} />}
        </button>
        <p className="review-title">Comentarios y reseñas</p>
      </div>

      {expanded && (
        <div className="review-body">
          {/* Mostrar estado de carga */}
          {loading ? (
            <p>Cargando reseñas...</p>
          ) : (
            <>
              {/* Mostrar reseñas */}
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review._id} className="review">
                    <div className="review-user">
                      <User size={20} />
                      <h4>{review.email || "Usuario"}</h4>
                      <span>
                        {new Date(review.publicationDate).toLocaleDateString(
                          "es-ES"
                        )}
                      </span>
                    </div>

                    <div className="review-stars">
                      {renderStars(review.qualification)}
                    </div>

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
            </>
          )}

          {/* Botón Agregar reseña */}
          <div className="add-review-wrapper">
            <button
              type="button"
              className="btn-add-review"
              onClick={handleAddReviewClick}
            >
              {showForm ? "Cancelar" : "Agregar reseña"}
            </button>

            {/* Mensaje si no hay sesión */}
            {loginMessage && <p className="login-warning">{loginMessage}</p>}

            {/* Formulario solo si hay sesión y user.email existe */}
            {showForm && user && user.email && (
              <ReviewForm 
                productId={productId} 
                user={user}
                onReviewSubmitted={handleReviewSubmitted}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;