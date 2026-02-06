import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import verifyGoogleToken from "../utils/googleVerify.js";
import { successResponse } from "../utils/apiResponse.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      authProvider: "local"
    });

    const token = generateToken(user);

    successResponse(res, 201, "Registration successful", { token, user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, authProvider: "local" });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user);
    successResponse(res, 200, "Login successful", { token, user });
  } catch (error) {
    next(error);
  }
};

export const googleLoginCustomer = async (req, res, next) => {
  try {
    const { token } = req.body;

    const payload = await verifyGoogleToken(token);
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role: "customer",
        authProvider: "google"
      });
    }

    if (user.role !== "customer") {
      res.status(403);
      throw new Error("Google login allowed only for customers");
    }

    const jwtToken = generateToken(user);
    successResponse(res, 200, "Google login successful", {
      token: jwtToken,
      user
    });
  } catch (error) {
    next(error);
  }
};
