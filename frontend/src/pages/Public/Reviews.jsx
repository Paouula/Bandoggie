import React, { useState } from 'react';
import { Trash2, Calendar, Plus } from 'lucide-react';

// ========== ESTILOS ==========
const styles = {
  reviewPage: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3f4f6 0%, #dbeafe 50%, #faf5ff 100%)',
    padding: '1.5rem'
  },
  reviewContainer: {
    maxWidth: '64rem',
    margin: '0 auto'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#fb923c',
    marginBottom: '0.5rem'
  },
  reviewCard: {
    background: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '2rem',
    marginBottom: '2rem',
    position: 'relative',
    overflow: 'hidden'
  },
  cardBackground: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 100%)',
    opacity: 0.3
  },
  cardContent: {
    position: 'relative'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  userAvatar: {
    width: '5rem',
    height: '5rem',
    backgroundColor: '#9ca3af',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  avatarInner: {
    width: '3rem',
    height: '3rem',
    backgroundColor: 'white',
    borderRadius: '50%'
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0
  },
  deleteButton: {
    width: '3rem',
    height: '3rem',
    backgroundColor: '#fb923c',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  imageUploader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  imageUploaderTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  imageUploadArea: {
    position: 'relative'
  },
  imageInput: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer'
  },
  imageUploadBox: {
    width: '100%',
    height: '8rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #d1d5db',
    transition: 'border-color 0.2s ease'
  },
  uploadIcon: {
    width: '2rem',
    height: '2rem',
    backgroundColor: 'black',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageInfo: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  imageInfoTitle: {
    fontWeight: '600',
    marginBottom: '0.25rem',
    margin: '0 0 0.25rem 0'
  },
  imageInfoFormats: {
    margin: 0
  },
  imagePreviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem'
  },
  imagePreviewItem: {
    position: 'relative'
  },
  previewImage: {
    width: '100%',
    height: '5rem',
    objectFit: 'cover',
    borderRadius: '0.5rem'
  },
  removeImageBtn: {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    width: '1.5rem',
    height: '1.5rem',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: 1
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  formLabel: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151'
  },
  commentLabel: {
    marginBottom: '0.75rem',
    display: 'block'
  },
  ratingSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.5rem'
  },
  starRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  starButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.75rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none'
  },
  starFilled: {
    color: '#4b5563'
  },
  starEmpty: {
    color: '#d1d5db'
  },
  productSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  productInput: {
    backgroundColor: '#e5e7eb',
    borderRadius: '9999px',
    padding: '0.5rem 1.5rem',
    color: '#374151',
    fontWeight: '500',
    border: 'none',
    outline: 'none',
    transition: 'all 0.2s ease',
    flex: 1,
    maxWidth: '20rem'
  },
  commentTextarea: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: '1rem',
    padding: '1.5rem',
    color: '#374151',
    minHeight: '11.25rem',
    resize: 'none',
    border: 'none',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit'
  },
  dateSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  dateInputContainer: {
    backgroundColor: '#e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  dateInput: {
    background: 'transparent',
    color: '#374151',
    fontWeight: '500',
    border: 'none',
    outline: 'none'
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButton: {
    padding: '0.75rem 2rem',
    border: '2px solid #2563eb',
    color: '#2563eb',
    background: 'transparent',
    borderRadius: '0.5rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  publishButton: {
    padding: '0.75rem 3rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontWeight: '500',
    fontSize: '1.125rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  publishButtonDisabled: {
    backgroundColor: '#93c5fd',
    cursor: 'not-allowed'
  },
  errorMessage: {
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    color: '#dc2626',
    borderRadius: '0.5rem'
  },
  loadingOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  loadingModal: {
    background: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  loadingSpinner: {
    width: '1.5rem',
    height: '1.5rem',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Agregar la animación de spinner
const spinKeyframes = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Insertar la animación en el head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

// ========== HOOKS PERSONALIZADOS ==========

// Hook para manejo de formulario de reseñas
const useReviewForm = () => {
  const [formData, setFormData] = useState({
    qualification: 0,
    nameProduct: '',
    comment: '',
    images: [],
    publicationDate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addImage = (imageFile) => {
    if (formData.images.length < 3) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageFile]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const submitReview = async () => {
    setLoading(true);
    try {
      // Aquí iría la lógica para enviar al backend
      console.log('Enviando reseña:', formData);
      // Simular envío
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      qualification: 0,
      nameProduct: '',
      comment: '',
      images: [],
      publicationDate: new Date().toISOString().split('T')[0]
    });
    setError(null);
  };

  return {
    formData,
    loading,
    error,
    updateField,
    addImage,
    removeImage,
    submitReview,
    resetForm
  };
};

// ========== COMPONENTES ==========

// Componente de estrellas interactivas
const InteractiveStarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starRating) => {
    onRatingChange(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div style={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          style={{
            ...styles.starButton,
            ...(star <= (hoverRating || rating) ? styles.starFilled : styles.starEmpty)
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// Componente para subir imágenes
const ImageUploader = ({ images, onAddImage, onRemoveImage, maxImages = 3 }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && images.length < maxImages) {
      onAddImage(file);
    }
  };

  return (
    <div style={styles.imageUploader}>
      <h3 style={styles.imageUploaderTitle}>
        imagenes del producto
      </h3>
      
      {/* Área de subida */}
      <div style={styles.imageUploadArea}>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          style={styles.imageInput}
          disabled={images.length >= maxImages}
        />
        <div style={styles.imageUploadBox}>
          <div style={styles.uploadIcon}>
            <Plus size={20} style={{ color: 'white' }} />
          </div>
        </div>
      </div>

      {/* Información de formatos */}
      <div style={styles.imageInfo}>
        <p style={styles.imageInfoTitle}>Máximo 3 imágenes. Formatos:</p>
        <p style={styles.imageInfoFormats}>JPG, PNG</p>
      </div>

      {/* Vista previa de imágenes */}
      {images.length > 0 && (
        <div style={styles.imagePreviewGrid}>
          {images.map((image, index) => (
            <div key={index} style={styles.imagePreviewItem}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                style={styles.previewImage}
              />
              <button
                onClick={() => onRemoveImage(index)}
                style={styles.removeImageBtn}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente botón eliminar
const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={styles.deleteButton}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#f97316';
        e.target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = '#fb923c';
        e.target.style.transform = 'scale(1)';
      }}
    >
      <Trash2 size={20} />
    </button>
  );
};

// Componente botón regresar
const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={styles.backButton}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#dbeafe';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
      }}
    >
      Regresar al catálogo
    </button>
  );
};

// Componente botón publicar
const PublishButton = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.publishButton,
        ...(disabled ? styles.publishButtonDisabled : {})
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#1d4ed8';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = '#2563eb';
        }
      }}
    >
      Publicar
    </button>
  );
};

