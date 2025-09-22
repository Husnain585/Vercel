// src/pages/Wishlist.jsx
import React from "react";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mt-10 text-center">
        <FontAwesomeIcon icon={faHeart} className="text-red-400 text-5xl mb-4" />
        <h1 className="text-3xl font-bold mb-3">Your Wishlist</h1>
        <p className="text-gray-500">You haven’t added any products yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishlist.map((item, index) => (
          <motion.div
            key={item.id || index}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={
                  item.images?.[0]?.imageUrl ||
                  `https://picsum.photos/seed/${item.id}/400/300`
                }
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 bg-white/90 px-2 py-2 rounded-full shadow hover:bg-red-100 transition"
                title="Remove from wishlist"
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </button>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold line-clamp-1">
                {item.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 mb-4">
                ${item.price ?? 0}
              </p>

              <button
                onClick={() => addToCart(item, 1)}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faCartPlus} />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
