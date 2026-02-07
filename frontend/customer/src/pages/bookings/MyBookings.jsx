import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMyBookings } from "../../api/bookingApi";
import BookingCard from "../../components/booking/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(Array.isArray(res?.data?.bookings) ? res.data.bookings : []);
      } catch (error) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-secondary">Loading bookings...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {bookings.length === 0 && (
        <p className="text-secondary">No bookings found.</p>
      )}

      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
