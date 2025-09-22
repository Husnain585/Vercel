// ✅ Middleware to check for Admin or Vendor access
export const adminCheck = (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Login required." });
    }

    const role = req.user.role?.toLowerCase();
    if (role === "admin" || role === "vendor") {
      return next();
    }

    return res
      .status(403)
      .json({ message: "Access denied. Admins only." });
  } catch (error) {
    console.error("Admin Check Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Example placeholder middleware
export const newMiddleware = (req, res) => {
  console.log("new");
  res.status(200).json({ message: "New middleware reached" });
};
