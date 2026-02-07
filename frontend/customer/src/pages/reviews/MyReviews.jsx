import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getMyReviews } from "../../api/reviewApi";
import ReviewCard from "../../components/review/ReviewCard";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await getMyReviews();
      setReviews(res.data.reviews);
    };

    fetchReviews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-3xl font-bold">
        My Reviews
      </h1>

      {reviews.length === 0 && (
        <p className="text-secondary">
          You have not submitted any reviews yet.
        </p>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </motion.div>
  );
};

export default MyReviews;
