import axiosInstance from "./axiosInstance";

export const getAllServices = () => {
  return axiosInstance.get("/services");
};

export const getServiceById = (id) => {
  return axiosInstance.get(`/services/${id}`);
};

export const getCategories = () => {
  return axiosInstance.get("/categories");
};
