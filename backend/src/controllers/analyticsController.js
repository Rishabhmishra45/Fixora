import User from "../models/User.js";
import ProviderProfile from "../models/ProviderProfile.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";
import { successResponse } from "../utils/apiResponse.js";

/* ---------------------------------------
   DASHBOARD OVERVIEW
---------------------------------------- */
export const getDashboardOverview = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalCustomers,
      totalProviders,
      approvedProviders,
      totalBookings,
      completedBookings,
      cancelledBookings
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "customer" }),
      User.countDocuments({ role: "provider" }),
      ProviderProfile.countDocuments({ isApproved: true }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "COMPLETED" }),
      Booking.countDocuments({ status: "CANCELLED" })
    ]);

    successResponse(res, 200, "Dashboard overview fetched", {
      users: {
        total: totalUsers,
        customers: totalCustomers,
        providers: totalProviders,
        approvedProviders
      },
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        cancelled: cancelledBookings
      }
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   REVENUE ANALYTICS
---------------------------------------- */
export const getRevenueStats = async (req, res, next) => {
  try {
    const payments = await Payment.find({ status: "SUCCESS" });

    let onlineRevenue = 0;
    let offlineRevenue = 0;

    payments.forEach((p) => {
      if (p.paymentMode === "ONLINE") onlineRevenue += p.amount;
      if (p.paymentMode === "OFFLINE") offlineRevenue += p.amount;
    });

    successResponse(res, 200, "Revenue stats fetched", {
      totalRevenue: onlineRevenue + offlineRevenue,
      onlineRevenue,
      offlineRevenue
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   BOOKINGS OVER TIME (LAST 30 DAYS)
---------------------------------------- */
export const getBookingTrends = async (req, res, next) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const trends = await Booking.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    successResponse(res, 200, "Booking trends fetched", trends);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER PERFORMANCE
---------------------------------------- */
export const getProviderPerformance = async (req, res, next) => {
  try {
    const providers = await ProviderProfile.find()
      .populate("user", "name email")
      .lean();

    const data = await Promise.all(
      providers.map(async (provider) => {
        const completedJobs = await Booking.countDocuments({
          provider: provider.user._id,
          status: "COMPLETED"
        });

        const cancelledJobs = await Booking.countDocuments({
          provider: provider.user._id,
          status: "CANCELLED"
        });

        return {
          provider: provider.user,
          rating: provider.rating,
          completedJobs,
          cancelledJobs
        };
      })
    );

    successResponse(res, 200, "Provider performance fetched", data);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   RATING HEALTH
---------------------------------------- */
export const getRatingHealth = async (req, res, next) => {
  try {
    const ratings = await Review.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);

    successResponse(res, 200, "Rating health fetched", ratings);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   CANCELLATION REASONS
---------------------------------------- */
export const getCancellationStats = async (req, res, next) => {
  try {
    const cancellations = await Booking.aggregate([
      { $match: { status: "CANCELLED" } },
      {
        $group: {
          _id: "$cancellation.cancelledBy",
          count: { $sum: 1 }
        }
      }
    ]);

    successResponse(res, 200, "Cancellation stats fetched", cancellations);
  } catch (error) {
    next(error);
  }
};
