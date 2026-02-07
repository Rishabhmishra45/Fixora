import { motion } from "framer-motion";

const OfflinePaymentCard = ({ payment, onVerify }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
        rounded-xl border border-slate-200
        bg-white p-5 shadow-sm
        transition
      "
    >
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-semibold">Customer:</span>{" "}
          {payment.customer.name}
        </p>
        <p>
          <span className="font-semibold">Service:</span>{" "}
          {payment.service.name}
        </p>
        <p>
          <span className="font-semibold">Amount:</span> ₹
          {payment.amount}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {payment.status}
        </p>
      </div>

      <button
        onClick={() => onVerify(payment.bookingId)}
        className="
          mt-4 w-full rounded-lg
          bg-emerald-600 px-4 py-2
          text-white font-medium
          hover:bg-emerald-700
        "
      >
        Verify Offline Payment
      </button>
    </motion.div>
  );
};

export default OfflinePaymentCard;
