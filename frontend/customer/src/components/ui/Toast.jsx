import { motion } from "framer-motion";

const colors = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600"
};

const Toast = ({ toast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`px-4 py-3 rounded text-white shadow ${colors[toast.type]}`}
    >
      {toast.message}
    </motion.div>
  );
};

export default Toast;
