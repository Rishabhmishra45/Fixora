import Notification from "../models/Notification.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json({ notifications });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notifications" });
  }
};

export const markNotificationsRead = async (req, res) => {
  try {
    const { ids } = req.body;

    await Notification.updateMany(
      { _id: { $in: ids }, user: req.user.id },
      { read: true }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update notifications" });
  }
};
