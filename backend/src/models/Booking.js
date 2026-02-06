import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: { type: String, unique: true, required: true },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    },

    scheduledDate: { type: Date, required: true },

    address: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
      latitude: Number,
      longitude: Number
    },

    price: { type: Number, required: true },

    paymentType: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "ONLINE"
    },

    isPaid: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: [
        "REQUESTED",
        "ACCEPTED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED"
      ],
      default: "REQUESTED"
    },

    reviewSubmitted: { type: Boolean, default: false },

    timestampsLog: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: Date,
      startedAt: Date,
      completedAt: Date
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
