// src/components/categoryProduct/CategoryProducts.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlobalContext } from "../../context/GlobalContext";
import axiosInstance from "../../utils/axiosInstance";

const placeholderImg = "https://picsum.photos/400/300";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const { addToCart } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products and filter by categoryId
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/product");
        const allProducts = res.data.products || res.data;
        const filtered = allProducts.filter(
          (p) => String(p.categoryId) === String(categoryId)
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = (product) => {
    const image =
      product.images?.length > 0
        ? product.images[0].data
        : `${placeholderImg}?random=${product.productId}`;

    addToCart({
      id: product.productId,
      name: product.name,
      price: product.price,
      image,
      quantity: 1,
    });
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (!products.length)
    return (
      <p className="text-center mt-10">
        No products found in this category.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        Products in this Category
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const image =
            product.images?.length > 0
              ? product.images[0].data
              : `${placeholderImg}?random=${product.productId}`;

          return (
            <motion.div
              key={product.productId}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <Link
                  to={`/product/${product.productId}`}
                  className="text-lg font-semibold hover:text-blue-600 mb-2"
                >
                  {product.name}
                </Link>
                <p className="text-gray-600 mb-4">
                  ${product.price ?? "N/A"}
                </p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CategoryProducts;
