import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { Wrench, User, Mail, Lock, Phone, Eye, EyeOff, Sparkles } from 'lucide-react';

const Toast = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-sm pointer-events-none">
      <div
        className={`pointer-events-auto p-3 sm:p-4 rounded-xl border backdrop-blur-xl shadow-lg animate-fade-in ${
          type === "success"
            ? "bg-gradient-to-r from-green-500/15 to-emerald-500/15 border-green-500/30 text-green-600"
            : "bg-gradient-to-r from-red-500/15 to-rose-500/15 border-red-500/30 text-red-600"
        }`}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1 text-xs sm:text-sm leading-relaxed">
            {message}
          </div>
          <button
            className="text-sm opacity-70 hover:opacity-100 transition ml-2"
            onClick={onClose}
            type="button"
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  
  const { register, firebaseLogin } = useAuth();
  const navigate = useNavigate();

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim();
    
    if (!cleanName) {
      showToast("error", "Please enter your name");
      return;
    }
    if (!cleanEmail) {
      showToast("error", "Please enter your email");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      showToast("error", "Password must be at least 6 characters");
      return;
    }
    if (formData.password !== confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await register({
        name: cleanName,
        email: cleanEmail,
        password: formData.password,
        phone: formData.phone
      });
      
      if (result.success) {
        showToast("success", "Account created successfully!");
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      console.error("Registration error:", error);
      showToast("error", error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseResult = await firebaseLogin(result.user);
      if (firebaseResult.success) {
        showToast("success", "Account created with Google!");
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Google signup error:', error);
      showToast("error", "Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 text-gray-900">
      <Toast
        type={toastType}
        message={toastMsg}
        onClose={() => setToastMsg("")}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 shadow-md">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1.5">
                  Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Fixora</span>
                </h1>
                <p className="text-gray-600 text-sm">
                  Create your account to book services
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={!loading ? handleGoogleSignup : undefined}
                className={`w-full h-12 flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 mb-5 transition-all ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:border-gray-400 hover:shadow-sm active:shadow-none"
                }`}
                disabled={loading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                  draggable={false}
                />
                <span className="font-medium text-sm">
                  Sign up with Google
                </span>
              </motion.button>

              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/70"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-xs text-gray-500 font-medium">OR</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-3 text-sm rounded-lg border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-3 text-sm rounded-lg border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-3 text-sm rounded-lg border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      placeholder="+91 98765 43210"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-10 text-sm rounded-lg border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      required
                      minLength="6"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 pl-1">
                    Must be at least 6 characters
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 text-sm rounded-lg border border-gray-300 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 px-4 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                    loading
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-md active:shadow-none"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className={`text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors ${
                        loading ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      Login
                    </Link>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-3 leading-relaxed">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;