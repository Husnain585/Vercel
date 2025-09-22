// models/Wishlist.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import User from "./User.js";
import Product from "./Product.js";

class Wishlist extends Model {}

Wishlist.init(
  {
    wishlistId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // auto-generated UUID
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "productId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Wishlist",
    tableName: "wishlists",
    timestamps: true,
    paranoid: true, // soft delete
  }
);

export default Wishlist;
