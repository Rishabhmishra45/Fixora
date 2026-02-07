import axiosInstance from "./axiosInstance";

export const loginUser = async (data) => {
  const res = await axiosInstance.post("/auth/login", data);
  return {
    data: res.data.data
  };
};

export const registerUser = async (data) => {
  const res = await axiosInstance.post("/auth/register", data);
  return {
    data: res.data.data
  };
};

export const googleLoginCustomer = async (token) => {
  const res = await axiosInstance.post("/auth/google/customer", { token });
  return {
    data: res.data.data
  };
};
