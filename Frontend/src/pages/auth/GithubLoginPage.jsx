// src/pages/GoogleLoginPage.jsx
import React, { useEffect } from "react";

const GithubLoginPage = () => {
  useEffect(() => {
    // Redirect to backend Google OAuth
    window.location.href = "http://localhost:3000/api/auth/github";
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-700 dark:text-gray-200">Redirecting to Github...</p>
    </div>
  );
};

export default GithubLoginPage;