// ========== COMPONENTE PRINCIPAL ==========

const Reviews = () => {
  const {
    formData,
    loading,
    error,
    updateField,
    addImage,
    removeImage,
    submitReview,
    resetForm
  } = useReviewForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.qualification === 0) {
      alert('Por favor selecciona una puntuación');
      return;
    }
    if (!formData.nameProduct.trim()) {
      alert('Por favor ingresa el nombre del producto');
      return;
    }
    if (!formData.comment.trim()) {
      alert('Por favor escribe un comentario');
      return;
    }

    const success = await submitReview();
    if (success) {
      alert('Reseña publicada exitosamente');
      resetForm();
    }
  };

  const handleBackToCatalog = () => {
    console.log('Navegando al catálogo...');
  };

  const handleDeleteForm = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
      resetForm();
    }
  };

  return (
    <div style={styles.reviewPage}>
      <div style={styles.reviewContainer}>
        
        {/* Título */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>
            Reseñas
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div style={styles.reviewCard}>
            
            {/* Fondo decorativo */}
            <div style={styles.cardBackground}></div>
            
            {/* Contenido */}
            <div style={styles.cardContent}>
              
              {/* Header con usuario y botón eliminar */}
              <div style={styles.cardHeader}>
                <div style={styles.userSection}>
                  {/* Avatar */}
                  <div style={styles.userAvatar}>
                    <div style={styles.avatarInner}></div>
                  </div>
                  {/* Nombre */}
                  <div>
                    <h2 style={styles.userName}>
                      nombre de usuario
                    </h2>
                  </div>
                </div>
                {/* Botón eliminar */}
                <DeleteButton onClick={handleDeleteForm} />
              </div>

              {/* Layout principal */}
              <div style={{
                ...styles.mainLayout,
                gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '1fr 2fr'
              }}>
                
                {/* Columna izquierda: Imágenes */}
                <div style={styles.leftColumn}>
                  <ImageUploader
                    images={formData.images}
                    onAddImage={addImage}
                    onRemoveImage={removeImage}
                  />
                </div>

                {/* Columna derecha: Formulario */}
                <div style={styles.rightColumn}>
                  
                  {/* Puntuación */}
                  <div style={styles.formGroup}>
                    <div style={styles.ratingSection}>
                      <span style={styles.formLabel}>Puntuación:</span>
                      <InteractiveStarRating
                        rating={formData.qualification}
                        onRatingChange={(rating) => updateField('qualification', rating)}
                      />
                    </div>
                  </div>

                  {/* Producto */}
                  <div style={styles.formGroup}>
                    <div style={styles.productSection}>
                      <span style={styles.formLabel}>Producto:</span>
                      <input
                        type="text"
                        value={formData.nameProduct}
                        onChange={(e) => updateField('nameProduct', e.target.value)}
                        placeholder="escribe el producto"
                        style={styles.productInput}
                        onFocus={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.boxShadow = '0 0 0 2px #3b82f6';
                        }}
                        onBlur={(e) => {
                          e.target.style.backgroundColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Comentario */}
                  <div style={styles.formGroup}>
                    <label style={{...styles.formLabel, ...styles.commentLabel}}>
                      Comentario:
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => updateField('comment', e.target.value)}
                      placeholder="escribe tu reseña"
                      style={styles.commentTextarea}
                      rows="6"
                      onFocus={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.boxShadow = '0 0 0 2px #3b82f6';
                      }}
                      onBlur={(e) => {
                        e.target.style.backgroundColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Fecha de publicación */}
                  <div style={styles.formGroup}>
                    <div style={styles.dateSection}>
                      <span style={styles.formLabel}>Publicación:</span>
                      <div style={styles.dateInputContainer}>
                        <input
                          type="date"
                          value={formData.publicationDate}
                          onChange={(e) => updateField('publicationDate', e.target.value)}
                          style={styles.dateInput}
                        />
                        <Calendar size={18} style={{ color: '#6b7280' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div style={styles.errorMessage}>
              Error: {error}
            </div>
          )}

          {/* Botones de navegación */}
          <div style={styles.buttonSection}>
            <BackButton onClick={handleBackToCatalog} />
            <PublishButton 
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </form>

        {/* Indicador de carga */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingModal}>
              <div style={styles.loadingSpinner}></div>
              <span>Publicando reseña...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;