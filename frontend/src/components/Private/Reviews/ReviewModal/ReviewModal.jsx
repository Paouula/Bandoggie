import React from 'react';
import './ReviewModal.css'
import { X } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, review, onApprove, onReject, isApproved }) => {
  if (!isOpen || !review) return null;

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
            src={review.designImages?.[0]} 
            alt={review.idProduct?.nameProduct}
            className="modal-image"
          />
          <div className="modal-info">
            <h2 className="modal-title">{review.idProduct?.nameProduct}</h2>
            <p className="modal-price">${review.idProduct?.price}</p>
            <div className="modal-rating">
              {renderStars(review.qualification)}
            </div>
          </div>
        </div>

        <div className="modal-details">
          <div className="detail-row">
            <span className="detail-label">Usuario:</span>
            <span className="detail-value">{review.idClient?.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Producto:</span>
            <span className="detail-value">{review.idProduct?.nameProduct}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Fecha de publicación:</span>
            <span className="detail-value">{review.createdAt}</span>
          </div>
        </div>

        <div className="modal-comment-section">
          <h3 className="comment-title">Comentario de la reseña:</h3>
          <div className="modal-comment">
            {review.comment}
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