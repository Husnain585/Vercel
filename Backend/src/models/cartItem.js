// models/cartItem.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import Cart from "./cart.js";
import Product from "./product.js";
import { v4 as uuid } from "uuid";

class CartItem extends Model {}

CartItem.init(
  {
    cartItemId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuid(), // generates a new UUID for each row
    },
    cartId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Cart, key: "cartId" },
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Product, key: "productId" },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: true,
    paranoid: true,
  }
);

export default CartItem;
