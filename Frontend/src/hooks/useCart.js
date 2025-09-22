import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";

const useCart = () => {
  const {
    cart,
    cartCount,
    addToCart: ctxAdd,
    removeFromCart: ctxRemove,
    clearCart: ctxClear,
    calculateTotal,
  } = useContext(GlobalContext);

  const addToCart = (product, qty = 1) => {
    ctxAdd(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    ctxRemove(productId);
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    ctxClear();
    toast.success("Cart cleared");
  };

  return { cart, cartCount, addToCart, removeFromCart, clearCart, calculateTotal };
};

export default useCart;
