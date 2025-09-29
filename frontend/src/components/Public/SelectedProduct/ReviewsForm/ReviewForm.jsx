import React, { useState } from "react"; 
import useFetchReviews from "../../../../hooks/ReviewUser/useFetchReviews.js";
import "./ReviewForm.css";

const ReviewForm = ({ productId, user, onReviewSubmitted }) => {
  const [qualification, setQualification] = useState(5);
  const [comment, setComment] = useState("");
  const [designImages, setDesignImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { handlePostReviews } = useFetchReviews();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validar cantidad de imágenes (3 a 5)
    if (files.length > 5) {
      setMessage("⚠️ Máximo 5 imágenes permitidas");
      return;
    }
    
    setDesignImages(files);
    setMessage(""); // Limpiar mensaje
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar usuario
    if (!user || !user.email) {
      setMessage("❌ Usuario no identificado");
      return;
    }

    // Validar comentario
    if (!comment.trim()) {
      setMessage("❌ El comentario es obligatorio");
      return;
    }

    // Validar longitud mínima del comentario
    if (comment.trim().length < 10) {
      setMessage("❌ El comentario debe tener al menos 10 caracteres");
      return;
    }

    // Validar cantidad de imágenes si hay
    if (designImages.length > 0 && designImages.length < 3) {
      setMessage("⚠️ Debes subir entre 3 y 5 imágenes, o ninguna");
      return;
    }

    setIsSubmitting(true);
    setMessage("Enviando reseña...");
    
    try {
      // Preparar datos de la review - usar email
      const reviewData = {
        qualification,
        comment: comment.trim(),
        designImages: designImages, // Array de File objects o array vacío
        email: user.email, // USAR email
        idProduct: productId
      };

      console.log("Enviando review con datos:", {
        qualification,
        comment: comment.trim(),
        imageCount: designImages.length,
        imageFiles: designImages.map(f => f?.name),
        email: user.email,
        idProduct: productId
      });

      // Enviar usando el hook
      const result = await handlePostReviews(reviewData);
      
      console.log("Respuesta del servidor:", result);

      setMessage("✅ Tu reseña ha sido enviada y está pendiente de aprobación.");
      
      // Limpiar formulario
      setQualification(5);
      setComment("");
      setDesignImages([]);

      // Resetear el input de archivos
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Notificar al componente padre
      if (onReviewSubmitted) {
        setTimeout(() => {
          onReviewSubmitted();
        }, 2000);
      }

    } catch (err) {
      console.error("Error al enviar review:", err);
      setMessage("❌ Error al enviar la reseña. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Deja tu reseña</h3>

      <label>
        Calificación:
        <select
          value={qualification}
          onChange={(e) => setQualification(Number(e.target.value))}
          disabled={isSubmitting}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} estrella{num !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </label>

      <label>
        Comentario (mínimo 10 caracteres):
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          disabled={isSubmitting}
          placeholder="Escribe tu experiencia con el producto..."
          minLength={10}
          rows={4}
        />
        <small>{comment.length} caracteres</small>
      </label>

      <label>
        Imágenes del diseño (3 a 5 opcionales):
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={isSubmitting}
        />
        <small>Puedes subir entre 3 y 5 imágenes, o ninguna</small>
      </label>

      {designImages.length > 0 && (
        <div className="preview-images">
          {designImages.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
            />
          ))}
          <small>{designImages.length} imagen(es) seleccionada(s)</small>
        </div>
      )}

      <button 
        type="submit" 
        className="btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar reseña"}
      </button>

      {message && (
        <p className={`review-message ${
          message.includes('✅') ? 'success' : 
          message.includes('❌') ? 'error' : 
          'info'
        }`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default ReviewForm;