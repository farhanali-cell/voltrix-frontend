import axios from "../api/axiosInstance";

export const loginUser = (data) => {
  return axios.post("/auth/login/", data);
};

export const registerUser = (data) => {
  return axios.post("/auth/register/", data);
};
