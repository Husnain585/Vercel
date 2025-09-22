"use client";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import config from "../../config/config";

// --- Icons ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <circle cx="12" cy="16" r="1"></circle>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5"></path>
    <path d="m12 19-7-7 7-7"></path>
  </svg>
);

// --- Social Icons ---
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 533.5 544.3"
    className="w-5 h-5"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.6-1.6-34.7-4.7-51.2H272v96.8h147.1c-6.3 34.2-25 63.1-53.2 82.4v68.4h85.9c50.3-46.3 79.7-114.8 79.7-196.4z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.5 0 133.2-23.9 177.6-64.9l-85.9-68.4c-23.8 15.9-54.4 25.2-91.7 25.2-70.7 0-130.5-47.7-152-111.6H33.5v69.8C77.9 489.8 168.8 544.3 272 544.3z"
    />
    <path
      fill="#FBBC05"
      d="M120 326.4c-10.8-31.5-10.8-65.6 0-97.1V159.5H33.5c-36.2 70.2-36.2 154.4 0 224.6L120 326.4z"
    />
    <path
      fill="#EA4335"
      d="M272 107.6c38.9-.6 75.4 14.1 103.5 40.7l77.6-77.6C405 24.9 344.3 0 272 0 168.8 0 77.9 54.5 33.5 159.5l86.5 69.8c21.5-63.9 81.3-111.7 152-111.7z"
    />
  </svg>
);

const AppleIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
    className="w-5 h-5"
    alt="Apple"
  />
);
const GitHubIcon = () => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
    className="w-5 h-5"
    alt="GitHub"
  />
);

// --- Main Component ---
const Register = () => {
  const { setUser, setToken } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // --- Handlers ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      if (!form.name) errs.name = "Name is required";
      if (!form.username) errs.username = "Username is required";
    }
    if (step === 2) {
      if (!form.email) errs.email = "Email is required";
      if (!form.password) errs.password = "Password is required";
      if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Passwords do not match";
    }
    return errs;
  };

  const handleNext = () => {
    const errs = validateStep();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(step + 1);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = { ...validateStep() };
  setErrors(errs);
  if (Object.keys(errs).length > 0) return;

  try {
    setIsLoading(true);
    const res = await axios.post(`${config.apiBaseUrl}/auth/register`, form);

    if (res.data?.message) {
      // ✅ show message and redirect to "Check your email" page
      alert(res.data.message);
      navigate("/check-email"); 
    }
  } catch (err) {
    setErrors({ api: err.response?.data?.error || "Registration failed" });
  } finally {
    setIsLoading(false);
  }
};


  // --- Styles Injection ---
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .signin-input:focus { box-shadow: 0 0 0 2px rgba(0,0,0,0.1); }
      .signin-button:hover { transform: translateY(-1px); }
      .signin-progress { transition: width 0.5s cubic-bezier(0.4,0,0.2,1); }
      .signin-step { animation: slideIn 0.3s ease-out; }
      @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-white">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-900">
              Step {step} of 3
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((step / 3) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="signin-progress bg-gray-900 h-2 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
              <UserIcon />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Create account
            </h1>
            <p className="text-sm text-gray-600">
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Now, set up your credentials"}
              {step === 3 && "Almost done! Review your details"}
            </p>
          </div>

          {errors.api && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-4">
              {errors.api}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Name + Username */}
            {step === 1 && (
              <div className="signin-step space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="signin-input w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    {form.name && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="signin-input w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  {errors.username && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!form.name || !form.username}
                  className="signin-button w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Next Step <ArrowRightIcon />
                </button>
              </div>
            )}

            {/* Step 2: Email + Password + Confirm */}
            {step === 2 && (
              <div className="signin-step space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                      <MailIcon />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="signin-input w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                      <LockIcon />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="signin-input w-full pl-9 pr-10 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="signin-input w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !form.email || !form.password || !form.confirmPassword
                  }
                  className="signin-button w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Next Step <ArrowRightIcon />
                </button>
              </div>
            )}

            {/* Step 3: Review + Submit */}
            {step === 3 && (
              <div className="signin-step space-y-4">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <CheckIcon />
                    Review Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium text-gray-900">
                        {form.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Username:</span>
                      <span className="font-medium text-gray-900">
                        {form.username}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">
                        {form.email}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-600">Password:</span>
                      <span className="font-medium text-gray-900">
                        ••••••••
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="signin-button w-full bg-gray-900 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>
            )}
          </form>

          {/* Back Button */}
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon /> Back
            </button>
          )}

          {/* Social Buttons */}
          <div className="mt-6 space-y-2">
            <button className="w-full py-2 px-4 border cursor-pointer border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <AppleIcon />
              <span>Sign in with Apple</span>
            </button>
            <button className="w-full py-2 px-4 border cursor-pointer border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>
            <button className="w-full py-2 px-4 border cursor-pointer  border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
              <GitHubIcon />
              <span>Sign in with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
