import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
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
        <h2 className="text-2xl font-bold mb-6">Login</h2>

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

        <button className="w-full bg-primary text-white py-3 rounded mb-4">
          Login
        </button>

        <GoogleLoginButton />

        <p className="text-sm mt-4 text-center">
          New here?{" "}
          <Link to="/register" className="text-primary">
            Create account
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;
