import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../hooks/useCart";

const ProductQuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose} // close on overlay click
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-xl w-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // prevent close on content click
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-200 font-bold text-xl"
            >
              &times;
            </button>

            <img
              src={product.images?.[0]?.url || "https://picsum.photos/400/400"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 text-xl font-semibold mb-2">
              ${product.price}
            </p>
            <p className="mb-4">{product.description}</p>
            <p className={`mb-4 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <button
              onClick={() => addToCart(product, 1)}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Add to Cart
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickViewModal;
