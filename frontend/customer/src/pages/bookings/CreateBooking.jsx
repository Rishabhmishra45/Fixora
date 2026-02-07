import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../../api/bookingApi";

const CreateBooking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    date: "",
    time: "",
    notes: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    await createBooking({
      serviceId,
      ...form
    });

    navigate("/dashboard/bookings");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-6">
        Book Service
      </h1>

      <form
        onSubmit={submit}
        className="bg-card border border-border rounded-lg p-6 space-y-4"
      >
        <textarea
          required
          placeholder="Service address"
          className="w-full p-3 border border-border rounded bg-transparent"
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          type="date"
          required
          className="w-full p-3 border border-border rounded bg-transparent"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <input
          type="time"
          required
          className="w-full p-3 border border-border rounded bg-transparent"
          onChange={(e) =>
            setForm({ ...form, time: e.target.value })
          }
        />

        <textarea
          placeholder="Additional notes (optional)"
          className="w-full p-3 border border-border rounded bg-transparent"
          onChange={(e) =>
            setForm({ ...form, notes: e.target.value })
          }
        />

        <button className="w-full bg-primary text-white py-3 rounded">
          Confirm Booking
        </button>
      </form>
    </motion.div>
  );
};

export default CreateBooking;
