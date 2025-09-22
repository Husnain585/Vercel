// models/orderItem.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
// In OrderItem.js and Payment.js
import Order from "./Order.js"; 

import Product from "./Product.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    orderItemId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ use Sequelize UUID generator
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Order, key: "orderId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Product, key: "productId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
  }
);

export default OrderItem;
