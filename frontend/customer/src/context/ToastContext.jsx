import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext();

const ToastContainer = ({ toasts }) => {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`px-4 py-3 rounded-lg shadow-xl text-white text-sm font-medium
              ${
                toast.type === "success"
                  ? "bg-green-600"
                  : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-gray-800"
              }`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
