import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getServiceById } from "../../api/serviceApi";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      const res = await getServiceById(id);
      setService(res.data.service);
    };

    fetchService();
  }, [id]);

  if (!service) {
    return <p className="p-6">Loading service...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-3xl"
    >
      <h1 className="text-3xl font-bold mb-4">
        {service.name}
      </h1>

      <p className="text-secondary mb-6">
        {service.description}
      </p>

      <div className="bg-card border border-border rounded p-4">
        <p>
          <strong>Price:</strong> ₹{service.price}
        </p>
        <p>
          <strong>Category:</strong> {service.category?.name}
        </p>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;
