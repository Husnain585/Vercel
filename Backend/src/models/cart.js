// models/cart.js
import { DataTypes, Model } from "sequelize";
import connection from "../config/db.connection.js";
import User from "./users.js";

class Cart extends Model {}

Cart.init(
  {
    cartId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Sequelize generates UUID automatically
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "userId" },
    },
    status: {
      type: DataTypes.ENUM("active", "completed"),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    sequelize: connection,
    modelName: "Cart",
    tableName: "carts",
    timestamps: true,
    paranoid: true,
  }
);

export default Cart;
