"use client";
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sentOnce, setSentOnce] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      setMessage(res.data?.message || "Reset link sent! Check your email.");
      setSentOnce(true); // mark that link was sent
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 font-sans relative overflow-hidden min-h-screen bg-white">
      <div className="p-8 rounded-xl border max-w-md w-full relative z-10 transform transition-all duration-300 hover:border-primary/50 bg-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-light mb-3 text-center tracking-tight text-gray-900">
          Recover Password
        </h1>
        <p className="text-gray-600 text-base md:text-lg mb-8 text-center leading-relaxed">
          Enter your email to receive a reset link
        </p>

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder-gray-400 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : sentOnce
              ? "Resend Link"
              : "Send Reset Link"}
          </button>
        </form>

        <p className="text-gray-600 text-center text-sm mt-6 mb-8 leading-relaxed">
          We&apos;ll send you a secure link to reset your password.
        </p>

        <div className="border-t border-gray-300 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded-md transition-colors duration-200"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
