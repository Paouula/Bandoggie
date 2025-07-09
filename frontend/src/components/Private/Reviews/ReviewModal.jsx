import React from 'react';
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

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #f0f0f0;
          border: none;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 1001;
        }

        .modal-close:hover {
          background: #e0e0e0;
          transform: scale(1.1);
        }

        .modal-header {
          display: flex;
          gap: 20px;
          padding: 30px 30px 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-image {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          object-fit: cover;
          border: 3px solid #f0f0f0;
        }

        .modal-info {
          flex: 1;
        }

        .modal-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0 0 10px 0;
        }

        .modal-price {
          font-size: 20px;
          color: #ff6b9d;
          font-weight: bold;
          margin: 0 0 15px 0;
        }

        .modal-rating {
          display: flex;
          gap: 3px;
        }

        .star {
          color: #ddd;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .star.filled {
          color: #ffa726;
        }

        .modal-details {
          padding: 20px 30px;
          background: #f8f9fa;
          border-bottom: 1px solid #eee;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-label {
          font-weight: bold;
          color: #666;
        }

        .detail-value {
          color: #333;
          text-align: right;
          max-width: 60%;
        }

        .modal-comment-section {
          padding: 30px;
        }

        .comment-title {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0 0 15px 0;
        }

        .modal-comment {
          font-size: 15px;
          color: #666;
          line-height: 1.6;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #ff6b9d;
        }

        .modal-actions {
          display: flex;
          gap: 15px;
          padding: 20px 30px 30px;
          border-top: 1px solid #eee;
        }

        .modal-btn {
          flex: 1;
          padding: 15px 20px;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reject-btn {
          background: #ff6b9d;
          color: white;
        }

        .reject-btn:hover {
          background: #ff5588;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 107, 157, 0.3);
        }

        .approve-btn {
          background: #4a90a4;
          color: white;
        }

        .approve-btn:hover {
          background: #357a8a;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(74, 144, 164, 0.3);
        }

        .approve-btn.approved {
          background: #2e6b7a;
          box-shadow: 0 0 0 3px rgba(78, 144, 164, 0.3);
        }

        .approve-btn.approved:hover {
          background: #2e6b7a;
          transform: none;
          box-shadow: 0 0 0 3px rgba(78, 144, 164, 0.3);
        }

        @media (max-width: 768px) {
          .modal-content {
            max-width: 95%;
            margin: 10px;
          }

          .modal-header {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .modal-image {
            width: 100px;
            height: 100px;
            align-self: center;
          }

          .modal-actions {
            flex-direction: column;
          }

          .detail-row {
            flex-direction: column;
            gap: 5px;
          }

          .detail-value {
            text-align: left;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ReviewModal;