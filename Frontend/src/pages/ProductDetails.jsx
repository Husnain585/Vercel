import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {Pagination, Navigation} from  "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { GlobalContext } from "../context/GlobalContext";
import { formatCurrency } from "../utils/format";
import axios from "axios";
import config from "../config/config";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const ProductDetails = () => {
  const { productId } = useParams();
  const productsHook = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useContext(GlobalContext);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [adding, setAdding] = useState(false);

  const isInWishlist = product && wishlist.some((item) => item.id === product.id);

  // Fetch product details
  useEffect(() => {
    if (!productId) return;
    const p = productsHook.getProductById(productId);
    setProduct(p || null);
  }, [productId, productsHook]);

  // Fetch product images
  useEffect(() => {
    const fetchImages = async () => {
      if (!productId) return;
      try {
        setLoadingImages(true);
        const res = await axios.get(`${config.apiBaseUrl}/product-image/${productId}`);
        setImages(res.data.images || []);
      } catch (err) {
        console.error(err);
        setImages([]);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImages();
  }, [productId]);

  if (productsHook.loading || !product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product, 1);
    } catch (err) {
      console.error("Failed to add to cart", err);
    } finally {
      setAdding(false);
    }
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          {loadingImages ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            <Swiper
            modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-lg"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img.url || img.imageUrl}
                    alt={img.id || product.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src="https://via.placeholder.com/400x400"
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* Price & Discount */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xl text-blue-600 font-semibold">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-red-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Stock */}
            <p
              className={`mb-4 font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </p>

            <p className="mb-4">{product.description || "No description available."}</p>
            <p className="text-sm text-gray-500 mb-2">
              Category: <em>{product.category?.name || "N/A"}</em>
            </p>
            <p className="text-sm text-gray-400">Product ID: <strong>{productId}</strong></p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={adding || product.stock <= 0}
              className={`bg-blue-600 text-white py-3 px-6 rounded-lg transition font-semibold hover:bg-blue-700 ${
                adding || product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
              className={`py-3 px-6 rounded-lg transition font-semibold ${
                isInWishlist
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
