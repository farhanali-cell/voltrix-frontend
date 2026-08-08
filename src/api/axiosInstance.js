import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const code = error.response?.data?.code;

    const isTokenError = status === 401 && code === "token_not_valid";

    if (isTokenError && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        redirectIfProtected();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        // Ek refresh already chal raha hai — is request ko queue me daal do,
        // naya token milte hi retry ho jayegi.
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${BASE_URL}/auth/login/refresh/`, {
          refresh: refreshToken,
        });
        const newAccessToken = res.data.access;

        localStorage.setItem("access_token", newAccessToken);
        isRefreshing = false;
        onRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        onRefreshed(null);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        redirectIfProtected();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

function redirectIfProtected() {
  const protectedPaths = ["/cart", "/checkout", "/profile", "/dashboard"];
  const isOnProtectedPath = protectedPaths.some((p) =>
    window.location.pathname.startsWith(p),
  );

  if (isOnProtectedPath) {
    window.location.href = "/login";
  }
}

export default axiosInstance;
