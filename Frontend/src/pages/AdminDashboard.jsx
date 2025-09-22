import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, loadingUser } = useGlobalContext();
  const { getAllOrders, statusOrder, createCategory, createProduct } = useAdmin();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect unauthorized users
  useEffect(() => {
    if (!loadingUser) {
      if (!user) {
        navigate("/login");
      } else if (user.role?.toLowerCase() !== "admin") {
        navigate("/");
      }
    }
  }, [user, loadingUser, navigate]);

  // Category form state
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  // Product form state
  const [productData, setProductData] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    originalPrice: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role?.toLowerCase() === "admin") {
      fetchOrders();
    }
  }, [user]);

  if (loadingUser) return <div className="p-8">Checking authorization...</div>;

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      await statusOrder(orderId, status);
      await fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to update status");
    }
  };

  // Create category
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(categoryData);
      alert("✅ Category created successfully!");
      setCategoryData({ name: "", description: "" });
    } catch (err) {
      alert(err.message || "Failed to create category");
    }
  };

  // Create product with image
const handleProductSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // append image files
    // for (let i = 0; i < productData.images.length; i++) {
    //   formData.append("images", productData.images[i]);
    // }

    await createProduct(formData);
    alert("✅ Product created successfully!");
    setProductData({
      categoryId: "",
      name: "",
      description: "",
      price: "",
      stock: "",
      originalPrice: "",
      images: [],
    });
  } catch (err) {
    alert(err.message || "Failed to create product");
  }
};


  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen mt-20">
      <h1 className="text-3xl font-bold text-gray-800">⚙️ Admin Dashboard</h1>

      {/* Orders Section */}
      <section className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">📦 Manage Orders</h2>
        {loading && <div className="text-blue-600">Loading orders...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {orders.length === 0 && !loading ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="border rounded-lg p-5 shadow-sm bg-gray-50"
              >
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-semibold">Order ID:</span>{" "}
                    {order.orderId}
                  </p>
                  <p>
                    <span className="font-semibold">User ID:</span>{" "}
                    {order.userId}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded text-white ${
                        order.status === "paid"
                          ? "bg-green-500"
                          : order.status === "canceled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">Total:</span> ₹
                    {order.totalAmount}
                  </p>
                  <p>
                    <span className="font-semibold">Created:</span>{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Updated:</span>{" "}
                    {new Date(order.updatedAt).toLocaleString()}
                  </p>
                </div>

                {/* Order Items */}
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-600 hover:underline">
                    View Items ({order.items?.length})
                  </summary>
                  <table className="w-full mt-3 text-sm border">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-3 py-2">Product</th>
                        <th className="border px-3 py-2">Description</th>
                        <th className="border px-3 py-2">Qty</th>
                        <th className="border px-3 py-2">Price</th>
                        <th className="border px-3 py-2">Stock</th>
                        <th className="border px-3 py-2">Original Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr
                          key={item.orderItemId}
                          className="hover:bg-gray-100 transition"
                        >
                          <td className="border px-3 py-2">
                            {item.product?.name}
                          </td>
                          <td className="border px-3 py-2">
                            {item.product?.description}
                          </td>
                          <td className="border px-3 py-2 text-center">
                            {item.quantity}
                          </td>
                          <td className="border px-3 py-2">₹{item.price}</td>
                          <td className="border px-3 py-2 text-center">
                            {item.product?.stock}
                          </td>
                          <td className="border px-3 py-2">
                            ₹{item.product?.originalPrice}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </details>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  {order.status !== "paid" && (
                    <button
                      onClick={() => updateStatus(order.orderId, "paid")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Mark Paid
                    </button>
                  )}
                  {order.status !== "canceled" && (
                    <button
                      onClick={() => updateStatus(order.orderId, "canceled")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Category */}
      <section className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          📂 Create Category
        </h2>
        <form onSubmit={handleCategorySubmit} className="space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g., Electric Bike"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              placeholder="Short description about this category..."
              value={categoryData.description}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition"
          >
            ➕ Add Category
          </button>
        </form>
      </section>

      {/* Create Product */}
      <section className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          🛒 Create Product
        </h2>
        <form
          onSubmit={handleProductSubmit}
          className="space-y-5 max-w-lg"
          encType="multipart/form-data"
        >
          {[
            {
              label: "Category ID",
              key: "categoryId",
              type: "text",
              placeholder: "Enter category ID",
            },
            {
              label: "Product Name",
              key: "name",
              type: "text",
              placeholder: "e.g., Bike L100 Model",
            },
            {
              label: "Description",
              key: "description",
              type: "textarea",
              placeholder: "Short product description...",
            },
            {
              label: "Price",
              key: "price",
              type: "number",
              placeholder: "e.g., 477000",
            },
            {
              label: "Stock",
              key: "stock",
              type: "number",
              placeholder: "e.g., 100",
            },
            {
              label: "Original Price",
              key: "originalPrice",
              type: "number",
              placeholder: "e.g., 590000",
            },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  placeholder={placeholder}
                  value={productData[key]}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
                />
              ) : (
                <input
                  type={type}
                  placeholder={placeholder}
                  value={productData[key]}
                  onChange={(e) =>
                    setProductData((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
                />
              )}
            </div>
          ))}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setProductImage(file);
                setPreviewImage(file ? URL.createObjectURL(file) : null);
              }}
              className="border px-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-purple-400 outline-none transition"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-5 py-2 rounded-lg w-full flex items-center justify-center gap-2 transition"
          >
            ➕ Add Product
          </button>
        </form>
      </section>
    </div>
  );
};

export default AdminDashboard;
