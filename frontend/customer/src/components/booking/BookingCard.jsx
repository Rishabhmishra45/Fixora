import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const bookingId = booking._id; // MUST be Mongo ObjectId

  if (!bookingId || bookingId.length !== 24) {
    console.error("Invalid bookingId:", bookingId, booking);
    return null;
  }

  const showPayNow =
    booking.status !== "COMPLETED" &&
    booking.status !== "CANCELLED";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2"
    >
      <h3 className="font-semibold">
        {booking.service.name}
      </h3>

      <p className="text-sm text-secondary">
        {booking.date} at {booking.time}
      </p>

      <p className="text-sm">
        Status: <strong>{booking.status}</strong>
      </p>

      <div className="flex items-center gap-4 mt-2">
        <Link
          to={`/dashboard/bookings/${bookingId}`}
          className="text-primary text-sm"
        >
          View Details →
        </Link>

        {showPayNow && (
          <Link
            to={`/dashboard/payments/${bookingId}`}
            className="ml-auto bg-primary text-white text-sm px-4 py-1.5 rounded hover:opacity-90 transition"
          >
            Pay Now
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default BookingCard;
