import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import { successResponse } from "../utils/apiResponse.js";

export const getCustomerDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalBookings = await Booking.countDocuments({
      customer: userId
    });

    const completedJobs = await Booking.countDocuments({
      customer: userId,
      status: "COMPLETED"
    });

    const pendingPayments = await Payment.aggregate([
      {
        $match: {
          customer: userId,
          status: "PENDING"
        }
      },
      {
        $group: {
          _id: null,
          amount: { $sum: "$amount" }
        }
      }
    ]);

    successResponse(res, 200, "Customer dashboard stats fetched", {
      totalBookings,
      completedJobs,
      pendingAmount: pendingPayments[0]?.amount || 0
    });
  } catch (error) {
    next(error);
  }
};
