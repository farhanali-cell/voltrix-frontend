import axios from "../api/axiosInstance";

export const getProfile = () => {
  return axios.get("/auth/profile/");
};

export const updateProfile = (data) => {
  return axios.patch("/auth/profile/", data);
};

export const changePassword = (data) => {
  return axios.post("/auth/change-password/", data);
};
