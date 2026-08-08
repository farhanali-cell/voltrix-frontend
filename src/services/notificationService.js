import axios from "../api/axiosInstance";

export const getNotifications = () => {
  return axios.get("/notifications/");
};

export const markNotificationRead = (id) => {
  return axios.patch(`/notifications/${id}/read/`);
};

export const markAllNotificationsRead = () => {
  return axios.patch("/notifications/mark-all-read/");
};

export const getUnreadCount = () => {
  return axios.get("/notifications/unread-count/");
};
