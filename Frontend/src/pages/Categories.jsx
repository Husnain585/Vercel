import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {useTheme} from "../context/ThemeContext";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const {themeConfig} = useTheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/category");
        setCategories(res.data.categories || res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading categories...</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No categories found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-20 px-4 py-10 max-w-dvw max-h-dvw"
      style={{backgroundColor: themeConfig.background}}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Shop by Category
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.categoryId || index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden border border-gray-100"
          >
            <Link to={`/category/${cat.categoryId}`} className="block">
              <div className="relative">
                <img
                  src={
                    cat.imageUrl ||
                    `https://picsum.photos/seed/${cat.categoryId}/400/300`
                  }
                  alt={cat.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <span className="text-white font-semibold text-lg">
                    View Products
                  </span>
                </div>
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800">{cat.name}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Categories;
