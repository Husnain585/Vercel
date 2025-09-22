// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";

const Profile = () => {
  const { user, updateUser, deleteUser, changePassword, fetchUser } = useUser();

  // Local form states
  const [profileForm, setProfileForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) setProfileForm({ name: user.name || "", email: user.email || "" });
  }, [user]);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    try {
      await updateUser(profileForm);
      alert("Profile updated successfully!");
      fetchUser(); // refresh user data
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoadingProfile(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    setLoadingPassword(true);
    try {
      await changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
      alert("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to change password.");
    } finally {
      setLoadingPassword(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      await deleteUser();
      alert("Account deleted successfully!");
      // Optionally redirect to login page
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Failed to delete account.");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">My Profile</h1>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="space-y-4 border p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <input
          type="text"
          placeholder="Name"
          value={profileForm.name}
          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={profileForm.email}
          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loadingProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingProfile ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="space-y-4 border p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={passwordForm.currentPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={passwordForm.confirmPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={loadingPassword}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loadingPassword ? "Updating..." : "Change Password"}
        </button>
      </form>

      {/* Delete Account */}
      <div className="border p-6 rounded shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
        <p className="text-gray-600 mb-4">This action is irreversible.</p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
