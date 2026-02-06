import ProviderProfile from "../models/ProviderProfile.js";
import { successResponse } from "../utils/apiResponse.js";

export const createOrUpdateProfile = async (req, res, next) => {
  try {
    const data = { ...req.body, user: req.user._id };

    let profile = await ProviderProfile.findOne({ user: req.user._id });

    if (profile) {
      profile = await ProviderProfile.findOneAndUpdate(
        { user: req.user._id },
        data,
        { new: true }
      );
    } else {
      profile = await ProviderProfile.create(data);
    }

    successResponse(res, 200, "Provider profile saved", profile);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const profile = await ProviderProfile.findOne({
      user: req.user._id
    }).populate("user", "name email");

    successResponse(res, 200, "Provider profile fetched", profile);
  } catch (error) {
    next(error);
  }
};
