import axios from "../api/axiosInstance";

export const getOrderTracking = (id) => {
  return axios.get(`/orders/my-orders/${id}/tracking/`);
};
