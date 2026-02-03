import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { Wrench, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const Toast = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-md pointer-events-none">
      <div
        className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-xl animate-fade-in ${
          type === "success"
            ? "bg-green-500/10 border-green-500/20 text-green-600"
            : "bg-red-500/10 border-red-500/20 text-red-600"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 text-sm leading-relaxed whitespace-pre-line">
            {message}
          </div>
          <button
            className="text-base opacity-80 hover:opacity-100 transition"
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  
  const { login, firebaseLogin } = useAuth();
  const navigate = useNavigate();

  const showToast = (type, msg) => {
    setToastType(type);
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password) {
      showToast("error", "Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(email.trim(), password);
      if (result.success) {
        showToast("success", "Login successful!");
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseResult = await firebaseLogin(result.user);
      if (firebaseResult.success) {
        showToast("success", "Google login successful!");
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (error) {
      console.error('Google login error:', error);
      showToast("error", "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900 overflow-hidden">
      <Toast
        type={toastType}
        message={toastMsg}
        onClose={() => setToastMsg("")}
      />

      <div className="min-h-[100svh] flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl mb-4"
                >
                  <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Fixora</span>
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Login to book home services instantly
                </p>
              </div>

              <button
                onClick={!loading ? handleGoogleLogin : undefined}
                className={`w-full min-h-[48px] flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 px-4 mb-4 transition ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-50 active:scale-[0.99]"
                }`}
                disabled={loading}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5"
                  draggable={false}
                />
                <span className="font-semibold text-sm sm:text-base">
                  Continue with Google
                </span>
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400 mb-4 sm:mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-xs sm:text-sm px-2">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="inline w-4 h-4 mr-1" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm sm:text-base pr-12"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] grid place-items-center rounded-lg text-gray-500 hover:text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className={`text-blue-600 text-sm font-semibold ${
                      loading
                        ? "cursor-not-allowed opacity-50"
                        : "hover:underline"
                    }`}
                  >
                    Forgot Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full min-h-[48px] px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                    loading
                      ? "bg-gray-500 cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <p className="text-center text-gray-600 text-sm mt-4">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className={`text-blue-600 font-semibold ${
                      loading
                        ? "cursor-not-allowed opacity-50"
                        : "hover:underline"
                    }`}
                  >
                    Create Account
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;