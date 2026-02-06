import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import ProviderProfile from "../models/ProviderProfile.js";
import { successResponse } from "../utils/apiResponse.js";

/* ---------------------------------------
   CUSTOMER: Submit Review
---------------------------------------- */
export const submitReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user._id,
      status: "COMPLETED",
      reviewSubmitted: false
    });

    if (!booking) {
      res.status(400);
      throw new Error("Review not allowed for this booking");
    }

    const review = await Review.create({
      booking: booking._id,
      customer: booking.customer,
      provider: booking.provider,
      rating,
      comment
    });

    booking.reviewSubmitted = true;
    await booking.save();

    const profile = await ProviderProfile.findOne({ user: booking.provider });
    if (profile) {
      const totalRating =
        profile.rating.average * profile.rating.count + rating;
      profile.rating.count += 1;
      profile.rating.average = Number(
        (totalRating / profile.rating.count).toFixed(1)
      );
      await profile.save();
    }

    successResponse(res, 201, "Review submitted successfully", review);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   CUSTOMER: My Reviews
---------------------------------------- */
export const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ customer: req.user._id })
      .populate("provider", "name email")
      .populate("booking", "bookingNumber");

    successResponse(res, 200, "Customer reviews fetched", reviews);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PUBLIC: Provider Reviews
---------------------------------------- */
export const getProviderReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      provider: req.params.providerId,
      isVisible: true
    }).populate("customer", "name");

    successResponse(res, 200, "Provider reviews fetched", reviews);
  } catch (error) {
    next(error);
  }
};
