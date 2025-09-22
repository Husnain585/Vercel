import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button.jsx/Button";

const Hero = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: themeConfig.background }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{
              backgroundColor: themeConfig.button.secondaryBg,
              color: themeConfig.button.secondaryText,
            }}
          >
            New Arrivals 2025
          </span>

          <h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: themeConfig.textPrimary }}
          >
            Upgrade Your{" "}
            <span style={{ color: themeConfig.button.primaryBg }}>Lifestyle</span>
            <br />
            with Smart Shopping
          </h1>

          <p
            className="text-lg md:text-xl max-w-xl mb-8"
            style={{ color: themeConfig.textSecondary }}
          >
            Explore trending products from top brands. Enjoy exclusive discounts,
            fast shipping, and an experience tailored for you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" to="/products">
              Shop Now
            </Button>
            <Button variant="secondary" size="lg" outline to="/categories">
              Browse Categories
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="relative hidden md:flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${themeConfig.border}` }}
          >
            <img
              src="/public/images/nike.jpeg"
              alt="Hero Banner"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>

          {/* Floating Card */}
          <motion.div
            className="absolute -bottom-8 -left-6 rounded-2xl shadow-lg p-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              backgroundColor: themeConfig.cardBackground,
              border: `1px solid ${themeConfig.border}`,
            }}
          >
            <img
              src="/public/images/nike.jpeg"
              alt="Trending product"
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <p
                className="font-semibold"
                style={{ color: themeConfig.textPrimary }}
              >
                Trending: Smartwatch
              </p>
              <p
                className="text-sm"
                style={{ color: themeConfig.textSecondary }}
              >
                Starting from $199
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
