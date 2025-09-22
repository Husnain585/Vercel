// models/product.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import Vendor from "./vendor.js";
import Category from "./Category.js";

class Product extends Model {}

Product.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize UUID generator
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Category, key: "categoryId" },
    },
    vendorId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: Vendor, key: "vendorId" },
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
    paranoid: true, // ✅ enables soft deletes
  }
);

export default Product;
