import Booking from "../models/Booking.js";
import Service from "../models/Service.js";
import ProviderProfile from "../models/ProviderProfile.js";
import { successResponse } from "../utils/apiResponse.js";

/* ---------------------------------------
   UTIL: Generate Booking Number
---------------------------------------- */
const generateBookingNumber = () => {
  return `FIX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

/* ---------------------------------------
   CUSTOMER: Create Booking
---------------------------------------- */
export const createBooking = async (req, res, next) => {
  try {
    const { serviceId, scheduledDate, address } = req.body;

    const service = await Service.findById(serviceId);
    if (!service || !service.isAvailable) {
      res.status(404);
      throw new Error("Service not available");
    }

    const booking = await Booking.create({
      bookingNumber: generateBookingNumber(),
      customer: req.user._id,
      service: service._id,
      scheduledDate,
      address,
      price: service.price
    });

    successResponse(res, 201, "Booking created", booking);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   CUSTOMER: My Bookings
---------------------------------------- */
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate("service", "title price")
      .populate("provider", "name email");

    successResponse(res, 200, "Customer bookings fetched", bookings);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER: Available Bookings
---------------------------------------- */
export const getAvailableBookingsForProvider = async (req, res, next) => {
  try {
    const providerProfile = await ProviderProfile.findOne({
      user: req.user._id,
      isApproved: true,
      isBlocked: false
    });

    if (!providerProfile) {
      res.status(403);
      throw new Error("Provider not approved");
    }

    const bookings = await Booking.find({
      status: "REQUESTED"
    }).populate("service", "title price");

    successResponse(res, 200, "Available bookings fetched", bookings);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER: Accept Booking
---------------------------------------- */
export const acceptBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.status !== "REQUESTED") {
      res.status(400);
      throw new Error("Booking cannot be accepted");
    }

    booking.provider = req.user._id;
    booking.status = "ACCEPTED";
    booking.timestampsLog.acceptedAt = new Date();

    await booking.save();

    successResponse(res, 200, "Booking accepted", booking);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER: Start Job
---------------------------------------- */
export const startJob = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: req.user._id
    });

    if (!booking || booking.status !== "ACCEPTED") {
      res.status(400);
      throw new Error("Job cannot be started");
    }

    booking.status = "IN_PROGRESS";
    booking.timestampsLog.startedAt = new Date();
    await booking.save();

    successResponse(res, 200, "Job started", booking);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER: Complete Job
---------------------------------------- */
export const completeJob = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      provider: req.user._id
    });

    if (!booking || booking.status !== "IN_PROGRESS") {
      res.status(400);
      throw new Error("Job cannot be completed");
    }

    booking.status = "COMPLETED";
    booking.timestampsLog.completedAt = new Date();
    await booking.save();

    successResponse(res, 200, "Job completed", booking);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   CANCEL BOOKING (Customer / Provider)
---------------------------------------- */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.status === "COMPLETED") {
      res.status(400);
      throw new Error("Booking cannot be cancelled");
    }

    booking.status = "CANCELLED";
    booking.cancellation = {
      cancelledBy: req.user.role,
      reason: req.body.reason,
      cancelledAt: new Date()
    };

    await booking.save();

    successResponse(res, 200, "Booking cancelled", booking);
  } catch (error) {
    next(error);
  }
};
