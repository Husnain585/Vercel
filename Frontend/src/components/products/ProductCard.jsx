import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartPlus,
  faStar,
  faStarHalfStroke,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import { formatCurrency } from "../../utils/format";
import { motion, AnimatePresence } from "framer-motion";

const Stars = ({ rating = 0 }) => {
  const safeRating = Number(rating) || 0;
  const full = Math.floor(safeRating);
  const half = safeRating - full >= 0.5;
  const blanks = 5 - full - (half ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FontAwesomeIcon
          key={`f${i}`}
          icon={faStar}
          className="text-yellow-400 drop-shadow-sm"
        />
      ))}
      {half && (
        <FontAwesomeIcon
          icon={faStarHalfStroke}
          className="text-yellow-400 drop-shadow-sm"
        />
      )}
      {Array.from({ length: blanks }).map((_, i) => (
        <span
          key={`b${i}`}
          className="w-3 h-3 rounded-sm bg-gray-200 inline-block"
        />
      ))}
      <span className="ml-2 text-sm text-gray-500">
        {safeRating.toFixed(1)}/5
      </span>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const liked = isInWishlist(product.productId);
  const discounted =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discounted
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const getImageSrc = (img, fallbackSeed) => {
    if (img?.data) return img.data;
    return `https://picsum.photos/600/600?random=${fallbackSeed}`;
  };

  const images = product.images?.length
    ? product.images.map((img, i) =>
        getImageSrc(img, `${product.productId}-${i}`)
      )
    : [getImageSrc(null, product.productId || index)];

  const image = images[currentImage] || images[0];

  const handleWishlistClick = () => toggleWishlist(product);
  const handleAddToCart = () => addToCart(product, 1);

  return (
    <>
      <motion.div
        layout
        whileHover={{ y: -4 }}
        className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl border border-gray-100 overflow-hidden transition"
      >
        {discounted && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
            -{discountPercent}%
          </span>
        )}

        <div className="relative">
          <img
            src={image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-2xl"
          />

          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-700/80 backdrop-blur px-2 py-2 rounded-full shadow hover:scale-110 transition"
            aria-label="Toggle wishlist"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={liked ? "text-red-500 animate-pulse" : "text-gray-700"}
            />
          </button>

          {/* Dot indicators for multiple images */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === currentImage ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {product.category?.name || "General"}
          </p>
          <h3 className="font-semibold mt-1 line-clamp-1 text-gray-900 dark:text-white">
            {product.name}
          </h3>

          <Stars rating={product.rating} />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(product.price)}
            </span>
            {discounted && (
              <span className="line-through text-gray-400 text-sm">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p
            className={`mt-1 inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-4 flex gap-2 flex-wrap">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${
                product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCartPlus} />
              {product.stock === 0 ? "Unavailable" : "Add to Cart"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Quick View
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-4xl w-full relative p-6"
            >
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Carousel */}
                <div className="relative">
                  <img
                    src={images[currentImage]}
                    alt={product.name}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (prev) =>
                              (prev - 1 + images.length) % images.length
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImage((prev) => (prev + 1) % images.length)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </>
                  )}
                </div>

                {/* Product Details */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h2>
                  <Stars rating={product.rating} />
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {product.description || "No description available."}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatCurrency(product.price)}
                    </span>
                    {discounted && (
                      <span className="line-through text-gray-400 text-lg">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-3 inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                      product.stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={`flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition ${
                        product.stock === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={faCartPlus} />
                      {product.stock === 0 ? "Unavailable" : "Add to Cart"}
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWishlistClick}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={liked ? "text-red-500" : "text-gray-700"}
                      />
                      {liked ? "Remove Wishlist" : "Add Wishlist"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
