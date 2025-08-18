import React, { useState } from "react";
import useDataReviews from "../hooks/useProductData.jsx";

const ReviewForm = ({ productId }) => {
  const [qualification, setQualification] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const { submitReview } = useDataReviews();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitReview({
        qualification,
        comment,
        idProduct: productId,
      });

      setMessage("Tu reseña ha sido enviada y está pendiente de aprobación.");
      setQualification(5);
      setComment("");
    } catch (err) {
      console.error(err);
      setMessage("Error al enviar la reseña. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <label>
        Calificación:
        <select value={qualification} onChange={(e) => setQualification(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>{num} estrellas</option>
          ))}
        </select>
      </label>

      <label>
        Comentario:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="btn">Enviar reseña</button>
      {message && <p className="review-message">{message}</p>}
    </form>
  );
};

export default ReviewForm;
