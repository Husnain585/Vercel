import { useContext, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";

const useWishlist = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useWishlist must be used inside <GlobalProvider>");

  const {
    wishlist,
    wishlistCount,
    addToWishlist: ctxAdd,
    removeFromWishlist: ctxRemove,
    toggleWishlist: ctxToggle,
    isInWishlist,
  } = ctx;

  const addToWishlist = (product) => {
    ctxAdd(product);
    toast.success(`${product.name} added to wishlist`);
  };

  const removeFromWishlist = (productId) => {
    ctxRemove(productId);
    toast.success("Removed from wishlist");
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.productId)) {
      ctxRemove(product.productId);
      toast.success("Removed from wishlist");
    } else {
      ctxAdd(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  const has = useMemo(() => (productId) => isInWishlist(productId), [isInWishlist]);

  return {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist: has,
  };
};

export default useWishlist;
