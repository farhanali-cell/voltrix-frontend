import axios from "../api/axiosInstance";

export const getProducts = (params) => {
  // params: { category, search, ... } — django-filter query params
  return axios.get("/products/", { params });
};

export const getProductBySlug = (slug) => {
  return axios.get(`/products/${slug}/`);
};

export const getCategories = () => {
  return axios.get("/products/categories/");
};
