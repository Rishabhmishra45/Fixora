import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const getOfflinePayments = async () => {
  return api.get("/provider/payments/offline");
};

export const verifyOfflinePayment = async (bookingId) => {
  return api.post("/provider/payments/offline/verify", {
    bookingId
  });
};
