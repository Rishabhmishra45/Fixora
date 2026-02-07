import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getMyProfile,
  updateProfile,
  changePassword
} from "../../api/profileApi";
import { useToast } from "../../context/ToastContext";

const Profile = () => {
  const { showToast } = useToast();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    avatar: ""
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const loadProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data.user);
      setForm({
        name: res.data.user.name || "",
        phone: res.data.user.phone || "",
        avatar: res.data.user.avatar || ""
      });
    } catch (error) {
      showToast(error.message || "Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form);
      showToast("Profile updated successfully", "success");
      loadProfile();
    } catch (error) {
      showToast(error.message || "Profile update failed", "error");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    if (!passwords.currentPassword || !passwords.newPassword) {
      showToast("Please fill all password fields", "error");
      return;
    }

    try {
      await changePassword(passwords);
      setPasswords({
        currentPassword: "",
        newPassword: ""
      });
      showToast("Password changed successfully", "success");
    } catch (error) {
      showToast(error.message || "Password change failed", "error");
    }
  };

  if (loading) {
    return <p className="p-6">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <p className="p-6 text-red-500">
        Failed to load profile
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 space-y-8"
    >
      <h1 className="text-3xl font-bold">
        My Profile
      </h1>

      {/* PROFILE UPDATE */}
      <form
        onSubmit={submitProfile}
        className="bg-card border border-border rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          Profile Information
        </h2>

        <input
          className="w-full p-3 border border-border rounded bg-transparent"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-3 border border-border rounded bg-transparent"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          className="w-full p-3 border border-border rounded bg-transparent"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={(e) =>
            setForm({ ...form, avatar: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>

      {/* PASSWORD CHANGE */}
      <form
        onSubmit={submitPassword}
        className="bg-card border border-border rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          Change Password
        </h2>

        <input
          type="password"
          className="w-full p-3 border border-border rounded bg-transparent"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              currentPassword: e.target.value
            })
          }
        />

        <input
          type="password"
          className="w-full p-3 border border-border rounded bg-transparent"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({
              ...passwords,
              newPassword: e.target.value
            })
          }
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </motion.div>
  );
};

export default Profile;
