import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    paymentMode: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      required: true
    },

    offlineMethod: {
      type: String,
      enum: ["CASH", "UPI", "BANK_TRANSFER"]
    },

    razorpay: {
      orderId: String,
      paymentId: String,
      signature: String
    },

    amount: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING"
    },

    verifiedByProvider: {
      type: Boolean,
      default: false
    },

    verifiedAt: {
      type: Date
    },

    paidAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
