import axiosInstance from "./axiosInstance";

export const getMyProfile = () => {
  return axiosInstance.get("/profile/me");
};

export const updateProfile = (payload) => {
  return axiosInstance.put("/profile/update", payload);
};

export const changePassword = (payload) => {
  return axiosInstance.put("/profile/change-password", payload);
};
