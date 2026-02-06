import dotenv from "dotenv";

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,

  mongoUri: process.env.MONGO_URI,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES_IN || "7d",

  googleClientId: process.env.GOOGLE_CLIENT_ID,

  razorpayKeyId: process.env.RAZORPAY_KEY_ID,
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET
};

if (!env.razorpayKeyId || !env.razorpayKeySecret) {
  console.warn(
    "⚠️ Razorpay keys are missing. Online payments will not work."
  );
}

export default env;
