import React from "react";
import CardReview from "./CardReview";

const ListReviews = ({
  reviews,
  selectedReviews,
  onApprove,
  onReject,
  onOpenModal,
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <div className="no-reviews-icon">📝</div>
        <div>No hay reseñas pendientes</div>
      </div>
    );
  }

  return (
    <div className="reviews-grid">
      {reviews.map((review) => (
        <CardReview
          key={review._id}
          review={review}
          isApproved={selectedReviews.has(review._id)}
          onApprove={onApprove}
          onReject={onReject}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};

export default ListReviews;
