// src/pages/Cart.jsx
import React, { useContext } from "react";
import useCart from "../hooks/useCart";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {updateQuantity} = useContext(GlobalContext)
  const { cart, removeFromCart, calculateTotal } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className="container mt-10 text-center">
        <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-6">
        {cart.map((item, index) => (
          <li
            key={item.productId || index}
            className="flex flex-col md:flex-row justify-between items-center border-b pb-4"
          >
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {item.product?.name || "Unnamed Product"}
              </h2>
              <p className="text-gray-600">
                Price: ${item.product?.price ?? 0}
              </p>
              <div className="flex items-center mt-2 space-x-3">
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-medium mt-1">
                Subtotal: $
                {((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="mt-4 md:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">
          Total: ${calculateTotal().toFixed(2)}
        </h2>
        <Link to="/checkout" className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Proceed to Checkout</Link>
        
      </div>
    </div>
  );
};

export default Cart;
