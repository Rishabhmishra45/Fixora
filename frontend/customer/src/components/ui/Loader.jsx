import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div className="h-12 w-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
};

export default Loader;
