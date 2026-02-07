import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

// REQUEST → attach token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("fixora-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE → auto logout
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("fixora-token");
      localStorage.removeItem("fixora-user");
      window.location.href = "/login";
    }

    const message =
      error?.response?.data?.message ||
      "Something went wrong";

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
