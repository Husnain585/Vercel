import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import useProducts from "../hooks/useProducts";
import axios from "axios";
import config from "../config/config";

const ProductDetails = () => {
  const { productId } = useParams(); // from route
  const { addToCart } = useContext(GlobalContext);
  const { loading, getProductById, getProductByIdFromApi } = useProducts();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  // Fetch product from local state or API if not found
  useEffect(() => {
    const fetchProduct = async () => {
      let p = getProductById(productId);
      if (!p) {
        p = await getProductByIdFromApi(productId);
      }
      setProduct(p || null);
    };
    fetchProduct();
  }, [productId, getProductById, getProductByIdFromApi]);

  // Fetch product images separately
  useEffect(() => {
    const fetchImages = async () => {
      if (!productId) return;
      try {
        setLoadingImages(true);
        const res = await axios.get(
          `${config.apiBaseUrl}/product-image/${productId}`
        );
        console.log(res.data)
        setImages(res.data.images || []);
      } catch (err) {
        console.error("Failed to fetch product images", err);
        setImages([]);
      } finally {
        setLoadingImages(false);
      }
    };
    fetchImages();
  }, [productId]);

  if (loading || !product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id || product.productId,
      name: product.name,
      price: product.price,
      image: images?.[0]?.imageUrl || "",
      quantity: 1,
    });
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
        <div className="md:w-1/2 flex flex-col gap-4">
          {loadingImages ? (
            <p>Loading images...</p>
          ) : images.length > 0 ? (
            images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.imageUrl}
                alt={img.altText || product.name}
                className="w-full h-64 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
              />
            ))
          ) : (
            <img
              src="https://via.placeholder.com/400x300"
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              ${product.price ?? "N/A"}
            </p>
            <p className="mb-4">{product.description || "No description."}</p>
            <p className="text-sm text-gray-500 mb-6">
              Category: {product.category?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-400">
              Product ID: <strong>{productId}</strong>
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
