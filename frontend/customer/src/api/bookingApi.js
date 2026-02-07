import axiosInstance from "./axiosInstance";

export const createBooking = (payload) => {
  return axiosInstance.post("/bookings", payload);
};

export const getMyBookings = () => {
  return axiosInstance.get("/bookings/my");
};

export const getBookingById = (id) => {
  return axiosInstance.get(`/bookings/${id}`);
};
