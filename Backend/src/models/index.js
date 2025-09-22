// models/index.js
import sequelize from "../config/db.connection.js";

// Import all models
import Cart from "./Cart.js";
import Admin from "./Admin.js";
import User from "./User.js";
import Category from "./Category.js";
import Order from "./Order.js";
import Product from "./Product.js";
import OrderItem from "./OrderItem.js";
import ProductImage from "./ProductImage.js";
import Review from "./Review.js";
import Wishlist from "./Wishlist.js";
import Address from "./Address.js";
import Payment from "./Payment.js";
import CartItem from "./CartItem.js";
import EmailCheck from "./EmailCheck.js";
import OAuthAccount from "./OAuthAccount.js";
import Vendor from "./vendor.js";

// Attach models
const models = {
  Cart,
  Admin,
  User,
  Category,
  Order,
  Product,
  OrderItem,
  ProductImage,
  Review,
  Wishlist,
  Address,
  Payment,
  CartItem,
  EmailCheck,
  OAuthAccount,
  Vendor,
};

// ===== Relations =====

// Users ↔ Cart
User.hasMany(Cart, { foreignKey: "userId", as: "carts" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

// Users ↔ Orders
User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Orders ↔ OrderItems
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Products ↔ OrderItems
Product.hasMany(OrderItem, { foreignKey: "productId", as: "orderItems" });
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Orders ↔ Payment
Order.hasOne(Payment, { foreignKey: "orderId", as: "payment" });
Payment.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Categories ↔ Products
Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

// Products ↔ ProductImages
Product.hasMany(ProductImage, { foreignKey: "productId", as: "images" });
ProductImage.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Users ↔ Wishlist ↔ Products (many-to-many)
User.belongsToMany(Product, { through: Wishlist, foreignKey: "userId" });
Product.belongsToMany(User, { through: Wishlist, foreignKey: "productId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Wishlist, { foreignKey: "productId" });

// Users ↔ Reviews ↔ Products
User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
Review.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Review, { foreignKey: "productId", as: "reviews" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Users ↔ Addresses
User.hasMany(Address, { foreignKey: "userId", as: "addresses" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

// CartItems ↔ Products
Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

// Email verification
User.hasOne(EmailCheck, { foreignKey: "userId", as: "emailCheck" });
EmailCheck.belongsTo(User, { foreignKey: "userId", as: "user" });

// OAuth accounts
User.hasMany(OAuthAccount, {
  foreignKey: "userId",
  as: "oauthAccounts",
  onDelete: "CASCADE",
});
OAuthAccount.belongsTo(User, { foreignKey: "userId", as: "user" });

// Vendor ↔ Products
Vendor.hasMany(Product, { foreignKey: "vendorId", as: "products" });
Product.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });

// Build db object
const db = { connection: sequelize, models };

export { db, models };
