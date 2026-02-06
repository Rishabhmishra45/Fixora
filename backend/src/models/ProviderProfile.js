import mongoose from "mongoose";

const providerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    phone: { type: String, required: true },
    city: { type: String, required: true },
    services: [{ type: String, required: true }],
    experience: { type: Number, default: 0 },
    documents: [String],

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },

    isApproved: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const ProviderProfile = mongoose.model(
  "ProviderProfile",
  providerProfileSchema
);
export default ProviderProfile;
