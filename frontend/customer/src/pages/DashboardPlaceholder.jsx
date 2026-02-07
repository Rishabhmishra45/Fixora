import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.name}
      </h1>
      <p className="text-secondary mb-6">
        Dashboard UI will be loaded in Module 2
      </p>
      <button
        onClick={logout}
        className="px-6 py-2 rounded bg-primary text-white"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default DashboardPlaceholder;
