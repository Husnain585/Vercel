import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import Button from "../ui/Button.jsx/Button";

const products = [
  { id: 1, name: "Smartphone", price: "$499", image: "/public/images/banner_img_01.jpg" },
  { id: 2, name: "Headphones", price: "$199", image: "/public/images/banner_img_02.jpg" },
  { id: 3, name: "Sneakers", price: "$129", image: "/public/images/nike.jpeg" },
  { id: 4, name: "Coffee Maker", price: "$89", image: "/public/images/Coins.png" },
];

const FeaturedProducts = () => {
  const { themeConfig } = useTheme();

  return (
    <section
      className="relative w-full"
      style={{ backgroundColor: themeConfig.background }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Section Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-center mb-14"
          style={{ color: themeConfig.textPrimary }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Featured Products
        </motion.h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{
                backgroundColor: themeConfig.cardBackground,
                border: `1px solid ${themeConfig.border}`,
              }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                />

                {/* Floating Price Badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full shadow-md text-sm font-semibold"
                  style={{ color: themeConfig.button.primaryBg }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {product.price}
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="p-5 text-center">
                <h3
                  className="font-semibold text-lg md:text-xl truncate transition-colors duration-500"
                  style={{ color: themeConfig.textPrimary }}
                >
                  {product.name}
                </h3>

                {/* CTA Button */}
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    to={`/product/${product.id}`}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
