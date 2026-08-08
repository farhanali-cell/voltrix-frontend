import axiosInstance from "../api/axiosInstance";

// Get all reviews for a product
export const getProductReviews = async (productId) => {
  const response = await axiosInstance.get(`/reviews/product/${productId}/`);
  return response.data;
};

// Get average rating + total review count for a product
export const getProductRatingSummary = async (productId) => {
  const response = await axiosInstance.get(
    `/reviews/product/${productId}/summary/`,
  );
  return response.data;
};

// Create a review, or update it if the logged-in user already reviewed this product
export const submitReview = async (productId, rating, comment) => {
  const response = await axiosInstance.post(`/reviews/create/`, {
    product: productId,
    rating,
    comment,
  });
  return response.data;
};

// Delete the logged-in user's own review
export const deleteReview = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/${reviewId}/delete/`);
  return response.data;
};
