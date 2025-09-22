import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      success: { style: { background: "#4ade80", color: "#fff" } },
      error: { style: { background: "#f87171", color: "#fff" } },
    }}
  />
);

export default ToastProvider;