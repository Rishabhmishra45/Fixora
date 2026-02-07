import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllServices } from "../../api/serviceApi";
import { Link } from "react-router-dom";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        setServices(res.data.services);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p className="p-6">Loading services...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold mb-6">
        Available Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service._id}
            whileHover={{ scale: 1.03 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-2">
              {service.name}
            </h3>

            <p className="text-sm text-secondary mb-4">
              {service.description}
            </p>

            <Link
              to={`/dashboard/services/${service._id}`}
              className="text-primary text-sm font-medium"
            >
              View Details →
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ServicesList;
