import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  markOfflinePayment
} from "../../api/paymentApi";
import { getBookingById } from "../../api/bookingApi";
import PaymentOptionCard from "../../components/payment/PaymentOptionCard";
import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";

const PaymentCheckout = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingById(bookingId);
        setBooking(res.data.booking);
      } catch (err) {
        showToast("Invalid booking", "error");
        navigate("/dashboard/bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleOnlinePayment = async () => {
    try {
      const orderRes = await createRazorpayOrder(bookingId);
      const { orderId, amount, currency, key, paymentId } = orderRes.data;

      const options = {
        key,
        amount,
        currency,
        order_id: orderId,
        name: "Fixora",
        description: "Service Booking Payment",
        handler: async (response) => {
          await verifyRazorpayPayment({
            paymentId,
            ...response
          });
          showToast("Payment successful");
          navigate(`/dashboard/bookings/${bookingId}`);
        },
        theme: { color: "#2563eb" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      showToast(err.message || "Payment failed", "error");
    }
  };

  const handleOfflinePayment = async () => {
    try {
      await markOfflinePayment(bookingId, "CASH");
      showToast("Offline payment selected");
      navigate(`/dashboard/bookings/${bookingId}`);
    } catch (err) {
      showToast(err.message || "Offline payment failed", "error");
    }
  };

  if (loading) {
    return <p className="p-6">Loading payment...</p>;
  }

  if (booking.isPaid) {
    return (
      <div className="p-6">
        <p className="text-green-600 font-semibold">
          Payment already completed for this booking.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">
        Choose Payment Method
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PaymentOptionCard
          title="Pay Online"
          description="Secure online payment via Razorpay"
          action={handleOnlinePayment}
          highlight
        />

        <PaymentOptionCard
          title="Pay After Service"
          description="Pay directly to provider after job completion"
          action={handleOfflinePayment}
        />
      </div>
    </motion.div>
  );
};

export default PaymentCheckout;
