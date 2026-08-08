import axios from "../api/axiosInstance";

export const getCart = () => {
  return axios.get("/products/cart/");
};

export const addToCart = (productId, quantity = 1) => {
  return axios.post("/products/cart/add/", {
    product_id: productId,
    quantity,
  });
};

export const updateCartItem = (itemId, quantity) => {
  return axios.patch(`/products/cart/items/${itemId}/`, { quantity });
};

export const removeCartItem = (itemId) => {
  return axios.delete(`/products/cart/items/${itemId}/`);
};
