import React from 'react';
import './CardReview.css';
import DeleteButton from '../../../components/Private/DeleteButton.jsx';
import AproveButton from '../../../components/Private/AproveButton.jsx';

const CardReview = ({ review, isApproved, onApprove, onReject, onOpenModal }) => {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>★</span>
    ));

  return (
    <div className="review-card" onClick={() => onOpenModal(review)}>
      <div className="review-header">
        <img src={review.image} alt={review.name} className="review-image" />
        <div className="review-info">
          <h3 className="review-name">{review.name}</h3>
          <p className="review-price">${review.price}</p>
        </div>
        <div className="review-actions" onClick={(e) => e.stopPropagation()}>
            <DeleteButton size={18} onClick={() => onReject(review.id)}/>
            <AproveButton 
              onClick={() => onApprove(review.id)} 
              selected={isApproved} 
            />

        </div>
      </div>

      <div className="review-content">
        <div className="review-details">
          <div className="detail-item">
            <span className="detail-label">Usuario:</span>
            <span className="detail-value">{review.user}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Puntuación:</span>
            <span className="detail-value">{renderStars(review.rating)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Publicación:</span>
            <span className="detail-value">{review.publishDate}</span>
          </div>
        </div>
        <div className="comment-section">
          <span className="detail-label">Comentario:</span>
          <p className="comment">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
