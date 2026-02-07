import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, token missing"
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user || user.isActive === false) {
      return res.status(401).json({
        message: "User not active"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized"
    });
  }
};

export default protect;
