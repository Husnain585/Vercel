import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Newsletter = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{ backgroundColor: themeConfig.background }}
    >
      {/* Decorative subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          style={{ color: themeConfig.textPrimary }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Stay Updated
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl mb-10"
          style={{ color: themeConfig.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Subscribe to our newsletter and be the first to know about{" "}
          <span
            className="font-semibold"
            style={{ color: themeConfig.button.primaryBg }}
          >
            exclusive deals, new arrivals, and special offers
          </span>
          .
        </motion.p>

        {/* Form */}
        <motion.form
          className="flex items-center gap-3 max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative flex-1">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: themeConfig.border }}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-xl shadow-lg outline-none transition-colors"
              style={{
                backgroundColor: themeConfig.cardBackground,
                color: themeConfig.textPrimary,
                border: `1px solid ${themeConfig.border}`,
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
            style={{
              backgroundColor: themeConfig.button.primaryBg,
              color: themeConfig.button.text,
            }}
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
