import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";
import {
  getProductReviews,
  getProductRatingSummary,
  submitReview,
  deleteReview,
} from "../../services/reviewService";
import Button from "../common/Button";

const ReviewsSection = ({
  productId,
  productSlug,
  showAllLink = true,
  showForm = true,
}) => {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    average_rating: 0,
    total_reviews: 0,
  });
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const justSubmittedRef = useRef(false);

  const isLoggedIn = !!localStorage.getItem("access_token");
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const myReview = reviews.find((r) => r.user === currentUser?.id);

  const fetchData = () => {
    setLoading(true);
    Promise.all([
      getProductReviews(productId),
      getProductRatingSummary(productId),
    ])
      .then(([reviewsData, summaryData]) => {
        setReviews(reviewsData);
        setSummary(summaryData);
      })
      .catch(() => {
        setReviews([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (productId) fetchData();
  }, [productId]);

  useEffect(() => {
    if (justSubmittedRef.current) {
      justSubmittedRef.current = false;
      return;
    }
    if (myReview) {
      setRating(myReview.rating);
      setComment(myReview.comment);
    }
  }, [myReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      await submitReview(productId, rating, comment);
      justSubmittedRef.current = true;
      setRating(5);
      setComment("");
      fetchData();
    } catch (err) {
      setFormError(
        err?.response?.data?.detail || "Could not submit review. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!myReview) return;
    try {
      await deleteReview(myReview.id);
      setRating(5);
      setComment("");
      fetchData();
    } catch (err) {
      setFormError("Could not delete review. Try again.");
    }
  };

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-xl font-semibold text-white">
          Reviews
        </h2>
        {showAllLink && productSlug && (
          <Link
            to={`/products/${productSlug}/reviews`}
            className="text-xs text-accent-lime hover:underline"
          >
            See all reviews
          </Link>
        )}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <StarRating rating={summary.average_rating} size="text-base" />
        <span className="text-sm text-muted">
          {summary.average_rating} out of 5 ({summary.total_reviews}{" "}
          {summary.total_reviews === 1 ? "review" : "reviews"})
        </span>
      </div>

      {showForm && isLoggedIn ? (
        <form onSubmit={handleSubmit} className="glass-card p-4 mb-8 max-w-lg">
          <h3 className="text-sm font-semibold text-white mb-3">
            {myReview ? "Update your review" : "Write a review"}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? "text-accent-lime" : "text-gray-600"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            rows={3}
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-violet"
          />

          {formError && (
            <p className="text-red-400 text-xs mt-2">{formError}</p>
          )}

          <div className="flex items-center gap-3 mt-3">
            <Button type="submit" variant="primary" loading={submitting}>
              {myReview ? "Update Review" : "Submit Review"}
            </Button>
            {myReview && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Delete my review
              </button>
            )}
          </div>
        </form>
      ) : (
        <p className="text-sm text-muted mb-8">Log in to write a review.</p>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">
                  {r.username}
                </span>
                <span className="text-xs text-muted">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <StarRating rating={r.rating} size="text-xs" />
              {r.comment && (
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  {r.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
