import { createContext, useContext, useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationsRead
} from "../api/notificationApi";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    const res = await getMyNotifications();
    const list = res.data.notifications || [];
    setNotifications(list);
    setUnreadCount(list.filter((n) => !n.read).length);
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000); // 15s polling
    return () => clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    const unreadIds = notifications
      .filter((n) => !n.read)
      .map((n) => n._id);

    if (unreadIds.length === 0) return;

    await markNotificationsRead(unreadIds);
    loadNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);
