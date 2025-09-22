import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const { user, setUser, token, setToken, cartCount, wishlistCount } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          🛍️ MyShop
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/categories" className="hover:text-blue-600">Categories</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
        </div>

        {/* Auth + Cart + Wishlist */}
        <div className="flex items-center space-x-4">
          {!token ? (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium hover:text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user?.username || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
              <Link to="/wishlist" className="relative">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
    