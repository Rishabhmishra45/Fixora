import { motion } from "framer-motion";

const PaymentOptionCard = ({
  title,
  description,
  action,
  highlight
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`border rounded-lg p-6 cursor-pointer ${
        highlight
          ? "border-primary bg-card"
          : "border-border bg-card"
      }`}
      onClick={action}
    >
      <h3 className="text-xl font-semibold mb-2">
        {title}
      </h3>
      <p className="text-secondary mb-4">
        {description}
      </p>

      <button className="bg-primary text-white px-4 py-2 rounded">
        Select
      </button>
    </motion.div>
  );
};

export default PaymentOptionCard;
