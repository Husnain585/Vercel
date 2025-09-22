// src/pages/OrderSuccess.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  // Using React Router state to get order details
  const { state } = useLocation();
  const { order, items, shippingAddress } = state || {};

  if (!order) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold mb-5">No Order Found</h1>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded p-6 text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-600">✅ Order Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your order ID is <span className="font-semibold">{order.orderId}</span>.
        </p>

        {/* Shipping Information */}
        {shippingAddress && (
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold mb-2">Shipping Information</h2>
            <p>{shippingAddress.fullName}</p>
            <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.zip}</p>
            <p>{shippingAddress.country}</p>
            <p>Email: {shippingAddress.email}</p>
          </div>
        )}

        {/* Order Summary */}
        {items && items.length > 0 && (
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between border-b pb-1">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total:</span>
              <span>${items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</span>
            </div>
          </div>
        )}

        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
