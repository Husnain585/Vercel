import { Router } from "express";

import * as vendorController from "../controller/vendor.controller.js";
import * as productController from "../controller/product.controller.js";
import authMiddleware from "../middleware/authCheck.middleware.js";
import { adminCheck } from "../middleware/adminCheck.middleware.js";

const router = Router();

// ===== Vendor CRUD =====

// Create a new vendor
router.post("/", authMiddleware, vendorController.createVendor);

// Get all vendors
router.get("/", vendorController.getVendors);

// Get vendor by ID
router.get("/:id", vendorController.getVendorById);

// // Update vendor
// router.put("/:id", authMiddleware, adminCheck, vendorController.updateVendor);

// // Delete vendor (soft delete because of paranoid:true)
// router.delete("/:id", authMiddleware, adminCheck, vendorController.deleteVendor);

// // ===== Vendor → Products =====

// // Get all products of a vendor
// router.get("/:id/products", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const products = await productController.getProductsByVendorId(id);
//     return res.status(200).json({ success: true, products });
//   } catch (error) {
//     console.error("Error fetching vendor products:", error);
//     return res.status(500).json({ success: false, message: "Failed to fetch vendor products" });
//   }
// });

// // (Optional) Create a product under a vendor
// router.post("/:id/products", authMiddleware, adminCheck, async (req, res) => {
//   try {
//     const { id } = req.params;
//     req.body.vendorId = id; // ensure product links to this vendor
//     const product = await productController.createProduct(req, res);
//     return product;
//   } catch (error) {
//     console.error("Error creating vendor product:", error);
//     return res.status(500).json({ success: false, message: "Failed to create product for vendor" });
//   }
// });

export default router;
