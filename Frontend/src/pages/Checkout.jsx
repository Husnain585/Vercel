// src/pages/Checkout.jsx
import React from "react";
import useCheckout from "../hooks/useCheckout";

const Checkout = () => {
  const {
    cart,
    shipping,
    success,
    loading,
    calculateTotal,
    handleChange,
    handleSubmit,
  } = useCheckout();

  if (cart.length === 0 && !success) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Checkout</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Order Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["fullName", "email", "address", "city", "state", "zip", "country"].map(
            (field) => (
              <div key={field}>
                <label className="block font-medium mb-1 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={shipping[field]}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            )
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>

        {/* Order Summary with Thumbnails */}
        <div className="bg-gray-100 p-6 rounded space-y-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          {cart.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex items-center justify-between text-gray-700 gap-4"
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail */}
                <img
                  src={
                    item.product?.images?.[0]?.url ||
                    "https://via.placeholder.com/50"
                  }
                  alt={item.product?.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <span className="font-medium">{item.product?.name}</span>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} |{" "}
                    {item.product?.stock > 0 ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-500">Out of Stock</span>
                    )}
                  </p>
                </div>
              </div>

              <span className="font-semibold">
                ${((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
