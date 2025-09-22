// src/pages/Orders.jsx
import React from "react";
import { motion } from "framer-motion";
import useOrders from "../hooks/useOrders";

const Orders = () => {
  const { orders, loading, error } = useOrders();

  if (loading) {
    return <p className="text-center mt-10">Loading your orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">My Orders</h1>
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <motion.div
            key={order.id || order.orderId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow p-6 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Order #{order.id || order.orderId}
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <ul className="space-y-2 mb-4">
              {order.items?.map((item, idx) => (
                <li
                  key={item.productId || idx}
                  className="flex justify-between text-gray-700"
                >
                  <span>
                    {item.product?.name} × {item.quantity}
                  </span>
                  <span>
                    ${((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
              <span>Total:</span>
              <span>${Number(order.total).toFixed(2)}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
