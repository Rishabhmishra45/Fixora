import ProviderProfile from "../models/ProviderProfile.js";
import Review from "../models/Review.js";
import { successResponse } from "../utils/apiResponse.js";

export const getAllProviders = async (req, res, next) => {
  try {
    const providers = await ProviderProfile.find().populate(
      "user",
      "name email role"
    );
    successResponse(res, 200, "All providers fetched", providers);
  } catch (error) {
    next(error);
  }
};

export const approveProvider = async (req, res, next) => {
  try {
    const provider = await ProviderProfile.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    successResponse(res, 200, "Provider approved", provider);
  } catch (error) {
    next(error);
  }
};

export const blockProvider = async (req, res, next) => {
  try {
    const provider = await ProviderProfile.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    successResponse(res, 200, "Provider blocked", provider);
  } catch (error) {
    next(error);
  }
};

/* -------- NEW: Review Moderation -------- */
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .populate("provider", "name email");

    successResponse(res, 200, "All reviews fetched", reviews);
  } catch (error) {
    next(error);
  }
};

export const toggleReviewVisibility = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isVisible: req.body.isVisible },
      { new: true }
    );

    successResponse(res, 200, "Review visibility updated", review);
  } catch (error) {
    next(error);
  }
};
