import React, { useState } from "react"; 
import useDataReviews from "./hook/useDataReviews.jsx";
import "./ReviewForm.css";

const ReviewForm = ({ productId, user }) => {
  const [qualification, setQualification] = useState(5);
  const [comment, setComment] = useState("");
  const [designImages, setDesignImages] = useState([]);
  const [message, setMessage] = useState("");
  const { submitReview } = useDataReviews();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setDesignImages(files);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user || !user._id) return setMessage("Usuario no identificado");
  
  try {
    // 1. Subir imágenes y obtener URLs (puedes usar Cloudinary o tu endpoint de uploads)
    const uploadedImages = await Promise.all(
      designImages.map(async (file) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "tu_preset");
        const res = await fetch("https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        return data.secure_url; // la URL de la imagen
      })
    );

    // 2. Armar objeto que el backend espera
    const reviewData = {
      qualification,
      comment,
      designImages: uploadedImages, // URLs
      idClient: user._id,
      idProduct: {
        _id: productId,
      },
    };

    console.log("Enviando review:", reviewData);

    await submitReview(reviewData); // enviar JSON directamente

    setMessage("✅ Tu reseña ha sido enviada y está pendiente de aprobación.");
    setQualification(5);
    setComment("");
    setDesignImages([]);
  } catch (err) {
    console.error(err);
    setMessage("❌ Error al enviar la reseña. Intenta de nuevo.");
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
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} estrellas
            </option>
          ))}
        </select>
      </label>

      <label>
        Comentario:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Escribe tu experiencia con el producto..."
        />
      </label>

      <label>
        Imágenes del diseño (3 a 5 opcionales):
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
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
        </div>
      )}

      <button type="submit" className="btn-submit">
        Enviar reseña
      </button>

      {message && <p className="review-message">{message}</p>}
    </form>
  );
};

export default ReviewForm;
