import { useNotifications } from "../../context/NotificationContext";

const NotificationList = () => {
  const { notifications, markAllRead } =
    useNotifications();

  return (
    <div className="bg-card border border-border rounded-lg shadow">
      <div className="flex justify-between items-center p-3 border-b border-border">
        <p className="font-semibold">Notifications</p>
        <button
          onClick={markAllRead}
          className="text-sm text-primary"
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 && (
          <p className="p-4 text-secondary text-sm">
            No notifications
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-3 border-b border-border text-sm ${
              n.read ? "opacity-60" : "bg-border/30"
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
