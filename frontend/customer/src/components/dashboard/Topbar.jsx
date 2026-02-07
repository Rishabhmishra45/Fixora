import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import NotificationBell from "../notification/NotificationBell";

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 bg-card border-b border-border flex items-center px-4 md:px-6 sticky top-0 z-20"
    >
      {/* Mobile menu */}
      <button
        onClick={toggleSidebar}
        className="md:hidden mr-3 px-3 py-2 border border-border rounded"
      >
        ☰
      </button>

      <div className="ml-auto flex items-center gap-4">
        <NotificationBell />

        <select
          onChange={(e) => toggleTheme(e.target.value)}
          className="bg-transparent border border-border rounded px-2 py-1 text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="midnight">Midnight</option>
        </select>

        <span className="hidden sm:block text-sm font-medium">
          {user?.name}
        </span>

        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-primary text-white rounded"
        >
          Logout
        </button>
      </div>
    </motion.header>
  );
};

export default Topbar;
