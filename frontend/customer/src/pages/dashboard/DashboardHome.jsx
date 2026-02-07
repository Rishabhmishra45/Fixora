import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../../components/dashboard/StatCard";
import { getCustomerDashboardStats } from "../../api/dashboardApi";

const DashboardHome = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getCustomerDashboardStats();
      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="p-6">
        <p className="text-secondary">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">
          Dashboard
        </h1>
        <p className="text-secondary text-sm">
          Overview of your activity and payments
        </p>
      </div>

      {/* Stats */}
      <div className="
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
        />

        <StatCard
          title="Completed Jobs"
          value={stats.completedJobs}
        />

        <StatCard
          title="Pending Payments"
          value={
            typeof stats.pendingAmount === "number"
              ? `₹${stats.pendingAmount}`
              : "₹0"
          }
        />
      </div>
    </motion.div>
  );
};

export default DashboardHome;
