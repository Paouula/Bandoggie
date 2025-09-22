import React, {useRef, useState, useEffect} from "react";
import "./ReviewModal.css";
import { X } from "lucide-react";
import { set } from "react-hook-form";
import classNames from "classnames";

const ReviewModal = ({
  isOpen,
  onClose,
  review,
  className = "", 
  onApprove,
  onReject,
  isApproved,
  onVerify,
}) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isVisible || !review) return null;


  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  const handleClose = async () => {

    await onVerify() || onReject();

    setIsClosing(true);

    if (overlayRef.current) {
      overlayRef.current.classList.add("fade-out");
    }

    if (modalRef.current) {
      modalRef.current.classList.add("fade-out");
    }

    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };



  return (
    <div ref={overlayRef} className={`modal-overlay ${isClosing ? "fade-out" : "" }`} onClick={handleOverlayClick}>
      <div className={`modal-content ${className} ${isClosing ? "fade-out" : ""}`}>
        <button className="modal-close" onClick={handleClose}>
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
            <span className="detail-value">
              {review.idProduct?.nameProduct}
            </span>
          </div>
          <span className="detail-label">Fecha de publicación:</span>
          <span className="detail-value">
            {new Date(review.createdAt).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="modal-comment-section">
          <h3 className="comment-title">Comentario de la reseña:</h3>
          <div className="modal-comment">{review.comment}</div>
        </div>

        <div className="modal-actions">
          <button className="modal-btn reject-btn" onClick={onReject && handleClose}>
            Rechazar Reseña
          </button>
          <button
            className={`modal-btn approve-btn ${isApproved ? "approved" : ""}`}
            onClick={onVerify && handleClose}
          >
            {isApproved ? "Reseña Aprobada" : "Aprobar Reseña"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
