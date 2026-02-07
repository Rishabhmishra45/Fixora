import { motion } from "framer-motion";
import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import NotificationList from "./NotificationList";

const NotificationBell = () => {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative px-3 py-2 border border-border rounded"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-80 z-50"
        >
          <NotificationList />
        </motion.div>
      )}
    </div>
  );
};

export default NotificationBell;
