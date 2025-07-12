import React from 'react';
import './ReviewModal.css'
import { X } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, product, onApprove, onReject, isApproved }) => {
  if (!isOpen || !product) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-header">
          <img 
            src={product.image} 
            alt={product.name}
            className="modal-image"
          />
          <div className="modal-info">
            <h2 className="modal-title">{product.name}</h2>
            <p className="modal-price">${product.price}</p>
            <div className="modal-rating">
              {renderStars(product.rating)}
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="detail-row">
            <span className="detail-label">Usuario:</span>
            <span className="detail-value">{product.user}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Producto:</span>
            <span className="detail-value">{product.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Fecha de publicación:</span>
            <span className="detail-value">{product.publishDate}</span>
          </div>
        </div>

        <div className="modal-comment-section">
          <h3 className="comment-title">Comentario de la reseña:</h3>
          <div className="modal-comment">
            {product.comment}
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="modal-btn reject-btn"
            onClick={onReject}
          >
            Rechazar Reseña
          </button>
          <button 
            className={`modal-btn approve-btn ${isApproved ? 'approved' : ''}`}
            onClick={onApprove}
          >
            {isApproved ? 'Reseña Aprobada' : 'Aprobar Reseña'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;