import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const categories = [
  { id: 1, name: "Electronics", image: "/public/images/nike.jpeg" },
  { id: 2, name: "Fashion", image: "/public/images/banner_img_01.jpg" },
  { id: 3, name: "Home & Living", image: "/public/images/banner_img_02.jpg" },
  { id: 4, name: "Sports", image: "/public/images/banner_img_03.jpg" },
];

const FeaturedCategories = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: themeConfig.background }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-14"
          style={{ color: themeConfig.textPrimary }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Discover Categories
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group relative block rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{
                  border: `1px solid ${themeConfig.border}`,
                  backgroundColor: themeConfig.cardBackground,
                }}
              >
                {/* Background Image */}
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: themeConfig.textPrimary }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: themeConfig.textSecondary }}
                    >
                      Shop the latest {cat.name} products
                    </p>
                  </motion.div>
                </div>

                {/* Floating Tag (like Hero’s floating card) */}
                <motion.div
                  className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-md text-xs font-semibold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  style={{ color: themeConfig.button.primaryBg }}
                >
                  Trending
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
