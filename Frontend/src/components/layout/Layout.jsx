import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ToastProvider from "../ui/ToastProvider";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-10">{children}</main>
      <Footer />
      <ToastProvider />
    </>
  );
};

export default Layout;
