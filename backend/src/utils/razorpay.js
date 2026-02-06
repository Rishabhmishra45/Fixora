import Razorpay from "razorpay";
import env from "../config/env.js";

if (!env.razorpayKeyId || !env.razorpayKeySecret) {
  throw new Error(
    "Razorpay configuration missing: RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET"
  );
}

const razorpayInstance = new Razorpay({
  key_id: env.razorpayKeyId,
  key_secret: env.razorpayKeySecret
});

export default razorpayInstance;
