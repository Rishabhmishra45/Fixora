import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getOfflinePayments,
  verifyOfflinePayment
} from "../../api/paymentApi";
import OfflinePaymentCard from "../../components/payment/OfflinePaymentCard";

const OfflinePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const res = await getOfflinePayments();
      setPayments(res.data.payments || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleVerify = async (bookingId) => {
    await verifyOfflinePayment(bookingId);
    loadPayments();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-slate-50 p-6"
    >
      <div className="mx-auto max-w-6xl space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Offline Payment Verification
        </h1>

        {loading && (
          <p className="text-slate-500">
            Loading offline payments…
          </p>
        )}

        {!loading && payments.length === 0 && (
          <p className="text-slate-500">
            No pending offline payments.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {payments.map((payment) => (
            <OfflinePaymentCard
              key={payment.bookingId}
              payment={payment}
              onVerify={handleVerify}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OfflinePayments;
