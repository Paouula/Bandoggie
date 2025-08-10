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

      <style jsx>{`
        .reviews-grid {
          background-color: #fee3ee;
          border-radius: 15px;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .no-reviews {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #666;
          font-size: 16px;
        }

        .no-reviews-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default ListReviews;
