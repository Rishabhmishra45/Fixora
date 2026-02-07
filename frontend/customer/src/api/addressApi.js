import axiosInstance from "./axiosInstance";

export const getMyAddresses = () =>
  axiosInstance.get("/addresses");

export const addAddress = (payload) =>
  axiosInstance.post("/addresses", payload);

export const updateAddress = (id, payload) =>
  axiosInstance.put(`/addresses/${id}`, payload);

export const deleteAddress = (id) =>
  axiosInstance.delete(`/addresses/${id}`);

export const setDefaultAddress = (id) =>
  axiosInstance.put(`/addresses/${id}/default`);
