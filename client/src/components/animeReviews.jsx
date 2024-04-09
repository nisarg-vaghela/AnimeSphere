import React, { useState } from "react";
import AnimeReview from "./animeReview";

const AnimeReviews = (props) => {
  const { reviews, addReview, deleteReview, user } = props;
  const [isReviewed, setReviewed] = useState(false);

  const handledeleteReview = () => {
    setReviewed(false);
    deleteReview();
  };

  return (
    <div className="anime-reviews d-flex flex-column bg-dark position-relative">
      <div className="d-flex flex-row mb-4 position-relative">
        <strong className="reviews-heading">Reviews</strong>

        <div className="position-absolute d-flex flex-row" style={{ right: 0 }}>
          <button
            className={`btn btn-primary mx-2 review-btn`}
            style={{ right: 0 }}
            onClick={addReview}
          >
            <i className={`fa fa-${isReviewed ? "pencil" : "plus"}`} />{" "}
            {isReviewed ? "Edit Review" : "Add Review"}
          </button>
        </div>
      </div>
      {reviews.map((review) => {
        if (user && !isReviewed && review.user.name === user.name) {
          setReviewed(true);
        }
        return (
          <AnimeReview
            key={review.date + review.comment}
            review={review}
            user={user}
            deleteReview={handledeleteReview}
          />
        );
      })}
      {reviews.length === 0 && (
        <p className="mb-4">
          No reviews yet, Be the first one to write a review :)
        </p>
      )}
    </div>
  );
};

export default AnimeReviews;
