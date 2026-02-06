import crypto from "crypto";
import razorpayInstance from "../utils/razorpay.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import { successResponse } from "../utils/apiResponse.js";

/* ---------------------------------------
   ONLINE PAYMENT – CREATE ORDER
---------------------------------------- */
export const createPaymentOrder = async (req, res, next) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user._id,
      isPaid: false
    });

    if (!booking) {
      res.status(400);
      throw new Error("Invalid booking for payment");
    }

    booking.paymentType = "ONLINE";
    await booking.save();

    const order = await razorpayInstance.orders.create({
      amount: booking.price * 100,
      currency: "INR",
      receipt: booking.bookingNumber
    });

    const payment = await Payment.create({
      booking: booking._id,
      customer: booking.customer,
      provider: booking.provider,
      paymentMode: "ONLINE",
      amount: booking.price,
      razorpay: { orderId: order.id }
    });

    successResponse(res, 201, "Online payment order created", {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      paymentId: payment._id
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   ONLINE PAYMENT – VERIFY
---------------------------------------- */
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentId
    } = req.body;

    const payment = await Payment.findById(paymentId).populate("booking");

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      payment.status = "FAILED";
      await payment.save();
      res.status(400);
      throw new Error("Payment verification failed");
    }

    payment.status = "SUCCESS";
    payment.razorpay.paymentId = razorpay_payment_id;
    payment.razorpay.signature = razorpay_signature;
    payment.paidAt = new Date();
    await payment.save();

    payment.booking.isPaid = true;
    await payment.booking.save();

    successResponse(res, 200, "Online payment verified", payment);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   OFFLINE PAYMENT – CUSTOMER SELECTS MODE
---------------------------------------- */
export const selectOfflinePayment = async (req, res, next) => {
  try {
    const { bookingId, offlineMethod } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      customer: req.user._id
    });

    booking.paymentType = "OFFLINE";
    await booking.save();

    const payment = await Payment.create({
      booking: booking._id,
      customer: booking.customer,
      provider: booking.provider,
      paymentMode: "OFFLINE",
      offlineMethod,
      amount: booking.price
    });

    successResponse(res, 201, "Offline payment selected", payment);
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------
   PROVIDER – VERIFY OFFLINE PAYMENT
---------------------------------------- */
export const providerVerifyOfflinePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("booking");

    if (!payment || payment.paymentMode !== "OFFLINE") {
      res.status(400);
      throw new Error("Invalid offline payment");
    }

    if (payment.provider.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    payment.status = "SUCCESS";
    payment.verifiedByProvider = true;
    payment.verifiedAt = new Date();
    payment.paidAt = new Date();
    await payment.save();

    payment.booking.isPaid = true;
    await payment.booking.save();

    successResponse(res, 200, "Offline payment verified by provider", payment);
  } catch (error) {
    next(error);
  }
};
