import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-card border border-border p-8 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>

        <input
          className="w-full mb-4 p-3 border border-border rounded bg-transparent"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full mb-4 p-3 border border-border rounded bg-transparent"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border border-border rounded bg-transparent"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-primary text-white py-3 rounded">
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Register;
