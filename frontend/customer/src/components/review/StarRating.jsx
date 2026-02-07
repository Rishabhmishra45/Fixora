import { motion } from "framer-motion";

const StarRating = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(star)}
          className={`cursor-pointer text-2xl ${
            star <= value ? "text-yellow-400" : "text-border"
          }`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
};

export default StarRating;
