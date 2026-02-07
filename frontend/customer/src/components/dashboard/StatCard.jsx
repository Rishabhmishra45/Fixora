import { motion } from "framer-motion";

const StatCard = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        bg-card border border-border
        rounded-xl p-6
        flex flex-col gap-2
        shadow-sm hover:shadow-md
      "
    >
      <p className="text-sm text-secondary">
        {title}
      </p>

      <h3 className="text-3xl font-bold tracking-tight">
        {value ?? "—"}
      </h3>
    </motion.div>
  );
};

export default StatCard;
