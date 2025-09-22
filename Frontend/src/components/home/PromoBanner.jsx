import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const PromoBanner = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="max-w-vw mx-auto px-6 py-20 grid md:grid-cols-2 gap-8"
      style={{ backgroundColor: themeConfig.background }}
    >
      {/* Electronics Promo */}
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-xl group"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image */}
        <img
          src="/public/images/banner_img_01.jpg"
          alt="Electronics Sale"
          className="absolute inset-0 w-full h-full object-bottom group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        {/* Floating Badge */}
        <div
          className="absolute top-5 left-5 px-4 py-1 rounded-full text-sm font-semibold shadow-md"
          style={{
            backgroundColor: themeConfig.button.primaryBg,
            color: themeConfig.button.primaryText,
          }}
        >
          🔥 Hot Deal
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-10">
          <h3
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: themeConfig.textPrimary }}
          >
            50% Off Electronics
          </h3>
          <p
            className="mb-6 text-lg"
            style={{ color: themeConfig.textSecondary }}
          >
            Grab the latest gadgets at unbeatable prices!
          </p>
          <Link
            to="/products?category=electronics"
            className="px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
            style={{
              backgroundColor: themeConfig.button.primaryBg,
              color: themeConfig.button.primaryText,
            }}
          >
            Shop Now
          </Link>
        </div>
      </motion.div>

      {/* Fashion Promo */}
      <motion.div
        className="relative rounded-3xl overflow-hidden shadow-xl group"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Background Image */}
        <img
          src="/public/images/nike.jpeg"
          alt="Fashion Promo"
          className="absolute inset-0 w-full h-full object-bottom group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

        {/* Floating Badge */}
        <div
          className="absolute top-5 left-5 px-4 py-1 rounded-full text-sm font-semibold shadow-md"
          style={{
            backgroundColor: themeConfig.button.secondaryBg,
            color: themeConfig.button.secondaryText,
          }}
        >
          ✨ Just In
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-10">
          <h3
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: themeConfig.textPrimary }}
          >
            New Arrivals
          </h3>
          <p
            className="mb-6 text-lg"
            style={{ color: themeConfig.textSecondary }}
          >
            Fresh styles just dropped in our fashion store.
          </p>
          <Link
            to="/products?category=fashion"
            className="px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300"
            style={{
              backgroundColor: themeConfig.button.secondaryBg,
              color: themeConfig.button.secondaryText,
            }}
          >
            Explore
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default PromoBanner;
