import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { NotificationProvider } from "./context/NotificationContext";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <NotificationProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </ToastProvider>
    </NotificationProvider>
  );
};

export default App;
