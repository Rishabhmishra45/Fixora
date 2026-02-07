import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password"
    );

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, avatar } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Current password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password change failed" });
  }
};
