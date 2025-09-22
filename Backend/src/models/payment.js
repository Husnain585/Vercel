// models/payment.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
// In OrderItem.js and Payment.js
import Order from "./Order.js"; // matches file name


class Payment extends Model {}

Payment.init(
  {
    paymentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ switched to Sequelize generator
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: Order, key: "orderId" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("card", "paypal", "cod"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
  }
);

export default Payment;
