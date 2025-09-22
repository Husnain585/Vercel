"use client";

import React from "react";
import { motion } from "framer-motion";

// SectionDivider with optional label in the center
const SectionDivider = ({ label, color, thickness = 1 }) => {
  const lineStyle = {
    borderTopWidth: `${thickness}px`,
    borderColor: color || "#13131d",
  };

  return (
    <div className="flex items-center w-full my-16">
      <div className="flex-grow border-t border-solid" style={lineStyle}></div>
      {label && (
        <span className="flex items-center px-4 text-sm text-zinc-500 font-medium">
          {label}
        </span>
      )}
      <div className="flex-grow border-t border-solid" style={lineStyle}></div>
    </div>
  );
};

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          About <span className="text-gray-800">MyShop</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Your trusted online destination for the latest products, unbeatable
          deals, and a seamless shopping experience.
        </p>
      </motion.div>

      <SectionDivider label="Our Story" />

      {/* Our Story */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row gap-10 items-center mb-20"
      >
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Our Store"
          className="rounded-2xl shadow-lg w-full md:w-1/2"
        />
        <div className="md:w-1/2 text-left">
          <p className="text-gray-600 leading-relaxed mb-4">
            We started MyShop with one mission: to bring premium quality
            products closer to you at the best prices. From fashion to
            electronics, we’ve built a platform where trust meets convenience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our journey began with a small team passionate about making shopping
            simple, stylish, and reliable — and today, we proudly serve
            thousands of happy customers worldwide.
          </p>
        </div>
      </motion.div>

      <SectionDivider label="Why Choose Us" />

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "🚚 Fast Delivery",
              desc: "Get your orders delivered quickly and safely with our trusted partners.",
            },
            {
              title: "💳 Secure Payments",
              desc: "Shop with confidence using our encrypted and trusted payment systems.",
            },
            {
              title: "⭐ Premium Quality",
              desc: "We ensure that every product meets our strict quality standards.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SectionDivider label="Our Stats" />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-4 gap-8 text-center mb-20"
      >
        {[
          { value: "10K+", label: "Happy Customers" },
          { value: "5K+", label: "Products Sold" },
          { value: "99%", label: "Positive Reviews" },
          { value: "24/7", label: "Support" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-blue-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="text-3xl font-extrabold text-blue-600 mb-2">
              {stat.value}
            </h3>
            <p className="text-gray-600 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <SectionDivider label="Join Us" />

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl p-10 text-center shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Join the MyShop Family</h2>
        <p className="mb-6 text-lg">
          Discover amazing deals, top-quality products, and a shopping
          experience designed for you.
        </p>
        <a
          href="/products"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Start Shopping
        </a>
      </motion.div>

    </div>
  );
};

export default About;
