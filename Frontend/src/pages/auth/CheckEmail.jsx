import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Something went wrong, try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Verify your email 📧
        </h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code we sent to your email.
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border rounded-md px-3 py-2 mb-4 text-center text-lg tracking-widest"
        />

        <button
          onClick={handleVerify}
          className="bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium w-full"
        >
          Verify
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CheckEmail;
