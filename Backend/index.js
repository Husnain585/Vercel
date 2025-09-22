import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { db } from "./src/models/index.js";

// Import Routes
import authRoutes from "./src/routes/auth.route.js";
import userRoutes from "./src/routes/user.route.js";
import cartRoutes from "./src/routes/cart.route.js";
import productRoutes from "./src/routes/product.route.js";
import categoryRoutes from "./src/routes/category.route.js";
import productImageRoutes from "./src/routes/productImage.route.js";
import wishlist from "./src/routes/wishlist.route.js";
import orderRoutes from "./src/routes/order.route.js";
import checkoutRoutes from "./src/routes/checkout.route.js";
import emailCheck from "./src/routes/emailCheck.route.js";
import vendorRoutes from "./src/routes/vendor.route.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS
const allowedOrigins = [
  "http://localhost:5173", // React
  "http://localhost:3000", // optional if you test frontend in CRA
  "https://your-production-domain.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware (after CORS)
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/me", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product-image", productImageRoutes);
app.use("/api/wishlist", wishlist);
app.use("/api/order", orderRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/auth", emailCheck);
app.use("/api/vendor", vendorRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// DB sync
db.connection
  .sync()
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Error synchronizing database:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
