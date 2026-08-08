import axios from "../api/axiosInstance";

export const getWishlist = () => {
  return axios.get("/products/wishlist/");
};

export const addToWishlist = (productId) => {
  return axios.post("/products/wishlist/", { product_id: productId });
};

export const removeFromWishlist = (itemId) => {
  return axios.delete(`/products/wishlist/${itemId}/`);
};
