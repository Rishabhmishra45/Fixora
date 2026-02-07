import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBookingById } from "../../api/bookingApi";
import { getPaymentByBooking } from "../../api/paymentApi";
import {
  submitReview,
  getReviewByBooking
} from "../../api/reviewApi";
import BookingStatus from "../../components/booking/BookingStatus";
import PaymentStatusBadge from "../../components/payment/PaymentStatusBadge";
import StarRating from "../../components/review/StarRating";

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState(null);
  const [review, setReview] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const bookingRes = await getBookingById(id);
      setBooking(bookingRes.data.booking);

      const paymentRes = await getPaymentByBooking(id);
      setPayment(paymentRes.data.payment);

      const reviewRes = await getReviewByBooking(id);
      setReview(reviewRes.data.review);
    };

    fetchData();
  }, [id]);

  const submitReviewHandler = async () => {
    await submitReview({
      bookingId: id,
      rating,
      comment
    });

    const reviewRes = await getReviewByBooking(id);
    setReview(reviewRes.data.review);
  };

  if (!booking) {
    return <p className="p-6">Loading booking...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl p-6 space-y-4"
    >
      <h1 className="text-3xl font-bold">
        Booking Details
      </h1>

      <div className="bg-card border border-border rounded p-4">
        <p><strong>Service:</strong> {booking.service.name}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Address:</strong> {booking.address}</p>
      </div>

      <BookingStatus status={booking.status} />

      {payment && (
        <div className="bg-card border border-border rounded p-4">
          <p>
            <strong>Payment Status:</strong>{" "}
            <PaymentStatusBadge status={payment.status} />
          </p>
        </div>
      )}

      {/* REVIEW SECTION */}
      {booking.status === "COMPLETED" && !review && (
        <div className="bg-card border border-border rounded p-4 space-y-4">
          <h3 className="text-lg font-semibold">
            Leave a Review
          </h3>

          <StarRating value={rating} onChange={setRating} />

          <textarea
            className="w-full p-3 border border-border rounded bg-transparent"
            placeholder="Write your feedback"
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={submitReviewHandler}
            disabled={rating === 0}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      )}

      {review && (
        <div className="bg-card border border-border rounded p-4">
          <p className="font-semibold mb-1">
            Your Review
          </p>
          <p className="text-yellow-400">
            {"★".repeat(review.rating)}
          </p>
          <p className="text-secondary">
            {review.comment}
          </p>
        </div>
      )}

      <Link
        to="/dashboard/reviews"
        className="inline-block text-primary"
      >
        View all my reviews →
      </Link>
    </motion.div>
  );
};

export default BookingDetails;
