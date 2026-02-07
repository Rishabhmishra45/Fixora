import axiosInstance from "./axiosInstance";

export const getMyNotifications = () => {
  return axiosInstance.get("/notifications/my");
};

export const markNotificationsRead = (ids) => {
  return axiosInstance.post("/notifications/mark-read", { ids });
};
