// models/order.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import User from "./users.js";

class Order extends Model {}

Order.init(
  {
    orderId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ use Sequelize's built-in UUID generator
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "userId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled"
      ),
      defaultValue: "pending",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);

export default Order;
