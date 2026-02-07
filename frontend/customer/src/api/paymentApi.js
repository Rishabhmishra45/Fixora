import axiosInstance from "./axiosInstance";

/* ---------------------------------------
   ONLINE PAYMENT
---------------------------------------- */

export const createRazorpayOrder = (bookingId) => {
  return axiosInstance.post("/payments/online/create-order", {
    bookingId
  });
};

export const verifyRazorpayPayment = (payload) => {
  return axiosInstance.post("/payments/online/verify", payload);
};

/* ---------------------------------------
   OFFLINE PAYMENT
---------------------------------------- */

export const markOfflinePayment = (bookingId, offlineMethod = "CASH") => {
  return axiosInstance.post("/payments/offline/select", {
    bookingId,
    offlineMethod
  });
};

/* ---------------------------------------
   GET PAYMENT BY BOOKING
   (⚠️ backend route abhi nahi bheja gaya)
---------------------------------------- */

export const getPaymentByBooking = (bookingId) => {
  return axiosInstance.get(`/payments/booking/${bookingId}`);
};
