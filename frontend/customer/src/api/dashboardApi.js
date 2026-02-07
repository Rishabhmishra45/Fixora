import axiosInstance from "./axiosInstance";

export const getCustomerDashboardStats = () => {
  return axiosInstance.get("/dashboard/customer-stats");
};
