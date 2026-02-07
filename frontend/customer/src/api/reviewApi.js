import axiosInstance from "./axiosInstance";

export const submitReview = (payload) => {
  return axiosInstance.post("/reviews", payload);
};

export const getMyReviews = () => {
  return axiosInstance.get("/reviews/my");
};

export const getReviewByBooking = (bookingId) => {
  return axiosInstance.get(`/reviews/booking/${bookingId}`);
};
