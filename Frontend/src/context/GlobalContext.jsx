import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import config from "../config/config";
import axiosInstance from "../utils/axiosInstance";
import ThemeContext, { ThemeProvider } from "./ThemeContext";
import { jwtDecode } from "jwt-decode";

export const GlobalContext = createContext(null);

// -------------------------
// Helpers
// -------------------------
const getId = (p) => p?.id ?? p?.productId ?? p;
const safeNum = (n) => (Number.isFinite(Number(n)) ? Number(n) : 0);
const CART_KEY = (userId) => `cart_${userId}`;
const WISHLIST_KEY = (userId) => `wishlist_${userId}`;

export const GlobalProvider = ({ children }) => {
  // -------------------------
  // Auth / User
  // -------------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(config.storageKeys.authToken) || null
  );
  const [loadingUser, setLoadingUser] = useState(true);

  // -------------------------
  // Products & Categories
  // -------------------------
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // -------------------------
  // Vendors
  // -------------------------
  const [vendors, setVendors] = useState([]);
  const [vendorProducts, setVendorProducts] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [loadingVendorProducts, setLoadingVendorProducts] = useState(false);

  // -------------------------
  // Cart & Wishlist
  // -------------------------
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // -------------------------
  // Auth token persistence
  // -------------------------
  useEffect(() => {
    if (token) localStorage.setItem(config.storageKeys.authToken, token);
    else localStorage.removeItem(config.storageKeys.authToken);
  }, [token]);

  // -------------------------
  // Load cart & wishlist when user changes
  // -------------------------
  useEffect(() => {
    if (!user) {
      setCart([]);
      setCartCount(0);
      setWishlist([]);
      setWishlistCount(0);
      return;
    }

    try {
      const savedCart = JSON.parse(
        localStorage.getItem(CART_KEY(user.userId)) || "[]"
      );
      setCart(savedCart);
      setCartCount(savedCart.reduce((acc, i) => acc + safeNum(i.quantity), 0));
    } catch {
      setCart([]);
      setCartCount(0);
    }

    try {
      const savedWishlist = JSON.parse(
        localStorage.getItem(WISHLIST_KEY(user.userId)) || "[]"
      );
      setWishlist(savedWishlist);
      setWishlistCount(savedWishlist.length);
    } catch {
      setWishlist([]);
      setWishlistCount(0);
    }
  }, [user]);

  // -------------------------
  // User API & Auth actions
  // -------------------------
  const fetchUser = async () => {
    if (!token) return setUser(null) && setLoadingUser(false);

    try {
      setLoadingUser(true);
      const decoded = jwtDecode(token);
      let enrichedUser = {
        userId: decoded.userId,
        username: decoded.username,
        role: decoded.role,
        vendorId: decoded.vendorId ?? null,
      };

      const res = await axiosInstance.get("/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.user) enrichedUser = { ...enrichedUser, ...res.data.user };
      if (res.data.token) setToken(res.data.token);

      setUser(enrichedUser);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      setUser(null);
      setToken(null);
      localStorage.removeItem(config.storageKeys.authToken);
    } finally {
      setLoadingUser(false);
    }
  };

  const updateUser = async (data) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.put("/user/update", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.user || res.data);
    return res.data;
  };

  const deleteUser = async () => {
    if (!token) throw new Error("Not authenticated");
    await axiosInstance.delete("/user/delete", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(null);
    setToken(null);
  };

  const changePassword = async (data) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.post("/user/change-password", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  // -------------------------
  // Products & Categories actions
  // -------------------------
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axiosInstance.get("/product");
      setProducts(res.data.products || res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await axiosInstance.get("/category");
      setCategories(res.data.categories || res.data || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // -------------------------
  // Vendor actions
  // -------------------------
  const fetchVendors = async () => {
    try {
      setLoadingVendors(true);
      const res = await axiosInstance.get("/vendor", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data.vendors || res.data || []);
    } catch (err) {
      console.error("Failed to fetch vendors", err);
    } finally {
      setLoadingVendors(false);
    }
  };

  const fetchVendorProducts = async (vendorId) => {
    try {
      setLoadingVendorProducts(true);
      const res = await axiosInstance.get(`/vendor/${vendorId}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendorProducts(res.data.products || res.data || []);
    } catch (err) {
      console.error(`Failed to fetch vendor products`, err);
    } finally {
      setLoadingVendorProducts(false);
    }
  };

  const createVendor = async (vendorData) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.post("/vendor", vendorData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchVendors();
    return res.data.vendor || res.data;
  };

  // -------------------------
  // Cart helpers & actions
  // -------------------------
  const persistCart = (next) => {
    if (!user) return;
    localStorage.setItem(CART_KEY(user.userId), JSON.stringify(next));
    setCartCount(next.reduce((acc, i) => acc + safeNum(i.quantity), 0));
  };

  const addToCart = (input, quantity = 1) => {
    if (!user) return;
    const product =
      typeof input === "object"
        ? input
        : products.find((p) => getId(p) === getId(input));
    if (!product) return;

    const pid = getId(product);
    setCart((prev) => {
      const ix = prev.findIndex((i) => i.productId === pid);
      const next =
        ix >= 0
          ? prev.map((i, idx) =>
              idx === ix
                ? { ...i, quantity: safeNum(i.quantity) + safeNum(quantity) }
                : i
            )
          : [...prev, { productId: pid, product, quantity: safeNum(quantity) }];
      persistCart(next);
      return next;
    });
  };

  const updateQty = (productId, nextQty) => {
    if (!user) return;
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev
        .map((i) =>
          i.productId === pid
            ? { ...i, quantity: Math.max(1, safeNum(nextQty)) }
            : i
        )
        .filter((i) => i.quantity > 0);
      persistCart(next);
      return next;
    });
  };

  const removeFromCart = (productId) => {
    if (!user) return;
    const pid = getId(productId);
    setCart((prev) => {
      const next = prev.filter((i) => i.productId !== pid);
      persistCart(next);
      return next;
    });
  };

  const clearCart = () => {
    if (!user) return;
    setCart([]);
    setCartCount(0);
    localStorage.removeItem(CART_KEY(user.userId));
  };

  const calculateTotal = useMemo(
    () => () =>
      cart.reduce(
        (acc, item) =>
          acc + safeNum(item.product?.price) * safeNum(item.quantity),
        0
      ),
    [cart]
  );

  // -------------------------
  // Wishlist helpers & actions
  // -------------------------
  const persistWishlist = (next) => {
    if (!user) return;
    localStorage.setItem(WISHLIST_KEY(user.userId), JSON.stringify(next));
    setWishlistCount(next.length);
  };

  const addToWishlist = (product) => {
    if (!user) return;
    const pid = getId(product);
    setWishlist((prev) => {
      const next = prev.some((p) => getId(p) === pid)
        ? prev
        : [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const removeFromWishlist = (productId) => {
    if (!user) return;
    const pid = getId(productId);
    setWishlist((prev) => {
      const next = prev.filter((p) => getId(p) !== pid);
      persistWishlist(next);
      return next;
    });
  };

  const toggleWishlist = (product) => {
    if (!user) return;
    const pid = getId(product);
    setWishlist((prev) => {
      const next = prev.some((p) => getId(p) === pid)
        ? prev.filter((p) => getId(p) !== pid)
        : [...prev, product];
      persistWishlist(next);
      return next;
    });
  };

  const isInWishlist = (productId) =>
    user ? wishlist.some((p) => getId(p) === getId(productId)) : false;

  // -------------------------
  // Admin / Orders
  // -------------------------
  const getAllOrders = async () => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.get("/order/admin/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.orders || res.data;
  };

  const statusOrder = async (orderId, status) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.put(
      `/order/admin/${orderId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.order || res.data;
  };

  // -------------------------
  // Product / Category CRUD
  // -------------------------
  const createProduct = async (productData) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.post("/product", productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.product || res.data;
  };

  const updateProduct = async (productId, productData) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.put(`/product/${productId}`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.product || res.data;
  };

  const deleteProduct = async (productId) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.delete(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.product || res.data;
  };

  const createCategory = async (categoryData) => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.post("/category", categoryData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.category || res.data;
  };

  return (
    <ThemeProvider>
      <GlobalContext.Provider
        value={{
          user,
          setUser,
          token,
          setToken,
          loadingUser,
          fetchUser,
          updateUser,
          deleteUser,
          changePassword,
          products,
          categories,
          loadingProducts,
          loadingCategories,
          cart,
          cartCount,
          addToCart,
          updateQty,
          removeFromCart,
          clearCart,
          calculateTotal,
          wishlist,
          wishlistCount,
          addToWishlist,
          removeFromWishlist,
          toggleWishlist,
          isInWishlist,
          vendors,
          vendorProducts,
          loadingVendors,
          loadingVendorProducts,
          fetchVendors,
          fetchVendorProducts,
          createVendor,
          getAllOrders,
          statusOrder,
          createProduct,
          updateProduct,
          deleteProduct,
          createCategory,
        }}
      >
        {children}
      </GlobalContext.Provider>
    </ThemeProvider>
  );
};

// -------------------------
// Hook for easy usage
// -------------------------
export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalContext must be used inside <GlobalProvider>");
  return ctx;
};

export default GlobalContext;
