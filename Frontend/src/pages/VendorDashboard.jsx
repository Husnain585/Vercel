// src/pages/VendorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const placeholderImg = "https://source.unsplash.com/400x300/?product";
const ITEMS_PER_PAGE = 6;

const VendorDashboard = () => {
  const {
    user,
    loadingUser,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    categories,
  } = useGlobalContext();

  const [vendorProducts, setVendorProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    contactEmail: "",
    contactPhone: "",
    status: "active",
    categoryId: "",
    images: [],
  });
  const [editingProduct, setEditingProduct] = useState(null); // product being edited
  const [editingPreviewImages, setEditingPreviewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [error, setError] = useState(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Redirect unauthorized users
  useEffect(() => {
    if (!loadingUser) {
      if (!user) navigate("/login");
      else if (user.role?.toLowerCase() !== "vendor") navigate("/");
    }
  }, [user, loadingUser, navigate]);

  // Filter vendor products
  useEffect(() => {
    if (products?.length && user?.vendorId) {
      const filtered = products.filter((p) => p.vendorId === user.vendorId);
      setVendorProducts(filtered);
      const indexes = {};
      filtered.forEach((p) => (indexes[p.productId] = 0));
      setCarouselIndexes(indexes);
    }
  }, [products, user]);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndexes((prev) => {
        const updated = { ...prev };
        vendorProducts.forEach((p) => {
          const length = p.images?.length || 1;
          updated[p.productId] = (prev[p.productId] + 1) % length;
        });
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [vendorProducts]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({ ...prev, images: files }));
    setPreviewImages(files.map((f) => URL.createObjectURL(f)));
  };

  // Carousel navigation
  const nextImage = (productId, length) =>
    setCarouselIndexes((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % length,
    }));

  const prevImage = (productId, length) =>
    setCarouselIndexes((prev) => ({
      ...prev,
      [productId]: (prev[productId] - 1 + length) % length,
    }));

  // Create product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.categoryId ||
      !newProduct.contactEmail ||
      !newProduct.contactPhone
    ) {
      setError("All required fields must be filled.");
      return;
    }
    try {
      setLoadingCreate(true);
      const formData = new FormData();
      Object.entries(newProduct).forEach(([key, value]) => {
        if (key === "images")
          value.forEach((file) => formData.append("images", file));
        else formData.append(key, value);
      });
      formData.append("vendorId", user.vendorId);

      const product = await createProduct(formData);
      setVendorProducts((prev) => [...prev, product]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        contactEmail: "",
        contactPhone: "",
        status: "active",
        categoryId: "",
        images: [],
      });
      setPreviewImages([]);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Failed to create product"
      );
    } finally {
      setLoadingCreate(false);
    }
  };

  // Update product
  const handleUpdateProduct = async (productId, updatedData) => {
    try {
      setLoadingUpdate(true);
      const formData = new FormData();
      ["name", "description", "price", "stock", "categoryId", "status"].forEach(
        (key) => {
          formData.append(key, updatedData[key]);
        }
      );
      if (updatedData.newImages?.length) {
        updatedData.newImages.forEach((file) =>
          formData.append("images", file)
        );
      }

      const updated = await updateProduct(productId, formData);
      setVendorProducts((prev) =>
        prev.map((p) => (p.productId === productId ? updated : p))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(productId);
      setVendorProducts((prev) =>
        prev.filter((p) => p.productId !== productId)
      );
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loadingUser) return <p className="text-gray-800">Loading...</p>;

  const totalPages = Math.ceil(vendorProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = vendorProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-center">Vendor Dashboard</h1>

      {/* Product Creation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto mb-10"
      >
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleCreateProduct}>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="contactEmail"
            value={newProduct.contactEmail}
            onChange={handleChange}
            placeholder="Contact Email"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="contactPhone"
            value={newProduct.contactPhone}
            onChange={handleChange}
            placeholder="Contact Phone"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                className="h-20 w-20 object-cover rounded border"
              />
            ))}
          </div>

          <select
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            value={newProduct.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="submit"
            disabled={loadingCreate}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {loadingCreate ? "Creating..." : "Add Product"}
          </button>
        </form>
      </motion.div>

      {/* Vendor Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-12">
            No products yet.
          </p>
        )}
        {paginatedProducts.map((product, i) => {
          const images = product.images?.length
            ? product.images
            : [{ data: placeholderImg }];
          const index = carouselIndexes[product.productId] || 0;

          return (
            <motion.div
              key={product.productId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg relative"
            >
              {/* Carousel */}
              <div className="relative overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.data}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-48 object-cover flex-shrink-0 rounded-lg"
                    />
                  ))}
                </div>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        prevImage(product.productId, images.length)
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full"
                    >
                      &#8592;
                    </button>
                    <button
                      onClick={() =>
                        nextImage(product.productId, images.length)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full"
                    >
                      &#8594;
                    </button>
                  </>
                )}
              </div>

              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-purple-600 font-bold mt-1">${product.price}</p>
              <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
              <p className="text-gray-500 text-sm">
                Email: {product.contactEmail}
              </p>
              <p className="text-gray-500 text-sm">
                Phone: {product.contactPhone}
              </p>
              <p
                className={`text-sm font-semibold mt-1 ${
                  product.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {product.status}
              </p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleUpdateProduct(product.productId)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:opacity-90"
                >
                  {loadingUpdate ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setEditingPreviewImages(
                      product.images?.map((img) => img.data) || []
                    );
                  }}
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:opacity-90"
                >
                  Edit
                </button>
                {editingProduct && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      />
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      />
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      />
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            stock: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      />
                      <select
                        value={editingProduct.categoryId}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            categoryId: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      >
                        {categories.map((cat) => (
                          <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={editingProduct.status}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            status: e.target.value,
                          })
                        }
                        className="w-full border p-2 rounded mb-2"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          setEditingProduct({
                            ...editingProduct,
                            newImages: files,
                          });
                          setEditingPreviewImages(
                            files.map((f) => URL.createObjectURL(f))
                          );
                        }}
                        className="w-full border p-2 rounded mb-2"
                      />

                      <div className="flex flex-wrap gap-2 mb-4">
                        {editingPreviewImages.map((src, idx) => (
                          <img
                            key={idx}
                            src={src}
                            className="h-20 w-20 object-cover rounded border"
                            alt={`preview ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="px-4 py-2 rounded bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={async () => {
                            await handleUpdateProduct(
                              editingProduct.productId,
                              editingProduct
                            );
                            setEditingProduct(null);
                          }}
                          className="px-4 py-2 rounded bg-yellow-400 text-black"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteProduct(product.productId)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
