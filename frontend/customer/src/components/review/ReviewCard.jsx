import { motion } from "framer-motion";

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <p className="font-semibold">
          {review.service?.name}
        </p>
        <span className="text-yellow-400">
          {"★".repeat(review.rating)}
        </span>
      </div>

      <p className="text-secondary text-sm">
        {review.comment}
      </p>
    </motion.div>
  );
};

export default ReviewCard;
