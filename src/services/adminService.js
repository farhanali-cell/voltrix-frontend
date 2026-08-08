import axios from "../api/axiosInstance";

export const getSellers = (statusParam) => {
  return axios.get("/admin/sellers/", {
    params: statusParam ? { status: statusParam } : {},
  });
};

export const approveSeller = (id) => {
  return axios.patch(`/admin/sellers/${id}/approve/`);
};

export const rejectSeller = (id) => {
  return axios.delete(`/admin/sellers/${id}/reject/`);
};

export const getAdminProducts = (statusParam) => {
  return axios.get("/admin/products/", {
    params: statusParam ? { status: statusParam } : {},
  });
};

export const toggleProductActive = (id) => {
  return axios.patch(`/admin/products/${id}/toggle-active/`);
};

export const getAdminOrders = (statusParam) => {
  return axios.get("/admin/orders/", {
    params: statusParam ? { status: statusParam } : {},
  });
};

export const getAnalytics = () => {
  return axios.get("/admin/analytics/");
};
