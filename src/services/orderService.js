import axios from "../api/axiosInstance";

export const getCustomerOrders = () => {
  return axios.get("/orders/my-orders/");
};

export const getOrderDetail = (id) => {
  return axios.get(`/orders/my-orders/${id}/`);
};

export const cancelOrder = (id) => {
  return axios.patch(`/orders/my-orders/${id}/cancel/`, {});
};
