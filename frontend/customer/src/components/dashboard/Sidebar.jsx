import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "My Bookings", to: "/dashboard/bookings" },
  { name: "Profile", to: "/dashboard/profile" }
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* MOBILE: animated | DESKTOP: static */}
      <motion.aside
        initial={false}
        animate={isOpen ? { x: 0 } : { x: "-100%" }}
        transition={{ duration: 0.25 }}
        className="
          fixed md:static
          inset-y-0 left-0
          w-64
          bg-card border-r border-border
          z-40

          md:translate-x-0
        "
      >
        <div className="px-6 py-5 text-2xl font-bold text-primary">
          Fixora
        </div>

        <nav className="px-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-secondary hover:bg-border"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
