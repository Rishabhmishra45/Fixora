import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoute from "../components/common/ProtectedRoute";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ServicesList from "../pages/services/ServicesList";
import ServiceDetails from "../pages/services/ServiceDetails";
import CreateBooking from "../pages/bookings/CreateBooking";
import MyBookings from "../pages/bookings/MyBookings";
import BookingDetails from "../pages/bookings/BookingDetails";
import PaymentCheckout from "../pages/payments/PaymentCheckout";
import MyReviews from "../pages/reviews/MyReviews";
import Profile from "../pages/profile/Profile";
import Addresses from "../pages/address/Addresses";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/services"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ServicesList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/services/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ServiceDetails />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/book/service/:serviceId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CreateBooking />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/bookings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MyBookings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/bookings/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingDetails />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ✅ FIX: base payments route */}
      <Route
        path="/dashboard/payments"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Navigate to="/dashboard/bookings" replace />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/payments/:bookingId"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PaymentCheckout />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/reviews"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <MyReviews />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/addresses"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Addresses />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
